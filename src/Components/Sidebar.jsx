import { useState } from "react";
import { FaCalculator, FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
export function SideBar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-60" : "w-20 "
        } bg-azulClaro p-5 h-full pt-20 relative duration-300`}
      >
        <FaArrowLeft
          className={`absolute cursor-pointer -right-3 top-9 p-2 text-3xl text-white border-white bg-blue-400
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <FaUserCircle
            className={`cursor-pointer duration-500 text-3xl text-white ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            @user
          </h1>
        </div>
        <ul className="flex flex-col gap-5 pt-24">
          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaCalculator />
            <Link className={`${!open && "hidden"} origin-left duration-200`}>
              Nomina
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaCalculator />
            <Link className={`${!open && "hidden"} origin-left duration-200`}>
              Nomina
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaCalculator />
            <Link className={`${!open && "hidden"} origin-left duration-200`}>
              Nomina
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaCalculator />
            <Link className={`${!open && "hidden"} origin-left duration-200`}>
              Nomina
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaCalculator />
            <Link className={`${!open && "hidden"} origin-left duration-200`}>
              Nomina
            </Link>
          </li>

          <li
            className="flex rounded-md p-2 cursor-pointer hover:bg-white/50  text-white text-lg font-Quicksand items-center gap-x-4 
              "
          >
            <FaCalculator />
            <Link className={`${!open && "hidden"} origin-left duration-200`}>
              Nomina
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
