import React from "react";
import styles from "./styles.module.css";
import axios from 'axios';
import Navy from '../Navy/index';
import { SimpleGrid, Box, Stack , Button} from '@chakra-ui/react';
import {AiFillEdit , AiFillDelete } from "react-icons/ai";
import { DeleteIcon } from '@chakra-ui/icons'
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


    function deleteFunc(event){
        console.log(event);
        const d={
            _id:event.target.id
        }
        axios.post("http://localhost:8080/api/incdel", d);
        window.location.href("");
    }
    function editFunc(event){
        console.log(event.target.id);

    }
  
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
                <SimpleGrid columns={5} spacing={1}>
                    <Box className={styles.head} bg='teal' height='80px'> Type </Box>
                    <Box className={styles.head} bg='teal' height='80px'> Description </Box>
                    <Box className={styles.head} bg='teal' height='80px'> Amount </Box>
                    <Box className={styles.head} bg='teal' height='80px'> Date </Box>
                    <Box className={styles.head} bg='teal' height='80px'> Edit/Delete </Box>
                </SimpleGrid>
                {(noteIns!=null)?noteIns.map((noteItem)=>{
                        return(<SimpleGrid className={styles.in} columns={5} spacing={1} key={noteItem._id}>
                                    <Box key={noteItem._id} className={styles.in} bg='gray.50' height='80px'>{noteItem.Type}</Box>
                                    <Box key={noteItem._id.slice(0,6)} className={styles.in} bg='gray.50' height='80px'>{noteItem.Desc}</Box>
                                    <Box key={noteItem._id.slice(0,5)} className={styles.in} bg='gray.50' height='80px'>{noteItem.Amt['$numberDecimal'].toLocaleString()}</Box>
                                    <Box key={noteItem._id.slice(0,7)} className={styles.in} bg='gray.50' height='80px'>{noteItem.updatedAt.slice(0,10)}</Box>
                                    <Box key={noteItem._id.slice(0,8)} className={styles.in} bg='gray.50' height='80px'><Button id={noteItem._id} colorScheme='teal' onClick={editFunc}><AiFillEdit name={noteItem._id} onClick={editFunc} /></Button> &nbsp;&nbsp; <Button colorScheme='teal'  id={noteItem._id} onClick={deleteFunc}><div id={noteItem._id} onClick={deleteFunc}><AiFillDelete   /></div></Button></Box>
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