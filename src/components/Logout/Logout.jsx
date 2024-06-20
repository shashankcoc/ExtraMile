import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../store/firesbase.service";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase logout

      localStorage.clear(); // Clear local storage

      navigate("/login"); // Navigate to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Error logging out. Please try again.");
    }
  };

  return (
    <div>
      {userEmail ? (
        <div className="logout">
          <p className="logout-welcome">
            📙 Welcome to your personalized dashboard
          </p>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="login">
          <h5 className="login-header">Please login to access the dashboard</h5>
          <button className="btn-logout" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;
