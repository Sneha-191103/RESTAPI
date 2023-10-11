import React, { useState } from 'react';
import '../css/deliverypartner.css'
import '../css/management.css'
import { FaEnvelope, FaPhoneAlt, FaUnlock, FaUserAlt, FaUserTie } from 'react-icons/fa';
import Popup from '../popup/popup';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import animationData from '../lottie/driver.json';
import { getAllUser } from '../Service/Api';
import { useEffect } from 'react';
export default function UserManagement() {
  const [userData,setUserData]=useState([]);
   const fetchUser=async(e)=>{
    try{
      const response=await getAllUser();
      setUserData(response.data);

    }
    catch{

    }
   }
   useEffect(() => {
    fetchUser();
  }, [])
  return (
  <div style={{padding:'20px 20px 20px 20px'}}>
    <h3>USER DETAILS</h3>
    <div>
    <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>User Email</th>
            <th>User Address</th>
           
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
                <td>{user.uid}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

