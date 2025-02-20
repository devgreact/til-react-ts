import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";

import "./header.css";

interface HeaderProps {
  children?: React.ReactNode;
}
// const Header: React.FC<HeaderProps> = ({ children }) => {
//   return (
//     <div>
//       Header
//       <div>{children}</div>
//     </div>
//   );
// };

const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <div>
      Header
      <div style={{ display: "flex" }}>
        <ul style={{ flex: 1, display: "flex" }}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "")}
              to="/good"
            >
              Good
            </NavLink>
          </li>
        </ul>
        {children}
      </div>
    </div>
  );
};

export default Header;
