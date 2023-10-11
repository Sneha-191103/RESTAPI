import axios from "axios";

const uri='http://localhost:8181';

const authHeader=localStorage.getItem('token')
const headers={
    'Authorization':`Bearer ${authHeader}`,
    'Content-Type':'application/json'
}

//Authentication
export const userlogin=(data)=>axios.post(`${uri}/auth/login`,data);
export const register=(data)=>axios.post(`${uri}/auth/register`,data);
export const getUserbyId = (id) => axios.get(`${uri}/user/find/${id}`,  headers )  

//Product
export const getHotelById=(hid)=>axios.get(`${uri}/hotel/gethotelbyId/${hid}`,{headers});
export const updateHotel=(id,data)=>axios.put(`${uri}/api/v1/admin/${id}`,data,{headers});
export const deleteHotel=(id)=>axios.delete(`${uri}/api/v1/admin/${id}`,{headers});
export const createHotel=(data)=>axios.post(`${uri}/api/v1/admin`,data,{headers});
export const addOrder=(order)=> axios.post(`${uri}/order/add`,order,{headers});
//Admin
export const getAllUser=()=>axios.get(`${uri}/user/get`,{headers})
export const getHotels=()=>axios.get(`${uri}/hotel/get`,{headers})
export const addHotels=(data)=>axios.post(`${uri}/hotel/add`,data,{headers})
export const addMenu=(data)=>axios.post(`${uri}/product/add`,data,{headers})
