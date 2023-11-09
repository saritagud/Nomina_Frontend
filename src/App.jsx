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
function App() {
  return (
    <>
      <Routes>
        <Route index element={<DashboardSuperAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/pre-nomina" element={<PrePayroll />} />
        <Route path="/nomina" element={<Payroll />} />
        <Route path="/deducciones" element={<Deductions />} />
        <Route path="/percepciones" element={<Perceptions />} />
        <Route path="/empleados" element={<Employees />} />
        <Route path="/configuraciones" element={<Settings />} />
        <Route path="/dashboard2" element={<DashboardAdmin2 />} />
        <Route path="/empresas" element={<Companies />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/emplo" element={<Employe />} />
      </Routes>
    </>
  );
}

export default App;
