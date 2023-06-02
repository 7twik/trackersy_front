import React from 'react'
import { BarElement, CategoryScale, LinearScale} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Chart as ChartJS } from 'chart.js/auto'

const Pier = (props) => {
  const data=[{ name:"Income", value: 100001},{name:"Investment valuation",value: Math.round(100000)},{name:"Expense",value: props.amt2},];

  React.useEffect(()=>{
    console.log(data);
  })

  return (
            <div>
<PieChart width={730} height={250}>
<Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
<Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
        </PieChart>
    </div>
  );
}

export default Pier;

















//   var data = {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   };




//   var options = {
//     maintainAspectRatio: false,
//     scales: {
//     },
//     legend: {
//       labels: {
//         fontSize: 25,
//       },
//     },
//   }

//   return (
//     <div>
//       <Pie
//         data={data}
//         height={400}
//         options={options}

//       />
//     </div>
//   )
// }

// export default PieChart
