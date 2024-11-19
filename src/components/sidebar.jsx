import React from "react";
import { NavLink } from "react-router-dom";
import K from "../constants";

const Sidebar = () => {
  return (
    <div className="bg-[#E62E2D] min-h-screen fixed w-64 text-white font-bold p-6 space-y-4 flex flex-col gap-8">
      <div className="text-3xl text-center">Logo</div>
      <div className="flex flex-col gap-5 text-white">
        {K.DASHBOARDLINKS.map((item, index) => (
          <NavLink to={item.path} key={index}>
            <div className="flex items-center gap-2 hover:bg-red-200 hover:rounded-md">
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
