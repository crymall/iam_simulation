import { useState } from "react";
import api from "../services/api";

const CreateDocumentForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/documents", formData);
      setFormData({ title: "", content: "" });
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Failed to create document. Ensure you have permission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#e6fffa",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
        border: "1px solid #4fd1c5",
      }}
    >
      <h3>New Document</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Document Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            style={{ width: "95%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Content..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
            rows="3"
            style={{ width: "95%", padding: "8px" }}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Document"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            marginLeft: "10px",
            backgroundColor: "#ccc",
            color: "black",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateDocumentForm;
