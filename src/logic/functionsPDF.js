// Este es un archivo donde se guardara las funciones para generar los PDF
import jsPDF from "jspdf";
import "jspdf-autotable";

// Funcion para generar el PDF de una nomina
export const generatePayrollPDF = (payroll) => {
  const { currency } = JSON.parse(localStorage.getItem("company"));
  const doc = new jsPDF();
  const { employees } = payroll;

  doc.text(`${payroll.title}`, 100, 10, { align: "center" });

  const columnas = [
    "Empleado",
    "Cedula",
    "Cargo",
    "Condicion",
    "Salario Bruto",
    "Salario Neto",
  ];

  let data = [];
  let totalGrossSalary = 0;
  let totalNetSalary = 0;

  employees.forEach((employee) => {
    data.push([
      `${employee.employeeName.name} ${employee.employeeName.lastName}`,
      `${employee.employeeName.identityCard}`,
      `${employee.employeeName.charge}`,
      `${employee.employeeName.condition}`,
      `${employee.grossSalary} ${currency}`,
      `${employee.netSalary} ${currency}`,
    ]);
    totalGrossSalary += employee.grossSalary;
    totalNetSalary += employee.netSalary;
  });

  data.push(["", "", "", "", "Total Salario Bruto", "Total Salario Neto"]);
  data.push([
    "",
    "",
    "",
    "",
    `${totalGrossSalary.toFixed(2)} ${currency}`,
    `${totalNetSalary.toFixed(2)} ${currency}`,
  ]);

  doc.autoTable({
    startLY: 30,
    styles: { valign: "middle", cellPadding: 3 },
    headStyles: {
      fillColor: "#045FF5",
    },
    bodyStyles: {
      textColor: "#0f172a",
    },
    columnStyles: {
      0: { cellWidth: 40 },
      2: { cellWidth: 40 },
    },
    head: [columnas],
    body: data,
  });

  doc.save(`nomina.pdf`);
};

export const generateReceiptPDF = (perceptions, deductions, baseSalary) => {
  const { currency } = JSON.parse(localStorage.getItem("company"));
  const doc = new jsPDF();
  const perceptionEmployee = perceptions;
  const deductionEmployee = deductions;

  console.log(perceptionEmployee);
  console.log(deductionEmployee);

  doc.text("Recibo", 100, 10, { align: "center" });

  const columnas = ["Concepto", "Monto", "Tipo"];

  let data = [];

  perceptionEmployee?.forEach((perception) => {
    const perceptionName = perception.perceptionName?.name || "";
    const amount = perception.amount || 0;
    data.push([perceptionName, `${amount} ${currency}`, "Percepción"]);
  });

  deductionEmployee?.forEach((deduction) => {
    const deductionName = deduction.deductionName?.name || "";
    const percentage = deduction.percentage || 0;
    data.push([deductionName, `${percentage} ${"%"}`, "Deducción"]);
  });

  data.push(["Total Salario Bruto", `${baseSalary} ${currency}`, ""]);

  doc.autoTable({
    startLY: 30,
    styles: { valign: "middle", cellPadding: 3 },
    headStyles: {
      fillColor: "#045FF5",
    },
    bodyStyles: {
      textColor: "#0f172a",
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
    },
    head: [columnas],
    body: data,
  });

  doc.save(`recibo.pdf`);
};
