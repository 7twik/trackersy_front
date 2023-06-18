import "./Navbar.scss";
import React, { useState } from "react";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Button } from "@chakra-ui/react";
// import { Wrap, WrapItem } from '@chakra-ui/react'
function Navy(userDetails) {
  const logout = () => {
    window.open(`https://trackersy-back.onrender.com/auth/logout`, "_self");
  };
  const [active, setActive] = useState("navBar");
  //function to toggle Navbar
  const showNav = () => {
    setActive("navBar activeNavbar");
  };
  //function to remove Navbar
  const removeNav = () => {
    setActive("navBar");
  };
  return (
    <section className="navBar section">
      <header className="header flex">
        <div className="logoDiv">
          <a href="/" className="logo flex">
            <h1>
              {/* <MdOutlineTravelExplore className="icon" /> */}
              Welcome {userDetails.user.user.name}!
            </h1>
             <img style={{width:"1.5rem",height:"1.5rem",borderRadius:"50%"}}
             src={userDetails.user.user.picture}
             alt="alt"
           />  
          </a>
        </div>
        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="/" className="navLink">
                Home
              </a>
            </li>
            <li className="navItem">
              <a href="/Inc" className="navLink">
                Income List
              </a>
            </li>
            <li className="navItem">
              <a href="/Exp" className="navLink">
                Expense List
              </a>
            </li>
            <li className="navItem">
              <a href="/Inv" className="navLink">
                Investment List
              </a>
            </li>
            
            <button className="btn lgot" onClick={logout} style={{color:"var(--whiteColor)",background:"var(--chakra-colors-teal-600)"}}>
              Logout
            </button>
          </ul>
          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
}

export default Navy;
