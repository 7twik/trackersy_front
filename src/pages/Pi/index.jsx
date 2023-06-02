import React from "react";
//import "./App.css";
//import BarChart from "./components/BarChart";
//import LineChart from "./components/LineChart";
import PieChart from "./Piechart";
//import { UserData } from "./Data";

function Pi(props) {

   const datal=[{ name:"Income", value: 100001},{name:"Investment valuation",value: Math.round(100000)},{name:"Expense",value: props.amt2},];

      const [userData, setUserData] = React.useState({
        labels: datal.map((data) => data.value),
        datasets: [
          {
            label: "Users Gained",
            data: datal.map((data) => data.name),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });

  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

  return (
    <div className="App">
      <div style={{ width: 700 }}>
        <PieChart chartData={userData} />
      </div>
    </div>
  );
}

export default Pi;