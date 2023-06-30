import styles from "./styles.module.css";
import React from "react";
import { Button,Input,Box } from '@chakra-ui/react';
import axios from 'axios';
import { NseIndia } from  "stock-nse-india";
const Stock = () => {
    const [noteInv, setNoteInv] = React.useState({
		Type: "",
		No: 0,
		Name:"",
	    Amt: 0,
		User: "",
		Desc:""
	  });
      const [note,setNote]=React.useState(null);
      const handleChangeInv = async (event) => {
		const { name, value } = event.target;
		
        const options = await {
            method: 'GET',
            url: 'https://trackersy-back.onrender.com/api/stock',
            params: {Name: event.target.value},
        }

        axios.request(options).then((response) => {
            //console.log(response.data)
           setNote(response.data)

        }).catch((error) => {
            console.error(error)
        })
	  };
      React.useEffect(()=>{
        if (note!==null)
            console.log(note);
      })
  return (
    <div>
        <Input className={styles.fie} name="Name" placeholder='Enter stock/forex/options/Crypto name' size='md' onChange={handleChangeInv} value={noteInv.Stk} required />

        <Box>

    </Box>
    </div>
    
  )
}

export default Stock