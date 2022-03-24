import React from "react";
import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, activeIcon, inActiveIcon }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (isActive ? activeIcon : inActiveIcon)}
    </NavLink>
  );
};

export default CustomNavLink;
