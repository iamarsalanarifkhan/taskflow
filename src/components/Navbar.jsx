import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">T</span>
        <h4>
          TaskFlow<span>.</span>
        </h4>
      </div>

      <p className="sidebar-label">WORKSPACE</p>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="nav-item">
          Dashboard
        </NavLink>

        <NavLink to="/tasks" className="nav-item">
          All Tasks
        </NavLink>

        <NavLink to="/add-task" className="nav-item">
          Add New Task
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <span className="footer-dot"></span>
        Stay productive
      </div>
    </aside>
  );
};

export default Navbar;
