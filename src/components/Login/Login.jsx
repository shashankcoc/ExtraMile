import db from "../../store/firesbase.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Query Firestore to check if the user exists with the provided email and password
      const querySnapshot = await db
        .collection("login")
        .where("email", "==", email)
        .where("password", "==", password)
        .get();

      if (querySnapshot.empty) {
        // User not found or incorrect credentials
        setError("Invalid email or password. Please try again.");
        console.error("Invalid email or password");
      } else {
        // User found, login successful
        console.log("Login successful");
        // Store user email in local storage
        localStorage.setItem("userEmail", email);
        // Navigate to dashboard or redirect to desired page
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle Firestore query errors
      setError("Error logging in. Please try again later.");
      console.error("Error logging in:", error.message);
    }
  };
  return (
    <div className="container">
      <h2 className="title">Login</h2>
      <form onSubmit={handleLogin} className="register-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
