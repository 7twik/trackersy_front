// import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";
import { Button } from '@chakra-ui/react';
// import { Wrap, WrapItem } from '@chakra-ui/react'
function Navy(userDetails) {
    // React.useEffect(()=>{
    //     console.log(userDetails.user.user.picture);
    // })
    const logout = () => {
		window.open(`http://localhost:8080/auth/logout`, "_self");
	};
    return(<nav className={styles.out}><div className={styles.f3}>
        <div className={styles.top}> <h1> Welcome {userDetails.user.user.name}! </h1>
        <img className={styles.profile_img} src={userDetails.user.user.picture} alt="alt" /></div>
        <div className={styles.f2}>
        <div  className={styles.f2}>
        <Button w="120px" colorScheme='teal' variant='outline'>
         <a href="/">Home</a>
        </Button></div><div  className={styles.f2}>
        <Button w="120px" colorScheme='teal' variant='outline'>
         <a href="/Inc">Income List</a>
        </Button></div><div  className={styles.f2}>
        <Button w="120px" colorScheme='teal' variant='outline'>
         <a href="/Exp">Expense List</a>
        </Button></div><div  className={styles.f2}>
        <Button w="120px" colorScheme='teal' variant='outline'>
        <a href="/Inv">Investment List</a>
        </Button></div> </div></div>
        <Button colorScheme='teal' onClick={logout}>
         Logout
        </Button>
        
        
    </nav>);

}

export default Navy;