import React from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Navy from "../Navy/index";
import { SimpleGrid, Box, Stack, Button } from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function Exp(userDetails) {
  const user = userDetails;
  //const [amt,setAmt]=React.useState(null);
  const [noteIns, setNoteIns] = React.useState(null);

  React.useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8080/expensetable",
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

  const [amt2, set2] = React.useState(null);
  React.useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/expense",
      params: { Username: user.user.email },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data.orders[0].totalAmount.$numberDecimal);
        set2(response.data.orders[0].totalAmount.$numberDecimal);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.user.email]);

  function deleteFunc(event) {
    console.log("id= " + event.target);
    const d = {
      _id: event.target.id,
    };
    axios.post("http://localhost:8080/api/expdel", d);
  }
  function editFunc(event) {
    console.log(event.target.id);
  }

  return (
    <div>
      <Navy user={user} />

      <div className={styles.gap}></div>
      <h1 className={styles.topic}>Expense Table</h1>
      <div className={styles.gap}></div>
      <div className={styles.table}>
        <Stack spacing={2}>
          <SimpleGrid columns={5} spacing={1}>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              Type{" "}
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              Description{" "}
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              Amount{" "}
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              Date{" "}
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              {" "}
              Edit/Delete{" "}
            </Box>
          </SimpleGrid>
          {noteIns != null ? (
            noteIns.map((noteItem) => {
              return (
                <SimpleGrid
                  className={styles.in}
                  columns={5}
                  spacing={1}
                  key={noteItem._id}
                >
                  <Box
                    key={noteItem._id.slice(0, 5)}
                    className={styles.in}
                    bg="gray.50"
                    height="80px"
                  >
                    {noteItem.Type}
                  </Box>
                  <Box
                    key={noteItem._id.slice(0, 6)}
                    className={styles.in}
                    bg="gray.50"
                    height="80px"
                  >
                    {noteItem.Desc}
                  </Box>
                  <Box
                    key={noteItem._id.slice(0, 9)}
                    className={styles.in}
                    bg="gray.50"
                    height="80px"
                  >
                    {noteItem.Amt["$numberDecimal"].toLocaleString()}
                  </Box>
                  <Box
                    key={noteItem._id.slice(0, 4)}
                    className={styles.in}
                    bg="gray.50"
                    height="80px"
                  >
                    {noteItem.createdAt.slice(0, 10)}
                  </Box>
                  <Box
                    key={noteItem._id.slice(0, 8)}
                    className={styles.in}
                    bg="gray.50"
                    height="80px"
                  >
                    <Button
                      id={noteItem._id}
                      colorScheme="teal"
                      onClick={editFunc}
                    >
                      <AiFillEdit />
                    </Button>{" "}
                    &nbsp;&nbsp;{" "}
                    <Button
                      className={styles.edit}
                      colorScheme="teal"
                      id={noteItem._id}
                      onClick={deleteFunc}
                    >
                      <AiFillDelete value={noteItem} />
                    </Button>
                  </Box>
                </SimpleGrid>
              );
            })
          ) : (
            <></>
          )}
          <SimpleGrid columns={2} spacing={1}>
            <Box className={styles.head} bg="teal" height="80px">
              Total Income :
            </Box>
            <Box className={styles.head} bg="teal" height="80px">
              INR {amt2 === null ? 0 : amt2}
            </Box>
          </SimpleGrid>
        </Stack>
      </div>
    </div>
  );
}

export default Exp;
