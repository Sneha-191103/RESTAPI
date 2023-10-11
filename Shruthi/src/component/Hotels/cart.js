import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import animationData from '../lottie/empty.json'
import { useNavigate } from 'react-router-dom';

import NavBar from '../pages/navbar';
import Footer from '../AdminAccess/footer';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/cartSlice';
import { FaMinusCircle, FaPlusCircle, FaTrash } from 'react-icons/fa';
import Lottie from 'react-lottie';




const Cart = () => {
  const cartItems = useSelector(state => state.cart.foodItem);
  const navigate = useNavigate()
  const dispatch = useDispatch();
 
  const handleCheckout = () => {
    navigate('/checkout')
  }


  const handleRemoveItem = (itemId, itemName) => {

    dispatch(removeFromCart(itemId));
    
  
  };


  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };


  const totalAmount = cartItems.reduce((acc,foodItem) => {
    return acc + foodItem.foodPrice * foodItem.quantity;
  }, 0);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div>
      <NavBar/>
      {cartItems.length === 0 ? (
        <div style={{padding:'20px 20px 20px 20px'}}>
         <Lottie
         options={defaultOptions}
           height={450}
           width={550}
           />
           <div><center><h2>YOUR CART IS EMPTY!</h2></center></div>
           </div>
      ) : (

        <div style={{padding:'20px 20px 20px 20px'}}>
        <button className='cart-checkout-btn shadow' onClick={handleCheckout}>Checkout </button>
        
          <div className='cart-title-container'>
            <h1 className='cart-title primary'>CART</h1>
            
          </div>
          <div className='shadow bg-white cart-table-container'>
            <table className='cart-data-table'>
              <thead className='cart-data-thead shadow'>
                <tr>
                  <th>
                    FoodItem
                  </th>
                  <th>
                    FoodItem Name
                  </th>
                  <th>
                    Price
                  </th>
                  <th>
                    Order Quantity
                  </th>
                  <th>
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((foodItem) => (
                  <tr key={foodItem.mid}>
                    <td> <img src={foodItem.foodImage}width='100px' height='100px' className='mini-product-img' /></td>
                    <td>{foodItem.foodName}</td>
                    <td>₹ {foodItem.foodPrice}</td>
                    <td>
                      <span className='d-flex-r'>
                        <div className='da' onClick={() => handleDecreaseQuantity(foodItem.mid)}> <FaMinusCircle /> </div>
                        <h3 style={{border:'1px solid black',padding:'5px 8px 5px 8px'}}> {foodItem.quantity}</h3>
                        <div className='da' onClick={() => handleIncreaseQuantity(foodItem.mid)}> <FaPlusCircle /> </div>
                      </span>
                    </td>
                    <td>
                      <div className='da' onClick={() => handleRemoveItem(foodItem.mid, foodItem.foodName)}><FaTrash color="red" /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <center>
          <div className='total'>
          <p className='cart-total'><center>Total: ₹{totalAmount}</center></p>
          </div></center>
        </div>
      )}


      <Footer />
    </div>
  );
};

export { Cart };