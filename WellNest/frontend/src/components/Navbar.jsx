import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          WellNest
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
          <Link to="/" className="hover:text-primary">Home</Link>

          {user && (
            <>
              <Link to="/wellness" className="hover:text-primary">Wellness</Link>
              <Link to="/tools" className="hover:text-primary">Tools</Link>
              <Link to="/goals" className="hover:text-primary">Goals</Link>
              <Link to="/calendar" className="hover:text-primary">Calendar</Link>
              <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="hover:text-primary">Login</Link>
              <Link
                to="/register"
                className="bg-primary text-white px-4 py-1 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3 text-gray-700 font-medium">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>

          {user && (
            <>
              <Link to="/wellness" onClick={() => setOpen(false)}>Wellness</Link>
              <Link to="/tools" onClick={() => setOpen(false)}>Tools</Link>
              <Link to="/goals" onClick={() => setOpen(false)}>Goals</Link>
              <Link to="/calendar" onClick={() => setOpen(false)}>Calendar</Link>
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="bg-primary text-white px-4 py-2 rounded text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-600 text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
