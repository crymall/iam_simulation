import { useState, useEffect } from 'react';
import api from '../services/api';
import Can from './Can';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/users')
      .then(res => setUsers(res.data.users))
      .catch(err => {
        console.error(err);
        setError("Failed to load user list.");
      });
  }, []);

  const handleSimulatedDelete = async (id) => {
    if (!confirm("Confirm Delete? (This is a simulation)")) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers(currentUsers => currentUsers.filter(u => u.id !== id));
      alert("User deleted (Simulation: They will return on refresh)");
    } catch {
      alert("Failed: You do not have permission to delete users.");
    }
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ marginTop: '15px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '8px' }}>ID</th>
            <th style={{ padding: '8px' }}>Username</th>
            <th style={{ padding: '8px' }}>Role</th>
            <th style={{ padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{u.id}</td>
              <td style={{ padding: '8px' }}>{u.username}</td>
              <td style={{ padding: '8px' }}>
                <span style={{ 
                  backgroundColor: '#e2e8f0', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.85em' 
                }}>
                  {u.role}
                </span>
              </td>
              <td style={{ padding: '8px' }}>
                <Can perform="write:users">
                  <button 
                    onClick={() => handleSimulatedDelete(u.id)}
                    style={{ 
                      backgroundColor: '#e53e3e', 
                      color: 'white', 
                      border: 'none', 
                      padding: '5px 10px', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </Can>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <p>No users found.</p>}
    </div>
  );
};

export default UserList;