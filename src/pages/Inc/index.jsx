import React from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Navy from "../Navy/index";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import {
  SimpleGrid,
  Box,
  Stack,
  Button,
  Input,
  FormLabel,
  NumberInputField,
  NumberInput,
} from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { DeleteIcon } from "@chakra-ui/icons";
import { useForceUpdate } from "framer-motion";
function Inc(userDetails) {
  const user = userDetails;
  //const [amt,setAmt]=React.useState(null);
  const [noteIns, setNoteIns] = React.useState(null);

  React.useEffect(() => {
    const options = {
      method: "GET",
      url: "https://trackersy-back.onrender.com/incometable",
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

  const [edit, setEdit] = React.useState(null);
  function deleteFunc(event) {
    setChange(change + 1);
    console.log("id= " + event);
    if (event.target.id !== undefined || event.target.id !== null) {
      const d = {
        _id: event.target.id,
      };
      axios.post("https://trackersy-back.onrender.com/api/incdel", d);
    }
    window.location.reload();
  }

  const [open, setOpen] = React.useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [noteInc, setNoteInc] = React.useState({
    Type: "",
    Desc: "",
    Amt: 0,
    Date: "",
    id: "",
  });
  function handleChangeInc(event) {
    const { name, value } = event.target;

    setNoteInc((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  const submitNoteInc = async (event) => {
    const e = {
      Type: noteInc.Type,
      Desc: noteInc.Desc,
      Amt: noteInc.Amt,
      Date: noteInc.Date,
      id: noteInc.id,
    };
    console.log(noteInc);
    axios.post("https://trackersy-back.onrender.com/upincome", e);
    window.location.reload();
  };
  function editFunc(event) {
    setChange(change + 1);
    console.log(event.target.id);
    setEdit(event.target.id);
    setNoteInc((prevNote) => {
      return {
        ...prevNote,
        id: event.target.id,
      };
    });
    onOpenModal();
  }
  const [input, setInput] = React.useState(true);
  const [change, setChange] = React.useState(0);

  const [amt1, set1] = React.useState(null);
  React.useEffect(() => {
    const options = {
      method: "GET",
      url: "https://trackersy-back.onrender.com/api/income",
      params: { Username: user.user.email },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data.orders[0].totalAmount.$numberDecimal);
        set1(response.data.orders[0].totalAmount.$numberDecimal);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.user.email, change]);

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
        url: "https://trackersy-back.onrender.com/incometable2",
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
        url: "https://trackersy-back.onrender.com/api/income2",
        params: { Username: user.user.email, Type: search1 },
      };

      axios
        .request(options2)
        .then((response) => {
          console.log(response.data.orders[0].totalAmount.$numberDecimal);
          set1(response.data.orders[0].totalAmount.$numberDecimal);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div>
      <Modal
        className="mode"
        open={open}
        onClose={onCloseModal}
        closeOnOverlayClick={false}
        center={true}
      >
        <div className="moddd">
          <div className="mod-top">
            Contact us to get yourself a workplace today{" "}
          </div>
          <form onSubmit={submitNoteInc}>
            {input === true ? (
              <></>
            ) : (
              <div className="modal-bg">
                * Fill Name and Email fields so that we can reach you
              </div>
            )}
            <FormLabel className="home-pad" name="Name">
              Type
            </FormLabel>
            <Input
              placeholder="Type"
              _placeholder={{ opacity: 1, color: "gray.600" }}
              name="Type"
              onChange={handleChangeInc}
            />
            <div className="gap"></div>
            <FormLabel className="home-pad" name="Email">
              Description
            </FormLabel>
            <Input
              placeholder="Description"
              _placeholder={{ opacity: 1, color: "gray.600" }}
              name="Desc"
              onChange={handleChangeInc}
            />
            <FormLabel className="home-pad" name="Email">
              Amount
            </FormLabel>
            <NumberInput className={styles.fie} width="30%" required>
              <NumberInputField name="Amt" onChange={handleChangeInc} />
            </NumberInput>
            <div className="home-pad"></div>
            <Button colorScheme="teal" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </Modal>
      <Navy user={user} />
      <div className={styles.gap}></div>
      <div className={styles.topinc}>
        <h1 className={styles.topic}>Income Table</h1>

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
                    key={noteItem._id}
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
                    key={noteItem._id.slice(0, 5)}
                    className={styles.in}
                    bg="gray.50"
                    height="80px"
                  >
                    {noteItem.Amt["$numberDecimal"].toLocaleString()}
                  </Box>
                  <Box
                    key={noteItem._id.slice(0, 7)}
                    className={styles.in}
                    bg="gray.50"
                    height="80px"
                  >
                    {noteItem.updatedAt.slice(0, 10)}
                  </Box>
                  <Box
                    key={noteItem._id.slice(0, 8)}
                    className={styles.in}
                    bg="gray.50"
                    height="80px"
                  >
                    <button
                      id={noteItem._id}
                      colorScheme="teal"
                      onClick={editFunc}
                      
                    >
                      <AiFillEdit style={{fontSize:"2.5vh"}} />
                    </button>{" "}
                    &nbsp;&nbsp;{" "}
                    <button
                      colorScheme="teal"
                      id={noteItem._id}
                      onClick={deleteFunc}
                    >
                      <AiFillDelete style={{fontSize:"2.5vh"}} />
                    </button>
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
              INR {amt1 === null ? 0 : amt1}
            </Box>
          </SimpleGrid>
        </Stack>
      </div>
    </div>
  );
}

export default Inc;
