import React from "react";
import styles from "./styles.module.css";
import axios from "axios";
//import { useNavigate } from 'react-router-dom';
import Navy from "../Navy/index";
import { SimpleGrid, Box, Stack, Button, Input } from "@chakra-ui/react";

function Inv(userDetails) {
  const user = userDetails;
  React.useEffect(() => {
    axios.post("http://localhost:8080/api/upload", "hello");
  }, [user.user.email]);
  //const [amt,setAmt]=React.useState(null);
  const [noteIns, setNoteIns] = React.useState(null);
  React.useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8080/investtable",
      params: { Username: user.user.email },
    };

    axios
      .request(options)
      .then((response) => {
        //console.log(response.data)
        response.data.reverse();
        setNoteIns(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.user.email]);

  const [amt3, set3] = React.useState(null);
  React.useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8080/investOri",
      params: { Username: user.user.email },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data.orders[0].totalAmount.$numberDecimal);
        set3(response.data.orders[0].totalAmount.$numberDecimal);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.user.email]);

  const [amt4, set4] = React.useState(null);
  React.useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8080/investCha",
      params: { Username: user.user.email },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data.orders[0].totalAmount.$numberDecimal);
        set4(response.data.orders[0].totalAmount.$numberDecimal);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.user.email]);

  const [amt5, set5] = React.useState(null);
  React.useEffect(() => {
    set5(((amt4 - amt3) / amt3) * 100);
  }, [amt3, amt4]);

  // React.useEffect(()=>{
  //     (noteIns)?noteIns.map((noteItem)=>{return(console.log(noteItem.Type))}):
  //     console.log();
  // });
  function submitRed(event) {
    const set = event.target.innerHTML;
    console.log(event.target.innerHTML);
    window.location.href = "https://www.google.com/search?q=" + set + "+stocks";
    //setLink("https://www.google.com/search?q="+set+"+stocks");
    // navigate("https://www.google.com/search?q="+set+"+stocks");
  }

  ///Search//////////////////////////////////////////////////
  const [search1, setSearch1] = React.useState(null);
  function handleSearch(event) {
    setSearch1(event.target.value);
  }
  function search() {
    if (search1 === "") {
      window.location.reload();
    } else {
      const options = {
        method: "GET",
        url: "http://localhost:8080/investtable2",
        params: { Username: user.user.email, Type: search1 },
      };

      axios
        .request(options)
        .then((response) => {
          //console.log(response.data)
          response.data.reverse();
          setNoteIns(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      const options2 = {
        method: "GET",
        url: "http://localhost:8080/investOri2",
        params: { Username: user.user.email, Type: search1 },
      };

      axios
        .request(options2)
        .then((response) => {
          console.log(response.data.orders[0].totalAmount.$numberDecimal);
          set3(response.data.orders[0].totalAmount.$numberDecimal);
        })
        .catch((error) => {
          console.error(error);
        });

      const options3 = {
        method: "GET",
        url: "http://localhost:8080/investCha2",
        params: { Username: user.user.email, Type: search1 },
      };

      axios
        .request(options3)
        .then((response) => {
          console.log(response.data.orders[0].totalAmount.$numberDecimal);
          set4(response.data.orders[0].totalAmount.$numberDecimal);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div>
      <Navy user={user} />
      <div className={styles.gap}></div>
      <div className={styles.topinc}>
        <h1 className={styles.topic}>Investment Table</h1>

        <div className={styles.searcc}>
          <Input
            placeholder="Search"
            _placeholder={{ opacity: 1, color: "gray.600" }}
            name="Type"
            onChange={handleSearch}
          />
          <Button colorScheme="teal" onClick={search}>
            Search
          </Button>{" "}
        </div>
      </div>

      <div className={styles.gap}></div>
      <div className={styles.table}>
        <Stack spacing={2}>
          <SimpleGrid columns={6} spacing={1}>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              Name{" "}
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              Description{" "}
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              No. Of Shares{" "}
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              Price of Buying{" "}
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              Current Price{" "}
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              Current Total Valuation{" "}
            </Box>
          </SimpleGrid>
          {noteIns != null ? (
            noteIns.map((noteItem) => {
              return (
                <SimpleGrid
                  className={styles.in}
                  columns={6}
                  spacing={1}
                  key={noteItem._id}
                >
                  <Box
                    key="1"
                    className={styles.in}
                    bg="gray.50"
                    height="80px"
                    onClick={submitRed}
                    value={noteItem.Name}
                  >
                    {noteItem.Name}
                  </Box>
                  <Box key="2" className={styles.in} bg="gray.50" height="80px">
                    {noteItem.Desc}
                  </Box>
                  <Box key="3" className={styles.in} bg="gray.50" height="80px">
                    {noteItem.No["$numberDecimal"].toLocaleString()}
                  </Box>
                  <Box key="4" className={styles.in} bg="gray.50" height="80px">
                    {noteItem.Amt["$numberDecimal"].toLocaleString()}
                  </Box>
                  <Box key="5" className={styles.in} bg="gray.50" height="80px">
                    {Math.round(
                      (noteItem.Ca["$numberDecimal"] * 100) / 100
                    ).toLocaleString()}
                    (
                    {(
                      ((noteItem.Ca["$numberDecimal"] -
                        noteItem.Amt["$numberDecimal"]) /
                        noteItem.Amt["$numberDecimal"]) *
                      100
                    ).toLocaleString()}
                    %)
                  </Box>
                  <Box key="6" className={styles.in} bg="gray.50" height="80px">
                    {Math.round(
                      (noteItem.Ca["$numberDecimal"] *
                        noteItem.No["$numberDecimal"] *
                        100) /
                        100
                    ).toLocaleString()}
                  </Box>
                </SimpleGrid>
              );
            })
          ) : (
            <></>
          )}
          <SimpleGrid columns={2} spacing={1}>
            <Box className={styles.head} bg="teal" height="80px">
              Total Investment Value :
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              INR {Math.round((amt4 === null ? 0 : amt4) * 100) / 100} (
              {Math.round((amt5 === null ? 0 : amt5) * 100) / 100}%)
            </Box>
          </SimpleGrid>
        </Stack>
      </div>
    </div>
  );
}

export default Inv;
