import React, { useEffect, useState } from 'react';
import '../css/deliverypartner.css'
import '../css/management.css'
import { FaEnvelope, FaLocationArrow, FaPhoneAlt, FaSearchLocation, FaUnlock, FaUserAlt, FaUserTie } from 'react-icons/fa';
import Popup from '../popup/popup';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import animationData from '../lottie/driver.json';
import { GrImage, GrLocation, GrStar } from 'react-icons/gr';
import {MdFoodBank} from 'react-icons/md';
import {LuContact} from 'react-icons/lu';
import {SiMaildotru} from 'react-icons/si';
import { addHotels, getHotels } from '../Service/Api';
export default function MerchantManagement() {
  const [showComponentA, setShowComponentA] = useState(true);

  const toggleComponentA = () => {
    setShowComponentA(true);
  };

  const toggleComponentB = () => {
    setShowComponentA(false);
  };

  
  return (
    <div style={{padding:'20px 20px 20px 20px'}}>
      <h3>MERCHANT MANAGEMENT</h3>
    
      <div class="container">
	<div class="tabs">
		
		<input type="radio" id="radio-2" name="tabs" checked="" onClick={toggleComponentA}></input>
		<label class="tab" for="radio-2">Hotel Lists</label>
		<input type="radio" id="radio-3" name="tabs" onClick={toggleComponentB}></input>
		<label class="tab" for="radio-3">Add Hotels</label>
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
     <div className="headings">HOTEL LISTS</div>
    <div>
    <table>
        <thead>
          <tr>
            <th>Hotel id</th>
            <th>Hotel Name</th>
            <th>Hotel Location</th>
            <th>Hotel Ratings</th>
          </tr>
        </thead>
        <tbody>
          {hotelData.map((hotel, index) => (
            <tr key={index}>
                <td>{hotel.hid}</td>
              <td>{hotel.hotelName}</td>
              <td>{hotel.location}</td>
              <td>{hotel.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

function ComponentB() {
  const [error, setError] = useState(""); // State for error message
    const [successMessage, setSuccessMessage] = useState(""); 
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
      const navigate = useNavigate();
   
    const [hotel,setHotel]=useState({
        hotelName:null,
        rating:0,
        location:null,
        hotelImg:null
    });
    const handlechange=(e)=>{
        setHotel({
            ...hotel,[e.target.name]:e.target.value
        });
    }
    const SubmitLogin=async(e)=>{
        e.preventDefault();
        const res = await addHotels(hotel);
        if (res.data === "Hotel added successfully" && res.status==200) {
           setSuccessMessage("Hotel Registered Successfully!");
            setTimeout(() => {
                navigate('/sidebar/merchantmanagement');
            }, 1500);

        } 
         else if (res.data==="Sommething went wrong!" && res.status==="400") {
           setError("Something went wrong!");
        }
        else{
          setError("Add Fields")
        }
       
        
    }
   

   
    
    return(
        <>
  
        <div className="formbg">
            <div>
          
            <form className="form_mains" onSubmit={(e)=>SubmitLogin(e)}>
           <div className="headings">ADD HOTELS</div>
                <div className="inputContainerd">
                <MdFoodBank style={{fontSize:'35px'}}/>
                <input type="text"  placeholder="Hotel Name" name="hotelName" value={hotel.hotelName} onChange={handlechange} className="inputField" required></input>
                </div>
                <div className="inputContainerd">
                <GrLocation style={{fontSize:'35px'}}/>
                <input type="text"  placeholder="Hotel Location" name="location" value={hotel.location} onChange={handlechange} className="inputField" required></input>
                </div>
                <div className="inputContainerd">
                <GrStar style={{fontSize:'35px'}}/>
                <input type="number"  placeholder="Hotel Rating" name="rating" value={hotel.rating} onChange={handlechange} className="inputField" required></input>
                </div>
                <div className="inputContainerd">
                <GrImage style={{fontSize:'25px'}}/>
                <input type="text"  placeholder="Hotel Image Url" name="hotelImg" value={hotel.hotelImg} onChange={handlechange} className="inputField" required></input>
                </div>
                
            
                <div>
                    <button id="button" type="submit" style={{width:'120px'}}>Add</button>
                </div>
                <br></br>
                {error && <div className="error-message">{error}</div>}
               {successMessage && <div className="success-message">{successMessage}</div>}
               <br></br>
               
                
            </form>
            </div>
            <div className="lottie">
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
        />
    </div>
        {/* {isPopupVisible && <Popup message={message} togglePopup={() => setPopupVisible(false)} handleGotItClick={handleGotItClick} />} */}
        </div>
        </>
    );
}


