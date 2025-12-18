import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import Can from "../components/Can";
import DocumentList from "../components/DocumentList";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>IAM Simulation Dashboard</h1>
        <button onClick={handleLogout}>Log Out</button>
      </header>

      <section
        style={{
          backgroundColor: "#f0f0f0",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2>Current User Profile</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          <span style={{ color: "blue", fontWeight: "bold" }}>{user.role}</span>
        </p>
        <p>
          <strong>Permissions:</strong>
        </p>
        <ul>
          {user.permissions.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Documents</h2>

          <Can perform="write:documents">
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px",
              }}
            >
              + Create New Document
            </button>
          </Can>
        </div>

        <DocumentList />
      </section>

      {/* Admin Only Area */}
      <Can perform="read:users">
        <section
          style={{
            marginTop: "40px",
            borderTop: "2px dashed #ccc",
            paddingTop: "20px",
          }}
        >
          <h2>⚠️ Admin Control Panel</h2>
          <p>
            Only users with the <code>read:users</code> permission can see this
            section.
          </p>
          <button>Manage Users</button>
          <button style={{ marginLeft: "10px" }}>System Logs</button>
        </section>
      </Can>
    </div>
  );
};

export default Dashboard;
