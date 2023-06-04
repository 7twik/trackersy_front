// import { Link } from "react-router-dom";
// import styles from "./styles.module.css";
import "./Navbar.scss";
import React, { useState } from "react";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Button } from "@chakra-ui/react";
// import { Wrap, WrapItem } from '@chakra-ui/react'
function Navy(userDetails) {
  const logout = () => {
    window.open(`http://localhost:8080/auth/logout`, "_self");
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
    // <nav className={styles.out}>
    //   <div className={styles.f3}>
    //     <div className={styles.top}>
    //       {" "}
    //       <h1> Welcome {userDetails.user.user.name}! </h1>
    //       <img
    //         className={styles.profile_img}
    //         src={userDetails.user.user.picture}
    //         alt="alt"
    //       />
    //     </div>
    //     <div className={styles.f2}>
    //       <div className={styles.f2}>
    //       <a href="/">
    //         <Button w="120px" colorScheme="teal" variant="outline">
    //           Home
    //         </Button>
    //         </a>
    //       </div>
    //       <div className={styles.f2}>
    //       <a href="/Inc">
    //         <Button w="120px" colorScheme="teal" variant="outline">
    //           Income List
    //         </Button>
    //         </a>
    //       </div>
    //       <div className={styles.f2}>
    //       <a href="/Exp">
    //         <Button w="120px" colorScheme="teal" variant="outline">
    //          Expense List
    //         </Button>
    //         </a>
    //       </div>
    //       <div className={styles.f2}>
    //       <a href="/Inv">
    //         <Button w="120px" colorScheme="teal" variant="outline">
    //           Investment List
    //         </Button>
    //         </a>
    //       </div>{" "}
    //     </div>
    //   </div>
    //   <Button colorScheme="teal" onClick={logout}>
    //     Logout
    //   </Button>
    //</nav>
    <section className="navBar section">
      <header className="header flex">
        <div className="logoDiv">
          <a href="/" className="logo flex">
          {/* <img
                className="icon"
                src={userDetails.user.user.picture}
                alt="alt"
              /> */}
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
              <a href="/" className="navLink">
                Income List
              </a>
            </li>
            <li className="navItem">
              <a href="/" className="navLink">
                Expense List
              </a>
            </li>
            <li className="navItem">
              <a href="/" className="navLink">
                Investment List
              </a>
            </li>
            
            <button className="btn" onClick={logout} style={{color:"white"}}>
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
