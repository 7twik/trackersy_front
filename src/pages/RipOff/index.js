import React from 'react'
//import { NseIndia } from  "stock-nse-india";
import axios from "axios";
const God = () => {
    //const  nseIndia = new  NseIndia();
    const [nameNSE,setNameNSE]=React.useState([]);
    const [noteNSE,setNoteNSE]=React.useState([]);
		
    React.useEffect(()=>{
        axios.get("https://trackersy-backend.onrender.com/api/stockzz").then(res =>{
             setNameNSE(res.data);
             console.log(res.data+","+noteNSE);
        });
        //getData();
    },[noteNSE]);
    const handleChangeInvy = async (e)=> {
        const val=e.target.value;
        console.log(val);
        const options = {
            method: 'GET',
            url: 'https://trackersy-backend.onrender.com/rtkQ',
            params: {Name: val},
        };

        await axios.request(options).then((response) => {
            console.log(response.data);
           setNoteNSE(response.data)

        }).catch((error) => {
            console.error(error)
        });
    }
  return (
    <div>
        <input list="data" onChange={handleChangeInvy} placeholder="Search" />
            <datalist id="data">
                
                {(nameNSE===0)?<></>:nameNSE.map((op,index)=><div className="item" key={index}><option key={index}>{op}</option></div>)}
            </datalist>
<div className="main">
            

        </div>

    </div>
  );
}

export default God;