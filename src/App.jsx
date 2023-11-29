import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { DashboardAdmin2 } from "./Components/DashboardAdmin2";
import { DashboardSuperAdmin } from "./Components/DashboardSuperAdmin";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Payroll } from "./Components/Payroll";
import { Deductions } from "./Components/Deductions";
import { Perceptions } from "./Components/Perceptions";
import { Employees } from "./Components/Employees";
import { Company } from "./Components/Company";
import { Companies } from "./Components/Companies";
import { Users } from "./Components/Users";
import { PrePayroll } from "./Components/PrePayroll";
import { Employe } from "./Components/Employe";
import ProtectedRouter from "./Components/ProtectedRouter";
import { userRoles } from "./logic/constantes";
import { UserInfo } from "./Components/InforUser";
import { Departaments } from "./Components/Departaments";
import { PayrollHistory } from "./Components/PayrollHistory";
import { SideBar } from "./Components/Sidebar";

function App() {
  const { SuperAdmin, Admin, User } = userRoles;
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="h-full">
      {!isLoginPage && (
        <SideBar open={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <div className={` ${isOpen ? "w-4/5 ml-64" : "w-[90%] ml-32"}`}>
        <Routes>
          <Route
            element={
              <ProtectedRouter
                allowedRoles={[SuperAdmin]}
                redirectTo="/login"
              />
            }
          >
            <Route index element={<DashboardSuperAdmin />} />
            <Route path="/empresas" element={<Companies />} />
          </Route>
          <Route
            element={
              <ProtectedRouter
                allowedRoles={[SuperAdmin, Admin]}
                redirectTo="/login"
              />
            }
          >
            <Route path="/registro" element={<Register />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/infouser/:id" element={<UserInfo />} />
            <Route path="/empresa" element={<Company />} />
          </Route>
          <Route
            element={
              <ProtectedRouter
                allowedRoles={[SuperAdmin, Admin, User]}
                redirectTo="/login"
              />
            }
          >
            <Route path="/admin" element={<DashboardAdmin2 />} />
          </Route>
          <Route element={<ProtectedRouter allowedRoles={[Admin, User]} />}>
            <Route path="/pre-nomina" element={<PrePayroll />} />
            <Route path="/nomina" element={<Payroll />} />
            <Route path="/deducciones/:emploID" element={<Deductions />} />
            <Route path="/percepciones/:emploID" element={<Perceptions />} />
            <Route path="/empleados" element={<Employees />} />

            <Route path="/empleado/:emploID" element={<Employe />} />
            <Route path="/infouser/:id" element={<UserInfo />} />
            <Route path="/departamentos" element={<Departaments />} />
            <Route path="/historial" element={<PayrollHistory />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
//
export default App;
