import React, { useEffect, useState } from "react"; 
import '../css/login.css'
import { FaAddressBook, FaAt, FaLock, FaMailBulk, FaPhoneAlt } from 'react-icons/fa'
import Lottie from 'react-lottie';
import animationData from '../lottie/login.json';
import animationDat from '../lottie/Admin.json';
import { Link, useNavigate } from "react-router-dom";  
import { useDispatch ,useSelector} from "react-redux";         
import { login } from "../redux/userslice";
import {register, userlogin , } from '../Service/Api'
import Popup from "../popup/popup";
import { useUser } from "../Context/usercontext";
export default function Login(){
    const [isRegistering, setIsRegistering] = useState(false);

    const switchToRegister = () => {
      setIsRegistering(true);
    };
  
    const switchToLogin = () => {
      setIsRegistering(false);
    };
  
    return (
      <div className="name-login">
        <div className="imglogin">
                <div>
                <img src="https://img.freepik.com/free-photo/tasty-homemade-traditional-pizza-italian-recipe_24972-2143.jpg?w=1380&t=st=1695963665~exp=1695964265~hmac=9529e2a731ad5d4ed89854a0df03b5c6e4895723d3c70e3db011962fb801f4cc" 
                      width='120%'
                      height='100%'
                      style={{ opacity: 0.3 ,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)', }}
                >
                </img>
            </div>
        </div>
        {isRegistering ? (
          <UserRegistration switchToLogin={switchToLogin} />
        ) : (
          <UserLogin switchToRegister={switchToRegister} />
        )}
      </div>
    );  
}


function UserLogin({ switchToRegister })
{
    const { login: userLogin } = useUser();
    const navigate = useNavigate();
   
    const [user,setUser]=useState({
        email:'',
        password:''
    });
    const [error, setError] = useState(""); // State for error message
    const [successMessage, setSuccessMessage] = useState(""); 
    const handlechange=(e)=>{
        setUser({
            ...user,[e.target.name]:e.target.value
        });
    }
  
    const SubmitLogin=async (e)=>{
        e.preventDefault();
        const res = await userlogin(user);
        console.log(res.data);
        console.log(res.status);
        if ((res.status) === 200 && (res.data.role)=== "CUSTOMER")  {
            console.log(res.data);
            
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('Role', res.data.role);
   

            const getuid = (res.data.uid);
            console.log(getuid)
            localStorage.setItem('xuserName', res.data.name);
            localStorage.setItem('xuserEmail', res.data.email);
            localStorage.setItem('xuserId', res.data.uid);
            localStorage.setItem('xuserPhone', res.data.phone);
            localStorage.setItem('xuserAddress', res.data.address);

            setSuccessMessage("Login Success");
            setTimeout(() => {
                navigate('/landing');
            }, 1500);

        }
        else if((res.status)=== 200 && (res.data.role)=== "ADMIN"){
            console.log(res.data);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('Role', res.data.role);
            localStorage.setItem('AdminEmail', res.data.email);

           setSuccessMessage("Login Successful!");
            setTimeout(() => {
                navigate('/sidebar/dash');
            }, 1500);
        }
        
        else {
           setError("Invalid email or pass!");
        } 
    };


        // const formValues = Object.values(user);
        // if (!formValues.some((value) => !value)) {
           
        //     userLogin();
        //     dispatch(login({
        //         username:user.username
                
        //      }))
        //      setSuccessMessage("Login successful!")
        //      setError("");
        //      setTimeout(() => {
        //         navigate("/landing")
        //       }, 1000);
            
        // } 
        // else{
        //     setError("Incorrect username or password.");
        // }
    
    const dispatch=useDispatch();
   
    
    return(
        <div className='login-form' >
            <div className="formbground">
           <form className="form_main" onSubmit={(e)=>SubmitLogin(e)}>
                <div className="heading">USER LOGIN</div>
                <div className="inputContainer-login">
                <FaAt/>
                <input type="text" placeholder="Username" name="email" value={user.email} onChange={handlechange} className="inputField-login"></input>
                </div>
                <div className="inputContainer-login">
                <FaLock/>
                <input type="password"  placeholder="Password" name="password" value={user.password} onChange={handlechange} className="inputField-login"></input>
                </div><br></br>
                {error && <div className="error-message">{error}</div>}
               {successMessage && <div className="success-message">{successMessage}</div>}
               <br></br>
                <div>
                    <button className="loginbutton" type="submit">LOGIN</button>
                </div>
                <br></br>
                <div>create account?<button onClick={switchToRegister}>signup</button></div>
                
            </form>
            </div>
  
        </div>
    )
}
function UserRegistration({ switchToLogin })
{
    const [error, setError] = useState(""); // State for error message
    const [successMessage, setSuccessMessage] = useState(""); 
      const navigate=useNavigate();
      const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(user);
        if (res.data === "User registered successfully" && res.status==200) {
           setSuccessMessage("Registration Successful!");
            setTimeout(() => {
                navigate('/login');
                window.location.reload(false);
            }, 1500);

        } 
         else if (res.data==="Sommething went wrong!" && res.status==="400") {
           setError("Something went wrong!");
        }
    };


     
  
   
     
   
    const [user, setUser] = useState({
        name: '',
        phone: 0,
        email: '',
        password: '',
        address:'',
        role:'customer'
    });
    const handlechange=(e)=>{
        setUser({
            ...user,[e.target.name]:e.target.value
        });
    }
   
    
    return(
        <div className="login-form">
         <div className="formbground">
       <form className="form_main" onSubmit={handleSubmit}>
      <div className="heading">REGISTER</div>
           <div className="inputContainer-login">
           <FaAt/>
           <input type="text"  placeholder="Username" name="name" value={user.name} onChange={handlechange} className="inputField-login"></input>
           </div>
           <div className="inputContainer-login">
           <FaMailBulk/>
           <input type="text"  placeholder="Email" name="email" value={user.email} onChange={handlechange} className="inputField-login"></input>
           </div>
            <div className="inputContainer-login">
           <FaPhoneAlt/>
           <input type="number" placeholder="Phone Number" name="phone" value={user.phonenumber} onChange={handlechange} className="inputField-login"></input>
           </div>
            <div className="inputContainer-login">
            <FaLock/>
           <input type="password"  placeholder="Password" name="password" value={user.password} onChange={handlechange} className="inputField-login"></input>
           </div>
           <div className="inputContainer-login">
           <FaAddressBook/>
           <input type="text" placeholder="Address" name="address" value={user.address} onChange={handlechange} className="inputField-login"></input>
           </div>
           <br></br>
                {error && <div className="error-message">{error}</div>}
               {successMessage && <div className="success-message">{successMessage}</div>}
               <br></br>
           <div>
               <button type="submit" className="loginbutton">SIGNUP</button>
           </div>
           <br></br>
           <div>already have an account?<button onClick={switchToLogin}>login</button></div>
       </form>
       </div>
     
   </div>
    )
}