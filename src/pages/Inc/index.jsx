import React from "react";
import styles from "./styles.module.css";
import axios from 'axios';
import Navy from '../Navy/index';
import { SimpleGrid, Box, Stack } from '@chakra-ui/react';

function Inc(userDetails){
    const user = userDetails;
    //const [amt,setAmt]=React.useState(null);
    const [noteIns,setNoteIns]=React.useState(null);
    

    React.useEffect(()=>{
            const options = {
                method: 'GET',
                url: 'http://localhost:8080/incometable',
                params: {Username: user.user.email},
            };

            axios.request(options).then((response) => {
                //console.log(response.data)
                response.data.reverse();
               setNoteIns(response.data)

            }).catch((error) => {
                console.error(error)
            });
    },[user.user.email]);

  
    const [amt1,set1]=React.useState(null);
    React.useEffect(()=>{
       const options = {
       method: 'GET',
       url: 'http://localhost:8080/api/income',
       params: {Username: user.user.email},
   };

   axios.request(options).then((response) => {
       console.log(response.data.orders[0].totalAmount.$numberDecimal);
      set1(response.data.orders[0].totalAmount.$numberDecimal);

   }).catch((error) => {
       console.error(error)
   });
},[user.user.email]);




    return(<div>
        <Navy user={user} />
        <div className={styles.gap}></div>
        <h1 className={styles.topic}>Income Table</h1>
        <div className={styles.gap}></div>
        <div className={styles.table}>
            <Stack spacing={2}>
                <SimpleGrid columns={4} spacing={1}>
                    <Box className={styles.head} bg='teal' height='80px'> Type </Box>
                    <Box className={styles.head} bg='teal' height='80px'> Description </Box>
                    <Box className={styles.head} bg='teal' height='80px'> Amount </Box>
                    <Box className={styles.head} bg='teal' height='80px'> Date </Box>
                </SimpleGrid>
                {(noteIns!=null)?noteIns.map((noteItem)=>{
                        return(<SimpleGrid className={styles.in} columns={4} spacing={1} key={noteItem._id}>
                                    <Box key="1" className={styles.in} bg='gray.50' height='80px'>{noteItem.Type}</Box>
                                    <Box key="2" className={styles.in} bg='gray.50' height='80px'>{noteItem.Desc}</Box>
                                    <Box key="3" className={styles.in} bg='gray.50' height='80px'>{noteItem.Amt['$numberDecimal'].toLocaleString()}</Box>
                                    <Box key="4" className={styles.in} bg='gray.50' height='80px'>{noteItem.updatedAt.slice(0,10)}</Box>
                                </SimpleGrid>);
                }):<></>}
                <SimpleGrid columns={2} spacing={1}>
                    <Box className={styles.head} bg='teal' height='80px'>Total Income :</Box>
                    <Box className={styles.head} bg='teal' height='80px'>INR {(amt1===null)?0:amt1}</Box>
                </SimpleGrid>
            </Stack>
        </div>
    </div>
    );}


export default Inc;
