// LayoutWithoutNav.js
import { Outlet } from 'react-router-dom';

const LayoutWithoutNav = () => {
  return (
    <div className="padre_bac">
      <Outlet />
    </div>
  );
};

export default LayoutWithoutNav;
