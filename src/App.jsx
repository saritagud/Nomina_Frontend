import { Route, Routes } from "react-router-dom";
import { DashboardAdmin2 } from "./Components/DashboardAdmin2";
import { DashboardSuperAdmin } from "./Components/DashboardSuperAdmin";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Payroll } from "./Components/Payroll";
import { Deductions } from "./Components/Deductions";
import { Perceptions } from "./Components/Perceptions";
import { Employees } from "./Components/Employees";
import { Settings } from "./Components/Settings";
import { Companies } from "./Components/Companies";
import { Users } from "./Components/Users";
import { PrePayroll } from "./Components/PrePayroll";
import { Employe } from "./Components/Employe";
import ProtectedRouter from "./Components/ProtectedRouter";
import { userRoles } from "./logic/constantes";
import { UserInfo } from "./Components/InforUser";
function App() {
  const { SuperAdmin, Admin, User } = userRoles;
  return (
    <div className="h-full">
      <Routes>
        <Route
          element={
            <ProtectedRouter allowedRoles={[SuperAdmin]} redirectTo="/login" />
          }
        >
          <Route index element={<DashboardSuperAdmin />} />
          <Route path="/empresas" element={<Companies />} />
        </Route>
        <Route path="/login" element={<Login />} />
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
          <Route path="/deducciones" element={<Deductions />} />
          <Route path="/percepciones" element={<Perceptions />} />
          <Route path="/empleados" element={<Employees />} />
          <Route path="/configuraciones" element={<Settings />} />
          <Route path="/empleado/:emploID" element={<Employe />} />
          <Route path="/infouser/:id" element={<UserInfo />} />
        </Route>
      </Routes>
    </div>
  );
}
//
export default App;
