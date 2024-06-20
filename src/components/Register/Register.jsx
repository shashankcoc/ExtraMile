import { useState } from "react";
import db from "../../store/firesbase.service";
import { useNavigate } from "react-router-dom";
import "./Register.css";
const Register = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    try {
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Error logging out. Please try again.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Check if user with the same email already exists
      const snapshot = await db
        .collection("login")
        .where("email", "==", email)
        .get();
      if (!snapshot.empty) {
        setError("User with this email already exists.");
        return;
      }
      await db.collection("login").add({
        name: name,
        email: email,
        password: password,
        reviews: [],
        feedback: "",
        // Add more fields as needed
      });
      // Set isRegistered to true after successful registration
      // e.target.reset();
      navigate("/login");

      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Error registering user. Please try again later.");
    }
  };
  return (
    <div className="main-container">
      <div className="container">
        <h1 className="title">Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit">Register</button>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
