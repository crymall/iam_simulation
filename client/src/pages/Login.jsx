import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      navigate('/dashboard');
    } catch {
      setError('Invalid Credentials');
    }
  };

  return (
    <div>
      <h2>IAM Simulation Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={formData.username}
          onChange={e => setFormData({...formData, username: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={e => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      
      <div style={{marginTop: '20px', fontSize: '0.8rem'}}>
        <p><strong>Test Users:</strong></p>
        <ul>
          <li>alice_admin / password123</li>
          <li>bob_editor / password123</li>
          <li>charlie_view / password123</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;