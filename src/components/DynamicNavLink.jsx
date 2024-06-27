import { NavLink, useLocation } from 'react-router-dom';

function DynamicNavLink({ to, children ,className}) {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={`font-sen font-semibold ${
        className
          ? className
          : 'flex flex-col justify-center items-center p-2 text-xl'
      } ${isActive ? 'text-green-500' : 'text-gray-500'}`}
    >
      {children}
    </NavLink>
  );
}

export default DynamicNavLink;
