import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useUserStore"; // Zustand store
import { LogOut, LogIn, UserPlus, LayoutDashboard } from "lucide-react"; // Lucide icons

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthStore(); // Zustand store

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:underline">
        JU LABS
      </Link>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="flex items-center bg-green-800 px-4 py-2 rounded hover:bg-gray-700"
            >
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </>
        ) : (
          <div className="space-x-4 flex">
            <Link
              to="/login"
              className="flex items-center bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
