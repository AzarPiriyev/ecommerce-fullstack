import React, { useEffect, useState } from 'react';
import Navigation from '../navigation';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users'); 
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers(); 
  }, []); 

  
  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        setError(err.message); 
      }
    }
  };

  
  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'Admin' ? 'User' : 'Admin'; 
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }), 
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      
      setUsers(users.map(user => 
        user._id === id ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
     
      <div className='bg-gray-900 text-white w-[250px] p-6'>
        <Navigation />
      </div>

      
      <div className='w-full p-8'>
      
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-semibold text-gray-800'>Users</h2>
        </div>

        
        <div className="overflow-x-auto rounded-lg shadow-lg">
          {loading ? (
            <div className="text-center py-4">Loading...</div> 
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div> 
          ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Full Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{user.fullName}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">{user.role}</td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleRole(user._id, user.role)} 
                          className='bg-yellow-400 text-white py-1 px-3 rounded-md hover:bg-yellow-500 transition duration-300 shadow-md'>
                          {user.role === 'Admin' ? 'Revoke Admin' : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)} 
                          className='bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-300 shadow-md'>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
