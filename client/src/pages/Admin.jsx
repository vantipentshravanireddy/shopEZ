import "./Admin.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  console.log("ADMIN PAGE USER:", user);
console.log(
  "ROLE:",
  user?.user?.role
);

  if (
  user?.user?.role?.toLowerCase() !==
  "admin"
) {
  return <h1>Access Denied</h1>;
}

  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">
        Admin Dashboard
      </h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>
  Total Products: {dashboard.totalProducts}
</h3>

<h3>
  Total Orders: {dashboard.totalOrders}
</h3>

<h3>
  Total Users: {dashboard.totalUsers}
</h3>

<h3>
  Total Revenue: ₹
  {dashboard.totalRevenue}
</h3>
        </div>
      </div>
    </div>
  );
}

export default Admin;