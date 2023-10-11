import { Bar } from "react-chartjs-2";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';
import '../css/comment.css'
import {
  Chart,
  BarElement,
  Tooltip,
  LinearScale,
  CategoryScale
} from "chart.js";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";


Chart.register(BarElement, Tooltip, LinearScale, CategoryScale);
const data = [
    { name: 'Jan', positive: 100, negative: -50 },
    { name: 'Feb', positive: 200, negative: -75 },
    { name: 'Mar', positive: 100, negative: -60 },
    { name: 'Apr', positive: 350, negative: -90 },
    { name: 'May', positive: 550, negative: -30 },
    { name: 'June', positive: 150, negative: -20 },
    { name: 'July', positive: 450, negative: -60 },
    { name: 'Aug', positive: 250, negative: -80 },
    { name: 'Sept', positive: 150, negative: -90 },
    { name: 'Oct', positive: 450, negative: -40 },
    { name: 'Nov', positive: 250, negative: -10 },
    { name: 'Dec', positive: 150, negative: -90 },
   
  ];
  function ComponentA(){
    const posComment=[
        {
            name:'Shruthi',
            message:'"The online food ordering system is incredibly convenient and user-friendly. It made placing my order a breeze!"'
        },
        {
            name:'Sneha',
            message:'"Your Service is  really awesome"'
        },
        {
            name:'Sree',
            message:'"very user friendly.Happy Tummy"'
        },
        {
            name:'Vismaya',
            message:'"delivery is so fast.unbelivable"'
        },
        {
            name:'Rithi',
            message:'"far  better than other food delivery websites"'
        },
        {
            name:'Bharath',
            message:'"delivery patners are very kind and helpful"'
        }
    ]
    return(
        <div className="comA" >
            <div className="com">
            {posComment.map((pos, index) => (
            <div key={index}>
               <div className="t1"> <FaUserAlt/>{pos.name}</div>
                <div className="t">{pos.message}</div>
              
             </div>
             
          ))}
            </div>
        </div>
    )
}
function ComponentB(){
  
  const posComment=[
    {
        name:'Sriraam',
        message:'"wsbsite need to be fast"'
    },
    {
        name:'Saran',
        message:'"want neat package of delivery"'
    },
    {
        name:'Suriya',
        message:'"need help center"'
    },
    {
        name:'sk',
        message:'"want a page  which will provide user guide"'
    },
    {
        name:'shiv',
        message:'"food need to be delivered  quickly"'
    },
    {
        name:'sedhu',
        message:'"want  more cuisines"'
    }
]
return(
    <div className="comA" >
        <div className="com">
        {posComment.map((pos, index) => (
        <div key={index}>
           <div className="t1"> <FaUserAlt/>{pos.name}</div>
            <div className="t">{pos.message}</div>
          
         </div>
         
      ))}
        </div>
    </div>
)
} 
  
export default function Comments(){
    const [showComponentA, setShowComponentA] = useState(true);

  const toggleComponentA = () => {
    setShowComponentA(true);
  };

  const toggleComponentB = () => {
    setShowComponentA(false);
  };
return(
    <>
<div className="linechart" style={{padding:'20px 20px 20px 20px'}}>
    <div className="lich">
<LineChart width={600} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" orientation="left" stroke="green" />
      <YAxis yAxisId="right" orientation="right" />
      <CartesianGrid strokeDasharray="3 3" />
      <RechartsTooltip />
      <Legend />
      <Line type="monotone" dataKey="positive" stroke="green" yAxisId="left" name="Positive" />
      <Line type="monotone" dataKey="negative" stroke="#ff6f61" yAxisId="right" name="Negative" />
    </LineChart>
    </div>
    <div className="lich">
    <StarRatingsChart
    starCounts={{
        TotalRating: [15, 43, 32, 91, 40]
        
    }}
    width={500}
    height={200}
/>
</div>
</div>
<br></br>
<hr></hr>
<div>
<div class="container">
	<div class="tabs">
		
		<input type="radio" id="radio-2" name="tabs" checked="" onClick={toggleComponentA}></input>
		<label class="tab" for="radio-2">Positive Comments</label>
		<input type="radio" id="radio-3" name="tabs" onClick={toggleComponentB}></input>
		<label class="tab" for="radio-3">Negative Comments</label>
		<span class="glider"></span>
	</div>
    </div>
    {showComponentA ? (
        <ComponentA />
      ) : (
        <ComponentB />
      )}
</div>
</>
)
}

function StarRatingsChart({
  starCounts,
  width = 250,
  height = 150
}) {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0
      }
    },
    responsive: false,
    scales: {
      x: {
        stacked: true,
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        mode: "y",
        callbacks: {
          label: (item) => {
            const label = labels[item.datasetIndex];
            return `${label}: ${starCounts[label][4 - item.dataIndex]}`;
          }
        }
      }
    }
  };

  const data = {
    labels: ["☆☆☆☆☆", "☆☆☆☆", "☆☆☆", "☆☆", "☆"],
    datasets: []
  };

  let labels = Object.keys(starCounts);
  let numSets = labels.length;
  for (let i = 0; i < numSets; i++) {
    const label = labels[i];
    let series;
    if (i < numSets - 1) {
      series = starCounts[label].map(
        (v, j) => v - starCounts[labels[i + 1]][j]
      );
    } else {
      series = [...starCounts[label]];
    }
    data.datasets.push({
      label,
      data: series.reverse(),
      backgroundColor: `rgba(255, 195, 0, ${Math.pow(0.5, numSets - 1 - i)})`
    });
  }

  const ratings = labels.map((label) => {
    const data = starCounts[label];
    let count = data[0] + data[1] + data[2] + data[3] + data[4];
    let rating = "0.0";
    if (count > 0) {
      rating = (
        (data[0] + data[1] * 2 + data[2] * 3 + data[3] * 4 + data[4] * 5) /
        count
      ).toFixed(1);
    }
    return { label, rating, count };
  });

  return (
    <div className="star-ratings-chart" style={{ width, height }}>
      <table>
        <tbody>
          <tr>
            {ratings.map((r) => (
              <td key={r.label}>
                <h1>
                  {r.rating}
                  <small> ({r.count})</small>
                </h1>
                <p>{r.label}</p>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Bar
        options={options}
        data={data}
        width={width - 10}
        height={height - 50}
      />
    </div>
  );
}

