import { useState } from "react";
import {
  FaCalculator,
  FaArrowLeft,
  FaUserCircle,
  FaClipboardList,
  FaCog,
  FaBookmark,
} from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
export function SideBar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-64" : "w-20 "
        } bg-azulClaro p-5 h-full pt-20 relative duration-300`}
      >
        <FaArrowLeft
          className={`absolute cursor-pointer -right-3 top-9 p-2 text-3xl text-white border-white bg-blue-400
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
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
            @user
          </h1>
        </div>
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
            to={"/admin"}
          >
            <AiFillHome />
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Dashboard
            </p>
          </Link>
          <Link
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
            to={"/nomina"}
          >
            <FaCalculator />
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Nómina
            </p>
          </Link>

          <Link
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
            to={"/empleados"}
          >
            <FaClipboardList />
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Empleados
            </p>
          </Link>

          <Link
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
            to={"/configuraciones"}
          >
            <FaCog />
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Configuraciones
            </p>
          </Link>

          <Link
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
            to={"/historial"}
          >
            <FaBookmark />
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Historial
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* import { useState } from "react";
import {
  FaCalculator,
  FaArrowLeft,
  FaUserCircle,
  FaClipboardList,
  FaCog,
  FaBookmark,
} from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
let rol = JSON.parse(localStorage.getItem("user")).role;

export function SideBar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-64" : "w-20 "
        } bg-azulClaro p-5 h-full pt-20 relative duration-300`}
      >
        <FaArrowLeft
          className={`absolute cursor-pointer -right-3 top-9 p-2 text-3xl text-white border-white bg-blue-400
          border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
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
            @{rol.name}
          </h1>
        </div>
        {rol == "superAdmin" ? (
          <div className="flex flex-col gap-5 pt-10">
            <Link
              className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
              to={"/dashboardSuperAdmin"}
            >
              <AiFillHome />
              <p className={`${!open && "hidden"} origin-left duration-200`}>
                Dashboard
              </p>
            </Link>

            <Link
              className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
              to={"/crearEmpresa"}
            >
              <FaCalculator />
              <p className={`${!open && "hidden"} origin-left duration-200`}>
                Crear empresa
              </p>
            </Link>
          </div>
        ) : (
          <>
            {rol == "admin" ? (
              <div className="flex flex-col gap-5 pt-10">
                <Link
                  className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
                  to={"/dashboardAdmin"}
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
                  to={"/configuraciones"}
                >
                  <FaCog />
                  <p
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Configuraciones
                  </p>
                </Link>

                <Link
                  className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
                  to={"/historial"}
                >
                  <FaBookmark />
                  <p
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Historial
                  </p>
                </Link>
              </div>
            ) : (
              <div>
                {rol == "user" && (
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
                        Nómina
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

 */
