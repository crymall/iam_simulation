import { useState, useEffect } from 'react';
import api from '../services/api';
import Can from './Can';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');

  // Fetch documents on mount
  useEffect(() => {
    api.get('/documents')
      .then(res => setDocuments(res.data.documents))
      .catch(err => {
        // If the API returns 403 (Forbidden), we handle it gracefully here
        if (err.response && err.response.status === 403) {
          setError("You do not have permission to view this list.");
        } else {
          setError("Failed to load documents.");
        }
      });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    
    try {
      await api.delete(`/documents/${id}`);
      // Optimistic update: remove from UI immediately
      setDocuments(docs => docs.filter(d => d.id !== id));
    } catch {
      alert("Failed to delete. You might not have permission!");
    }
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="document-list">
      <h3>Confidential Files</h3>
      <ul>
        {documents.map(doc => (
          <li key={doc.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <strong>{doc.title}</strong>
            <p>{doc.content}</p>
            
            {/* The Magic: Only show Delete button if user has 'delete:documents' */}
            <Can perform="delete:documents">
              <button 
                onClick={() => handleDelete(doc.id)}
                style={{ backgroundColor: '#ff4444', color: 'white' }}
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