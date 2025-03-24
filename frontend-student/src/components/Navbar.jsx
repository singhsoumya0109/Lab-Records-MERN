import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useUserStore"; // Import the Zustand store

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthStore(); // Use Zustand store

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:underline">
        JU LABS
      </Link>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
