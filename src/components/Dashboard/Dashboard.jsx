import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Dashboard.css";
import db from "../../store/firesbase.service";
import Logout from "../Logout/Logout";

const Dashboard = () => {
  const [loginData, setLoginData] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const [single, setSingle] = useState({});
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(localStorage.getItem("userEmail") === "admin@gmail.com");
    const fetchLoginData = async () => {
      try {
        const snapshot = await db.collection("login").get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (!admin && userEmail) {
          const user = data.find((user) => user.email === userEmail);
          if (user) {
            setSingle(user); // Set single user's data
          } else {
            console.warn(`User with email ${userEmail} not found.`);
          }
        }
        setLoginData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchLoginData();
  }, []);

  return (
    <>
      <div className="dashboard-logout">
        <Logout />
      </div>
      <div>
        {!admin && userEmail && <Card employee={single} />}
        {!admin && !userEmail && <p></p>}
        {admin && (
          <div className="container-employee">
            {loginData.map((employee) => (
              <Card key={employee.id} employee={employee} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
