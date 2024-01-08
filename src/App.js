import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Home from "./pages/Home";
import BarChart from "./pages/Pier";
//import Error from "./pages/Error";
import Login from "./pages/Login";
import Inc from "./pages/Inc";
import Exp from "./pages/Exp";
import Inv from "./pages/Inv";
import Stoc from "./pages/Stoc";
import God from "./pages/RipOff";
// import Stock from "./pages/Stock";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	React.useEffect(()=>{
		if(user!=null){
			localStorage.setItem('tok',user.email);
		}
		},[user])
	  if (isLoading) {
		localStorage.setItem('tok',null);
		return <></>;
	  }

	return (
		<div>
			<Routes>
				<Route
					exact
					path="/"
					element={user ? <Home user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> :<div className="container"> <Login /></div>}
				/>
				<Route
					exact
					path="/inc"
					element={user ? <Inc user={user} /> :<div className="container"> <Login /></div>}
				/>
				<Route
					exact
					path="/pi"
					element=<BarChart />
				/>
				<Route
					exact
					path="/exp"
					element={user ? <Exp user={user} /> :<div className="container"> <Login /></div>}
				/>
				<Route
					exact
					path="/inv"
					element={user ? <Inv user={user} /> :<div className="container"> <Login /></div>}
				/>
				<Route
					exact
					path="/Stock"
					element={user ? <Stoc /> :<div className="container"> <Login /></div>}
				/>
				<Route
					exact
					path="/God"
					element={user ? <God /> :<div className="container"> <Login /></div>}
				/>
			</Routes>
		</div>
	);
}

export default App;
