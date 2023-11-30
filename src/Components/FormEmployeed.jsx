import { BiArrowBack } from "react-icons/bi";
import { userRoles } from "../logic/constantes";
import { authComponent } from "../logic/authComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatearFecha } from "../logic/functions";
import { succesAlert, errorAlert } from "./alerts/alerts";
export function FormEmployeed({ dataEdit = null, setStateModal, confirm }) {
  const navegar = useNavigate();
  const { Admin, User } = userRoles;
  const [departments, setDepartments] = useState([]);
  const [departmentSelected, setDepartmentSelected] = useState("0");
  const [employee, setEmployee] = useState({
    name: "",
    lastName: "",
    identityCard: "",
    birthdate: "",
    gender: "0",
    address: "",
    email: "",
    phone: "",
    civilStatus: "0",
    startDate: "",
    charge: "",
    condition: "0",
    baseSalary: "",
    bankAccount: "",
  });
  const companyID = JSON.parse(localStorage.getItem("company")).id;
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(employee);

  useEffect(() => {
    if (dataEdit) {
      setEmployee({
        ...dataEdit,
        birthdate: formatearFecha(dataEdit.birthdate),
        startDate: formatearFecha(dataEdit.startDate),
        baseSalary: dataEdit.baseSalary.toString(),
      });
      setDepartmentSelected(dataEdit.departmentId);
      // console.log(dataEdit);
    }

    fetch(`http://localhost:3000/department/all/${companyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data.departments);
        if (data.departments) {
          setDepartments(data.departments);
        } else {
          console.log("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Comprueba que el componente siga teniendo una sesion activa y el rol sea permitido
  const auth = authComponent([Admin, User]);
  if (!auth) return navegar("/admin");

  const handleSubmit = () => {
    // event.preventDefault();
    let data = {};

    if (employee.name == "")
      return console.error("El campo Nombre no puede estar vacio");
    if (employee.lastName == "")
      return console.error("El campo Apellido no puede estar vacio");
    if (employee.identityCard == "")
      return console.error("El campo Cedula no puede estar vacio");
    if (employee.birthdate == "")
      return console.error("El campo Fecha de nacimiento no puede estar vacio");
    if (employee.gender == "0")
      return console.error("El campo Genero no puede estar vacio");
    if (employee.address == "")
      return console.error("El campo Direcccion no puede estar vacio");
    if (employee.email == "")
      return console.error("El campo Email no puede estar vacio");
    if (employee.phone == "")
      return console.error("El campo Telefono no puede estar vacio");
    if (employee.civilStatus == "0")
      return console.error("El campo Estado Civil no puede estar vacio");
    if (employee.startDate == "")
      return console.error("El campo Fecha de inicio no puede estar vacio");
    if (employee.charge == "")
      return console.error("El campo Cargo no puede estar vacio");
    if (employee.condition == "0")
      return console.error("El campo Condicion no puede estar vacio");
    if (employee.baseSalary == "")
      return console.error("El campo Salario Base no puede estar vacio");
    if (employee.bankAccount == "")
      return console.error("El campo Cuenta Bancaria no puede estar vacio");
    if (!departmentSelected)
      return console.error("El campo Departamento no puede estar vacio");

    // FALTA: Validar cuando aun no han editado ningun dato
    if (dataEdit) {
      if (employee.name !== dataEdit.name)
        data = {
          ...data,
          name: employee.name,
        };
      if (employee.lastName !== dataEdit.lastName)
        data = {
          ...data,
          lastName: employee.lastName,
        };
      if (employee.identityCard !== dataEdit.identityCard)
        data = {
          ...data,
          identityCard: Number(employee.identityCard),
        };
      if (employee.birthdate !== formatearFecha(dataEdit.birthdate))
        data = {
          ...data,
          birthdate: employee.birthdate,
        };
      if (employee.gender !== dataEdit.gender)
        data = {
          ...data,
          gender: employee.gender,
        };
      if (employee.address !== dataEdit.address)
        data = {
          ...data,
          address: employee.address,
        };
      if (employee.email !== dataEdit.email)
        data = {
          ...data,
          email: employee.email,
        };
      if (employee.phone !== dataEdit.phone)
        data = {
          ...data,
          phone: employee.phone,
        };
      if (employee.civilStatus !== dataEdit.civilStatus)
        data = {
          ...data,
          civilStatus: employee.civilStatus,
        };
      if (employee.condition !== dataEdit.condition)
        data = {
          ...data,
          condition: employee.condition,
        };
      if (employee.startDate !== formatearFecha(dataEdit.startDate))
        data = {
          ...data,
          startDate: employee.startDate,
        };
      if (employee.charge !== dataEdit.charge)
        data = {
          ...data,
          charge: employee.charge,
        };
      if (employee.baseSalary !== dataEdit.baseSalary)
        data = {
          ...data,
          baseSalary: parseFloat(employee.baseSalary),
        };

      if (employee.bankAccount !== dataEdit.bankAccount)
        data = {
          ...data,
          bankAccount: employee.bankAccount,
        };
      if (departmentSelected !== dataEdit.departmentId)
        data = {
          ...data,
          department: departmentSelected,
        };

      fetch(`http://localhost:3000/employee/edit-employee/${dataEdit.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.employee) {
            // console.log("Success:", data.employee);
            succesAlert("Se ha editado correcatmente el empleado");
            confirm(data.employee);
            setStateModal(false);
          } else {
            errorAlert("Ha ocurrido un error al editar el empleado");
            console.log("Error:", data);
          }
        })
        .catch((error) => {
          errorAlert("Ha ocurrido un error");
          console.error("Error:", error);
        });
    } else {
      data = {
        ...employee,
        identityCard: Number(employee.identityCard),
        baseSalary: parseFloat(employee.baseSalary),
      };
      // console.log(data);
      fetch(
        `http://localhost:3000/employee/create-employee/${companyID}/${departmentSelected}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.newEmployee) {
            // console.log("Success:", data.newEmployee);
            succesAlert("Se ha creado correctamente el empleado");
            confirm(data.newEmployee);
            setStateModal(false);
          } else {
            errorAlert("Ha ocurrido un error al crear el empleado");
            console.log("Error:", data.error);
          }
        })
        .catch((error) => {
          errorAlert("Ha ocurrido un error ");
          console.error("Error:", error);
        });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "department") {
      setDepartmentSelected(e.target.value);
      return;
    }
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  return (
    <section className="fixed top-0 left-0 bottom-0 right-0 bg-grisClaro flex flex-col items-center justify-center z-20 min-h-screen gap-10">
      <h1 className="text-4xl font-bold">
        {dataEdit ? "Editar Empleado" : "Registro de Empleado"}
      </h1>
      <BiArrowBack
        className="absolute top-2 left-3 z-10 text-3xl cursor-pointer"
        onClick={() => setStateModal(false)}
      />
      <form
        className="grid grid-cols-3 gap-x-20 gap-y-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-xl">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoFocus={!dataEdit}
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              placeholder="Ingresa el nombre"
              value={employee.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-xl">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              placeholder="Ingresa el apellido"
              value={employee.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="identityCard" className="text-xl">
              Cedula
            </label>
            <input
              type="number"
              name="identityCard"
              id="identityCard"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.identityCard}
              placeholder="Ingresa la cedula"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="birthdate" className="text-xl">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              name="birthdate"
              id="birthdate"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.birthdate}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="gender" className="text-xl">
                Genero
              </label>
            </div>
            <select
              name="gender"
              id="gender"
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.gender}
              onChange={handleChange}
            >
              <option value="0" disabled>
                -- Seleccionar --
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="text-xl">
              Direccion
            </label>
            <input
              type="text"
              name="address"
              id="address"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.address}
              placeholder="Ingresa la direccion"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xl">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.email}
              placeholder="Ingresa el email"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-xl">
              Numero de telefono
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.phone}
              placeholder="Ingresa el telefono"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="civilStatus" className="text-xl">
              Estado Civil
            </label>
            <select
              name="civilStatus"
              id="civilStatus"
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.civilStatus}
              onChange={handleChange}
            >
              <option value="0" disabled>
                -- Seleccionar --
              </option>
              <option value="Soltero/a">Soltero/a</option>
              <option value="Casado/a">Casado/a</option>
              <option value="Divorciado/a">Divorciado/a</option>
              <option value="Viudo/a">Viudo/a</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="startDate" className="text-xl">
              Fecha de inicio del cargo
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.startDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="charge" className="text-xl">
              Cargo
            </label>
            <input
              type="text"
              name="charge"
              id="charge"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.charge}
              placeholder="Ingresa el cargo"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="condition" className="text-xl">
              Condicion
            </label>
            <select
              name="condition"
              id="condition"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.condition}
              onChange={handleChange}
            >
              <option value="0" disabled>
                -- Seleccionar --
              </option>
              <option value="Fijo">Fijo</option>
              <option value="Contratado">Contratado</option>
              <option value="Jubilado">Jubilado</option>
              <option value="Incapacitado">Incapacitado</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="department" className="text-xl">
              Departamento
            </label>
            <select
              name="department"
              id="department"
              className="bg-azulClaro px-3 py-2 rounded-md text-grisClaro outline-none w-80"
              value={departmentSelected}
              onChange={handleChange}
            >
              <option value="0" disabled>
                -- Elegir departamento --
              </option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="baseSalary" className="text-xl">
              Salario Base{" "}
              <span className="text-sm">
                {'(Para centimos usar punto ".")'}
              </span>
            </label>
            <input
              type="text"
              name="baseSalary"
              id="baseSalary"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.baseSalary}
              placeholder="Ingresa el salario base"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="bankAccount" className="text-xl">
              Cuenta Bancaria
            </label>
            <input
              type="text"
              name="bankAccount"
              id="bankAccount"
              autoFocus
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={employee.bankAccount}
              placeholder="Ingresa la cuenta bancaria"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
      <button
        className="bg-azulOscuro mx-auto mt-5 px-3 py-2 font-bold text-grisClaro outline-none rounded-md"
        onClick={() => handleSubmit()}
      >
        {dataEdit ? "Guardar Cambios" : "Registrar Empleado"}
      </button>
    </section>
  );
}
