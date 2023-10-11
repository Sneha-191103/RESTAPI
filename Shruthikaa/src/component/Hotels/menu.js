import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../pages/navbar";
import Footer from "../AdminAccess/footer";
import { getHotelById } from "../Service/Api";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

export default function Menu(){
    const {hid}=useParams();
    const dispatch = useDispatch();
  const handleAdd = (foodItem ) => {
   
    dispatch(addToCart( foodItem));
};
    console.log({hid});
    const [hotel, setHotels] = useState(null);

    useEffect(() => {
        const fetchHotelData = async () => {
          try {
            const response = await getHotelById(hid);
           
            setHotels(response.data);
          } catch (error) {
            console.error('Error fetching hotel data:', error);
          }
        };
    
        fetchHotelData();
      }, [hid]);
 console.log(hotel);
 if (!hotel) {
    return <div>Loading...</div>;
  }
  
    return(
        <>
        <NavBar/>
        <div><img src={hotel.hotelImg} width='100%' height='200px'></img></div>
      <div className="hotel-menu-card">
      {hotel.menus.map((menu,index)=>(
                  <div key={menu.mid} className="menu-items-card">
                    <div><img src={menu.foodImage} className='foodImage-tag' width='350px' height='300px'></img></div>
                    <div className="menu-card-items">
                      <div className="left">
                        <div className="hotel-name-card">
                        <b>{hotel.hotelName}</b>
                        </div>
                        <div className="food-item-card">
                          {menu.foodName}
                        </div>
                      </div>
                      <div className="right">
                        <div className="rating-hotel">
                        <FaStar style={{width:'15px', height:'15px'}}/>{hotel.rating}
                        </div>
                        <div className="price-card">
                       <b> ₹ {menu.foodPrice}</b>
                        </div>
                      </div>
                      <button className='product-btn' onClick={() => handleAdd(menu)}>
                                Add to cart
                            </button>
                    </div>
                   
                  </div>
                ))
              }
      </div>
      <Footer/> 
        </>
    )
}