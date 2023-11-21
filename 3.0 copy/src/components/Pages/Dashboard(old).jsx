import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Page_comp/Navbar.tsx'
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile data
        const userProfileResponse = await axios.get('http://localhost:4000/api/user/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });
        console.log('User Profile Response:', userProfileResponse.data);
        setUserData(userProfileResponse.data);
  
        // Fetch purchase history
        const historyResponse = await axios.get('http://localhost:4000/api/user/purchase-history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });
        console.log('Purchase History Response:', historyResponse.data);
        setPurchaseHistory(historyResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handlePasswordChange = async () => {
    try 
    {
      // Prompt the user for a new password
      const newPasswordInput = window.prompt('Enter your new password:');
      console.log('New password input:',newPasswordInput);
      if (newPasswordInput === null) 
      {
        // User clicked cancel
        return;
      }

      // Change password
      await axios.patch(
        'http://localhost:4000/api/user/change-password',
        { new_password: newPasswordInput },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        }
      );
      setChangePasswordError(null);
      setNewPassword('');
      alert('Password changed successfully!');
    } 
    
    catch (error) 
    {
      console.error('Error changing password:', error);
      setChangePasswordError(`Error changing password: ${error.message}`);
    }
  };

  if (!userData) {
    // You can render a loading indicator while fetching data
    return <p>Loading...</p>;
  }

  // Function moved to Navbar.tsx
  // const handleLogout = async () => 
  // {
  //   try 
  //   {
  //     // Make a POST request to the logout endpoint
  //     const response = await fetch('http://localhost:4000/api/user/logout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  //       },
  //     });

  //     // Check if logout was successful
  //     if (response.ok) 
  //     {
  //       localStorage.removeItem('access_token');  // Clear user data from local storage
  //       navigate('/');                            // Redirect to the homepage
  //     } 
  //     else 
  //     {
  //       console.error('Logout failed:', response.statusText);
  //     }

  //   } 
  //   catch (error) 
  //   {
  //     console.error('Error during logout:', error);
  //   }
  // };

  return (
  <div>

    <Navbar />
    <h1>Dashboard</h1>
    <p>First Name: {userData.FIRST_NAME}</p>
    <p>Last Name: {userData.LAST_NAME}</p>
    <p>Email: {userData.EMAIL}</p>

        <h2>Purchase History</h2>
    <ul>
      {purchaseHistory.map((purchase) => (
        <li key={purchase.id}>
          Item: {purchase.ITEM_NAME}, Quantity: {purchase.QUANTITY}
        </li>
      ))}
    </ul>

    <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>

      {/* Use a button to trigger the password change */}
      <button onClick={handlePasswordChange} style={{ marginRight: '10px' }}>Change Password</button>
      {changePasswordError && <p style={{ color: 'red' }}>{changePasswordError}</p>}

      {/* Add a button or link to navigate to the logout page #Button moved to navbar */}
      {/* <button onClick={handleLogout}>Logout</button> */}

    </div>

  </div>
  );
};

export default Dashboard;