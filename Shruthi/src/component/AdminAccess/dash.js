import React, { useState } from "react"; 
import { FaCartPlus, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWaveAlt, FaMoneyCheckAlt, FaShoppingBag, FaShoppingCart, FaUserTie, FaUsers } from 'react-icons/fa'
import CanvasJSReact from '@canvasjs/react-charts';
import Sidebar from "./Sidebar";
import {GrMoney} from 'react-icons/gr'
import '../css/dashboard.css'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Dash()
{

   
   const options = {
        animationEnabled: true,
        theme:'light2',
        title:{
            text: "Weekly Orders Chart"
        },
        axisX: {
            title: "Week",
            reversed: true,
        },
        axisY: {
            title: "Number of orders",
            includeZero: true,
            
        },
        data: [{
            type: "bar",
            dataPoints: [
                { y:  2200000, label: "Sunday" },
                { y:  1800000, label: "Monday" },
                { y:  8000000, label: "Tuesday" },
                { y:  563000, label: "Wednesday" },
                { y:  3300000, label: "Thursday" },
                { y:  376000, label: "Friday" },
                { y:  8360000, label: "Saturday" }
            ]
        }]
    }
     
    const [data,setData]=useState({
        userCount:20000000,
        merchant:13000,
        driver:40000,
        orders:500000
    })
   
    return(
        <div style={{padding:'20px 20px 20px 20px'}}>
    
   <h3>DASHBOARD</h3>
    <div className="dashb">
     <div className="dash">
       
       
        <div style={{display: "inline-flex"}}>&emsp;&emsp;
            <div className="dashboard-box"><div className="dashboard-text">Total Users<br></br>1421<br></br><FaUsers style={{fontSize:'30px',marginLeft: "180px", marginTop: "40px"}}/></div></div>&emsp;&emsp;
            <div className="dashboard-box"><div className="dashboard-text">Net Profit<br></br>₹ 20,00,505<br></br><FaMoneyCheckAlt style={{fontSize:'30px',marginLeft: "180px", marginTop: "40px"}} /></div></div>&emsp;&emsp;
            <div className="dashboard-box"><div className="dashboard-text">Total Orders<br></br>1421<br></br><FaCartPlus style={{fontSize:'30px',marginLeft: "180px", marginTop: "40px"}}/></div></div>&emsp;&emsp;
            <div className="dashboard-box"><div className="dashboard-text">Total Merchants<br></br>2000<br></br><FaUserTie style={{fontSize:'30px',marginLeft: "180px", marginTop: "40px"}} /></div></div>&emsp;&emsp;
            </div>
       
       
     </div>
     <br></br><br></br>
    
     <div className="bar"style={{ maxWidth: "900px" }} >
     <CanvasJSChart options = {options} />
     </div>
     </div>
        </div>
    )
}