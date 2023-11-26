import {
  FaCalculator,
  FaArrowLeft,
  FaUserCircle,
  FaClipboardList,
  FaCog,
  FaBookmark,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { userRoles } from "../logic/constantes";

export function SideBar({ open, onToggle }) {
  const navegar = useNavigate();
  const { SuperAdmin, Admin, User } = userRoles;
  const rol = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).role
    : null;
    const name = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).name
    : null;
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    navegar("/login");
  };
  return (
    <div className="fixed">
      <div
        className={` ${
          open ? "w-64 h-screen" : "w-20 h-screen"
        } bg-azulClaro p-5 h-full pt-20 relative duration-300`}
      >
        <FaArrowLeft
          className={`absolute cursor-pointer -right-3 top-9 p-2 text-3xl text-white border-white bg-blue-400
          border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={onToggle}
        />
        <div className="flex gap-x-4 items-center ">
          <FaUserCircle
            className={` duration-500 text-3xl text-white ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`${
              !open && "hidden"
            } origin-left duration-200 text-white font-medium text-xl`}
          >
            {name}
          </h1>
        </div>
        {rol == SuperAdmin ? (
          <div className="flex flex-col gap-5 pt-10">
            <Link
              className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
              to={"/"}
            >
              <AiFillHome />
              <p className={`${!open && "hidden"} origin-left duration-200`}>
                Dashboard
              </p>
            </Link>

            <Link
              className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
              to={"/empresas"}
            >
              <FaCalculator />
              <p className={`${!open && "hidden"} origin-left duration-200`}>
                Empresas
              </p>
            </Link>

            <div
              className="flex  p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 mt-80 border-t-2 border-grisClaro/70 hover:rounded-md  
              "
              onClick={logout}
            >
              <CiLogout />
              <p className={`${!open && "hidden"} origin-left duration-200`}>
                Cerrar Sesion
              </p>
            </div>
          </div>
        ) : (
          <>
            {rol == Admin ? (
              <div className="flex flex-col   gap-6 pt-10">
                <Link
                  className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
                  to={"/admin"}
                >
                  <AiFillHome />
                  <p
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Dashboard
                  </p>
                </Link>
                <Link
                  className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
                  to={"/nomina"}
                >
                  <FaCalculator />
                  <p
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Nómina
                  </p>
                </Link>

                <Link
                  className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
                  to={"/pre-nomina"}
                >
                  <FaBookmark />
                  <p
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Pre-Nómina
                  </p>
                </Link>

                <Link
                  className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
                  to={"/empleados"}
                >
                  <FaClipboardList />
                  <p
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Empleados
                  </p>
                </Link>

                <Link
                  className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
                  to={"/departamentos"}
                >
                  <FaClipboardList />
                  <p
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Departamentos
                  </p>
                </Link>

                <Link
                  className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
                  to={"/configuraciones"}
                >
                  <FaCog />
                  <p
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Configuraciones
                  </p>
                </Link>

                <div
                  className="flex p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 mt-10 border-t-2 border-grisClaro/70 hover:rounded-md  
              "
                  onClick={logout}
                >
                  <CiLogout />
                  <p
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Cerrar Sesion
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {rol == User && (
                  <div className="flex flex-col gap-5 pt-10">
                    <Link
                      className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
                      to={"/nomina"}
                    >
                      <FaCalculator />
                      <p
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        Nóminas
                      </p>
                    </Link>

                    <Link
                      className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
                      to={"/empleados"}
                    >
                      <FaClipboardList />
                      <p
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        Empleados
                      </p>
                    </Link>
                    <div
                      className="flex  p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 mt-10 border-t-2 border-grisClaro/70 hover:rounded-md  
              "
                      onClick={logout}
                    >
                      <CiLogout />
                      <p
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        Cerrar Sesion
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
