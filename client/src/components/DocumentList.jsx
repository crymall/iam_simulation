import Can from "./Can";

const DocumentList = ({ documents, error, handleDeleteDocument }) => {
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="document-list">
      <h3>Confidential Files</h3>
      <ul>
        {documents.map((doc) => (
          <li
            key={doc.id}
            style={{
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <strong>{doc.title}</strong>
            <p>{doc.content}</p>

            <Can perform="delete:documents">
              <button
                onClick={() => handleDeleteDocument(doc.id)}
                style={{ backgroundColor: "#ff4444", color: "white" }}
              >
                Delete
              </button>
            </Can>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
