// Este es un archivo donde se guardara las funciones para generar los PDF
import jsPDF from "jspdf"
import "jspdf-autotable"

// Funcion para generar el PDF de una nomina
export const generatePayrollPDF = employees => {
  const doc = new jsPDF()

  doc.text("Titulo de la Nomina", 85, 10)

  const columnas = [
    "Empleado",
    "Cedula",
    "Cargo",
    "Condicion",
    "Salario Bruto",
    "Salario Neto"
  ]

  let data = []
  let totalGrossSalary = 0
  let totalNetSalary = 0

  employees.forEach(employee => {
    data.push([
      `${employee.name} ${employee.lastName}`,
      `${employee.indentityCard}`,
      `${employee.charge}`,
      `${employee.condition}`,
      `${employee.grossSalary}`,
      `${employee.netSalary}`
    ])
    totalGrossSalary += employee.grossSalary
    totalNetSalary += employee.netSalary
  })

  data.push(["", "", "", "", "Total Salario Bruto", "Total Salario Neto"])
  data.push(["", "", "", "", `${totalGrossSalary}`, `${totalNetSalary}`])

  doc.autoTable({
    startLY: 30,
    styles: { valign: "middle", cellPadding: 3 },
    head: [columnas],
    body: data
  })

  doc.save(`nomina.pdf`)
}
