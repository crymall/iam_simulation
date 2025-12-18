import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import useAuth from "../context/useAuth";
import Can from "../components/Can";
import DocumentList from "../components/DocumentList";
import CreateDocumentForm from "../components/CreateDocumentForm";
import UserList from "../components/UserList";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [documentsError, setDocumentsError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const fetchDocuments = useCallback(() => {
    api
      .get("/documents")
      .then((res) => {
        setDocuments(res.data.documents);
        setDocumentsError("");
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setDocumentsError("You do not have permission to view this list.");
        } else {
          setDocumentsError("Failed to load documents.");
        }
      });
  }, []);

  const handleDeleteDocument = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      await api.delete(`/documents/${id}`);
      setDocuments((docs) => docs.filter((d) => d.id !== id));
    } catch {
      alert("Failed to delete. You might not have permission!");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDocumentCreated = async () => {
    await fetchDocuments();
    setShowCreateForm(false);
  };

  useEffect(() => fetchDocuments(), [fetchDocuments]);

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
            {!showCreateForm && (
              <button
                onClick={() => setShowCreateForm(true)}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "10px",
                }}
              >
                + Create New Document
              </button>
            )}
          </Can>
        </div>

        {showCreateForm && (
          <CreateDocumentForm
            onSuccess={handleDocumentCreated}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        <DocumentList
          documents={documents}
          error={documentsError}
          handleDeleteDocument={handleDeleteDocument}
        />
      </section>

      <Can perform="read:users">
        <section
          style={{
            marginTop: "40px",
            borderTop: "2px dashed #ccc",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>⚠️ Admin Control Panel</h2>
            <button onClick={() => setShowAdminPanel(!showAdminPanel)}>
              {showAdminPanel ? "Hide Panel" : "Manage Users"}
            </button>
          </div>

          {showAdminPanel && (
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#fff5f5",
                padding: "15px",
                border: "1px solid #feb2b2",
                borderRadius: "8px",
              }}
            >
              <p style={{ fontSize: "0.9em", color: "#c53030" }}>
                <strong>Security Clearance:</strong> {user.role.toUpperCase()}
              </p>
              <UserList />
            </div>
          )}
        </section>
      </Can>
    </div>
  );
};

export default Dashboard;
