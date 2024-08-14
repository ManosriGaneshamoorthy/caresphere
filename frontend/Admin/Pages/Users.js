import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Users.css';
import logo from '../Assets/logo.png';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/login');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
        setError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard">
      <div className="sidebar" style={{ width: 250, backgroundColor: '#333', color: '#fff', padding: 0, position: 'fixed', top: 0, bottom: 0, left: 0 }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: 20, paddingLeft: 2 }}>
          <img src={logo} alt="Logo" />
          <h2>CARESPHERE</h2>
        </div>
        <ul>
          <li><Link to="/admin/home">Dashboard</Link></li>
          <li><Link to="/admin/doc">Doctors</Link></li>
          <li><Link to="/admin/add">Add Doctors</Link></li>
          <li><Link to="/admin/user">Users</Link></li>
          <li><Link to="/admin/logout">Logout</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Users</h1>
        </div>
        <div className="content">
          <div className="searchArea">
            <input
              type="text"
              placeholder='Search...'
              className='userListSearch'
              onChange={handleSearch}
              value={search}
            />
          </div>
          <ul className='userList'>
            {users.filter((user) => {
              return (
                user.username.toLowerCase().includes(search.toLowerCase()) ||
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.country.toLowerCase().includes(search.toLowerCase())
              );
            }).map((user) => (
              <li className='user-card' key={user.id}> {/* Use user.id as the key */}
                <h3 className='username'>{user.username}</h3>
                <p className='fullname'>{user.firstName} {user.lastName}</p>
                <a href={`mailto:${user.email}`} className='email'>{user.email}</a>
                <p className='location'>{user.country}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Users;
