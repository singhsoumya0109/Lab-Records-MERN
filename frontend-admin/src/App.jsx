import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import { useEffect } from "react";
import useAdminStore from "./stores/useAdminStore";

function App({ role }) {
  const setLoading = useAdminStore((state) => state.setLoading);

  useEffect(() => {
    // Simulate checking token (replace with your real logic if needed)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Router>
      <Navbar role={role} />
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage role={role} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register role={role} />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login role={role} />
            </AuthRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
