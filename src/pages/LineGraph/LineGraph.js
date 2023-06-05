import React,{useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import "./graphs.css";
//install : npm install react-apexcharts apexcharts//
function Linechart(props)
{   const dd=new Date();
    const d5=new Date(dd.setDate(dd.getDate() - 5)).toLocaleString();
    const d4=new Date(dd.setDate(dd.getDate() +1)).toLocaleString();
    const d3=new Date(dd.setDate(dd.getDate() +1)).toLocaleString();
    const d2=new Date(dd.setDate(dd.getDate() +1)).toLocaleString();
    const d1=new Date(dd.setDate(dd.getDate() +1)).toLocaleString();
    const d0=new Date(dd.setDate(dd.getDate()+1)).toLocaleString();
    d0.slice(0,9);
    d1.slice(0,9);
    d2.slice(0,9);
    d3.slice(0,9);
    d4.slice(0,9);
    d5.slice(0,9);
    console.log("LINE GRAPH"+d0);
    const[product, setProduct]= useState( [
        {
            name:"Income",
            data:[0,0,0,0,0,0]
        },
        {
        name:"Expense",
        data:[0,0,0,0,0,0]
        },
        {
        name:"Investment",
        data:[0,0,0,0,0,0]
        }
    ]);
    const[option, setOption]= useState({
        title:{ text:"Income, Expense and Investment in last 6 days", align:"center"},
        xaxis:{
            title:{text:"Dates"},
            categories:[d5,d4,d3,d2,d1,d0],
            // categories:[dd.setDate(dd.getDate() - 5),dd.setDate(dd.getDate() - 4),dd.setDate(dd.getDate() - 3),dd.setDate(dd.getDate() - 2),dd.setDate(dd.getDate() - 1),dd.setDate(dd.getDate())]
        },
        yaxis:{
            title:{text:"IN INR"}                 
        }

    });
//     function changeData(){
//         console.log("DATE"+d5.toLocaleString());
//         if (props.inc.length<6 || props.exp.length<6 || props.inv1.length<6)
//         {
//             setProduct(
//                 [
//                     {
//                         name:"Income",
//                         data:[0,0,0,0,0,0]
//                     },
//                     {
//                     name:"Expense",
//                     data:[0,0,0,0,0,0]
//                     },
//                     {
//                     name:"Investment",
//                     data:[0,0,0,0,0,0]
//                     }
//                 ]
//             );

//             setOption(
//                 {
//                     title:{ text:"Income, Expense and Investment in last 6 days", align:"center"},
//                     xaxis:{
//                         title:{text:"Dates"},
//                         categories:[d5,d4,d3,d2,d1,d0],
//                         // categories:[dd.setDate(dd.getDate() - 5).toLocaleString(),dd.setDate(dd.getDate() - 4).toLocaleString(),dd.setDate(dd.getDate() - 3).toLocaleString(),dd.setDate(dd.getDate() - 2).toLocaleString(),dd.setDate(dd.getDate() - 1).toLocaleString(),dd.setDate(dd.getDate()).toLocaleString()]
//                     },
//                     yaxis:{
//                         title:{text:"IN INR"}                 
//                     }

//                 });
//             }
    
        
//         else{
//             setProduct(
//                 [
//                     {
//                         name:"Income",
//                         data:[props.inc[5],props.inc[4],props.inc[3],props.inc[2],props.inc[1],props.inc[0]]
//                     },
//                     {
//                     name:"Expense",
//                     data:[props.exp[5],props.exp[4],props.exp[3],props.exp[2],props.exp[1],props.exp[0]]
//                     },
//                     {
//                     name:"Investment",
//                     data:[props.inv1[5],props.inv1[4],props.inv1[3],props.inv1[2],props.inv1[1],props.inv1[0]]
//                     }
//                 ]
//             );

//             setOption(
//                 {
//                     title:{ text:"Income, Expense and Investment in last 6 days", align:"center"},
//                     xaxis:{
//                         title:{text:"Dates"},
//                         categories:[d5,d4,d3,d2,d1,d0]
//                     },
//                     yaxis:{
//                         title:{text:"IN INR"}                 
//                     }

//                 });
//                 i++;
//                 console.log("i is "+i);
//     }
// }
// var intervalId = window.setInterval(function(){
//     // call your function here
//     changeData();
//   }, 5000);

    useEffect(() => {
        console.log("DATE"+d5.toLocaleString());
        if (props.inc.length<6 || props.exp.length<6 || props.inv1.length<6)
        {
            setProduct(
                [
                    {
                        name:"Income",
                        data:[0,0,0,0,0,0]
                    },
                    {
                    name:"Expense",
                    data:[0,0,0,0,0,0]
                    },
                    {
                    name:"Investment",
                    data:[0,0,0,0,0,0]
                    }
                ]
            );

            setOption(
                {
                    title:{ text:"Income, Expense and Investment in last 6 days", align:"center"},
                    xaxis:{
                        title:{text:"Dates"},
                        categories:[d5,d4,d3,d2,d1,d0],
                        // categories:[dd.setDate(dd.getDate() - 5).toLocaleString(),dd.setDate(dd.getDate() - 4).toLocaleString(),dd.setDate(dd.getDate() - 3).toLocaleString(),dd.setDate(dd.getDate() - 2).toLocaleString(),dd.setDate(dd.getDate() - 1).toLocaleString(),dd.setDate(dd.getDate()).toLocaleString()]
                    },
                    yaxis:{
                        title:{text:"IN INR"}                 
                    }

                });
            }
    
        
        else{
            setProduct(
                [
                    {
                        name:"Income",
                        data:[props.inc[5],props.inc[4],props.inc[3],props.inc[2],props.inc[1],props.inc[0]]
                    },
                    {
                    name:"Expense",
                    data:[props.exp[5],props.exp[4],props.exp[3],props.exp[2],props.exp[1],props.exp[0]]
                    },
                    {
                    name:"Investment",
                    data:[props.inv1[5],props.inv1[4],props.inv1[3],props.inv1[2],props.inv1[1],props.inv1[0]]
                    }
                ]
            );

            setOption(
                {
                    title:{ text:"Income, Expense and Investment in last 6 days", align:"center"},
                    xaxis:{
                        title:{text:"Dates"},
                        categories:[d5,d4,d3,d2,d1,d0]
                    },
                    yaxis:{
                        title:{text:"IN INR"}                 
                    }

                });
                i++;
                console.log("i is "+i)
        }},[props.inc,props.exp,props.inv1,i]);
        var i=0;
        let screenWidth = window.screen.width;
  useEffect(()=>{
    console.log(screenWidth)
  },[])
    return(<React.Fragment>
        <div className='container-fluid mt-3 mb-3'>
                     
          <Chart type='line'
          width={(screenWidth>800) ? "700" : "320"}
          height={(screenWidth>800) ? "550" : "600"}
          series={product}
          options={option }
          className="chartss"
          >
          </Chart>

        </div>
    </React.Fragment>);
}

export default Linechart;