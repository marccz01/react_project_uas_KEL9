import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);

  if (!role) {
    return <Login />;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}

export default App;
