import { useState } from "react";
import {
  FaCalculator,
  FaArrowLeft,
  FaUserCircle,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
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
        <ul className="flex flex-col gap-5 pt-10">
          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <AiFillHome />
            <Link
              className={`${!open && "hidden"} origin-left duration-200`}
              to={"/"}
            >
              Dashboard
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <AiFillHome />
            <Link
              className={`${!open && "hidden"} origin-left duration-200`}
              to={"/dashboard2"}
            >
              Dashboard
            </Link>
          </li>
          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaCalculator />
            <Link
              className={`${!open && "hidden"} origin-left duration-200`}
              to={"/nomina"}
            >
              Nómina
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaClipboardList />
            <Link
              className={`${!open && "hidden"} origin-left duration-200`}
              to={"/empleados"}
            >
              Empleados
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaMoneyCheckAlt />
            <Link
              className={`${!open && "hidden"} origin-left duration-200`}
              to={"/deducciones"}
            >
              Deducciones
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaFileInvoiceDollar />
            <Link
              className={`${!open && "hidden"} origin-left duration-200`}
              to={"/percepciones"}
            >
              Percepciones
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaCog />
            <Link
              className={`${!open && "hidden"} origin-left duration-200`}
              to={"/configuraciones"}
            >
              Configuraciones
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaBookmark />
            <Link
              className={`${!open && "hidden"} origin-left duration-200`}
              to={"/historial"}
            >
              Historial
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
