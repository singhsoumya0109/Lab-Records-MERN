import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";

function App({ role }) {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register role={role} />} />
        <Route path="/login" element={<Login role={role} />} />
      </Routes>
    </Router>
  );
}

export default App;
