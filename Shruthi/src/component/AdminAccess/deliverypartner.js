import React, { useState } from 'react';
import '../css/deliverypartner.css'
import '../css/management.css'
import { FaEnvelope, FaPhoneAlt, FaUnlock, FaUserAlt, FaUserTie } from 'react-icons/fa';
import Popup from '../popup/popup';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import animationData from '../lottie/admin1.json';
import {LuContact} from 'react-icons/lu';
import {SiMaildotru} from 'react-icons/si';
import { MdContacts, MdDateRange, MdFoodBank, MdImage, MdLineWeight, MdMonetizationOn, MdMoney, MdNoFood, MdNote, MdProductionQuantityLimits } from 'react-icons/md';
import { useEffect } from 'react';
import { addMenu, getHotels } from '../Service/Api';
export default function DeliveryPartner() {
  const [showComponentA, setShowComponentA] = useState(true);

  const toggleComponentA = () => {
    setShowComponentA(true);
  };

  const toggleComponentB = () => {
    setShowComponentA(false);
  };

  
  return (
    <div style={{padding:'20px 20px 20px 20px'}}>
      <h3>MENU MANAGEMENT</h3>
      <div class="container">
	<div class="tabs">
		
		<input type="radio" id="radio-2" name="tabs" checked="" onClick={toggleComponentA}></input>
		<label class="tab" for="radio-2">Menu List</label>
		<input type="radio" id="radio-3" name="tabs" onClick={toggleComponentB}></input>
		<label class="tab" for="radio-3">Add Menu</label>
		<span class="glider"></span>
	</div>
    
</div>
    

      {showComponentA ? (
        <ComponentA />
      ) : (
        <ComponentB />
      )}
    </div>
  );
}

function ComponentA() {
  const [hotelData,setHotelData]=useState([]);
  const fetchHotel=async()=>{
    try{
    const res=await getHotels();
    console.log(res.data);
    setHotelData(res.data);
    }
    catch{
      
    }
  }
useEffect(()=>{
  fetchHotel();
},[]) 
  return (
  <div>
     <div className="headings">MENU LISTS</div>
     <div>
    <table>
        <thead>
          <tr>
            <th>Hotel id</th>
            <th>Hotel Name</th>
            <th>Hotel Location</th>
            <th>Hotel Ratings</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {hotelData.map((hotel, index) => (
            <tr key={index}>
                <td>{hotel.hid}</td>
              <td>{hotel.hotelName}</td>
              <td>{hotel.location}</td>
              <td>{hotel.rating}</td>
              {/* <td onClick={handleAddMenu}>Add Menu</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

function ComponentB() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
      const navigate = useNavigate();
   
      const [error, setError] = useState(""); // State for error message
      const [successMessage, setSuccessMessage] = useState(""); 
      
      const [menu,setMenu]=useState({
          foodName:null,
          foodPrice:'',
          foodQuantity:'',
          foodImage:null,
          foodDesc:null,
          hid:''
      });
      const handlechange=(e)=>{
          setMenu({
              ...menu,[e.target.name]:e.target.value
          });
      }
      const SubmitLogin=async(e)=>{
          e.preventDefault();
          try{
          const res = await addMenu(menu);
          if (res.data === "Menu added successfully!" && res.status==200) {
             setSuccessMessage("Menu Added Successfully!");
              setTimeout(() => {
                  navigate('/sidebar/merchantmanagement');
              }, 1500);
  
          } 
           else if (res.data==="Sommething went wrong!" && res.status==="400") {
             setError("Something went wrong!");
          }
          else if(res.status==="403"){
            setError("Add Fields")
          }
        }
        catch(error){
          setError("Error occured")
        }
         
          
      }
     
  
     
   
    
    return(
        <>
  
        <div className="formbg">
            <div>
          
            <form className="form_mains" onSubmit={(e)=>SubmitLogin(e)}>
           <div className="headings">ADD MENU ITEMS</div>
                <div className="inputContainerd">
                <MdFoodBank style={{fontSize:'25px'}}/>
                <input type="number"  placeholder="Hotel id" name="hid" value={menu.hid} onChange={handlechange} className="inputField"></input>
                </div>
                <div className="inputContainerd">
                    <MdNoFood style={{fontSize:'25px'}}/>
                <input type="text" placeholder="Food Name" name="foodName" value={menu.foodName} onChange={handlechange} className="inputField"></input>
                </div>

                <div className="inputContainerd">
                <MdMonetizationOn style={{fontSize:'25px'}}/>
                <input type="number"  placeholder="Food Price" name="foodPrice" value={menu.foodPrice} onChange={handlechange} className="inputField"></input>
                </div>
                <div className="inputContainerd">
                <MdProductionQuantityLimits style={{fontSize:'25px'}}/>
                <input type="number"  placeholder="Food Quantity" name="foodQuantity" value={menu.foodQuantity} onChange={handlechange} className="inputField"></input>
                </div>

                <div className="inputContainerd">
                <MdImage style={{fontSize:'25px'}}/>
                <input type="text"  placeholder="Food Image Url" name="foodImage" value={menu.foodImage} onChange={handlechange} className="inputField"></input>
                </div>

                <div className="inputContainerd">
                <MdNote style={{fontSize:'25px'}}/>
                <input type="text"  placeholder="Food Description" name="foodDesc" value={menu.foodDesc} onChange={handlechange} className="inputField"></input>
                </div>
                <br></br>
                {error && <div className="error-message">{error}</div>}
               {successMessage && <div className="success-message">{successMessage}</div>}
               <br></br>
                <br></br>
                <div>
                    <button id="button" type="submit" style={{width:'120px'}}>Add</button>
                </div>
               
                
            </form>
            </div>
            <div className="lottie">
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
        />
    </div>
      
        </div>
        </>
    );
}


