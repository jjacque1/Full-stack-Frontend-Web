import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ProjectsPanel from "../components/Projects";
import "./Dashboard.css"

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // prevents flash before redirect
  }

 return (
  <div className="dashboard">
    <div className="dashboard-header">
      <h2>Dashboard</h2>

      <p>
        Logged in as <strong>{user?.name}</strong>
        <span className="email">({user?.email})</span>
      </p>
    </div>

    <ProjectsPanel />
  </div>
);

}

export default Dashboard;
