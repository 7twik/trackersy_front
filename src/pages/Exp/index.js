import React from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Navy from "../Navy/index";
import {
  SimpleGrid,
  Box,
  Stack,
  Button,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function Exp(userDetails) {
  const user = userDetails;
  const [noteIns, setNoteIns] = React.useState(null);
  const [input, setInput] = React.useState(true);
  const [change, setChange] = React.useState(0);

  const [noteExp, setNoteExp] = React.useState({
    Type: "",
    Desc: "",
    Amt: 0,
    Date: "",
    id: "",
  });

  const [edit, setEdit] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  React.useEffect(() => {
    const options = {
      method: "GET",
      url: "https://trackersy-back.onrender.com/expensetable",
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
      url: "https://trackersy-back.onrender.com/api/expense",
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
  }, [user.user.email, change]);

  function deleteFunc(event) {
    setChange(change + 1);
    console.log("id= " + event.target);
    const d = {
      _id: event.target.id,
    };
    axios.post("https://trackersy-back.onrender.com/api/expdel", d);
  }

  function handleChangeExp(event) {
    const { name, value } = event.target;

    setNoteExp((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  const submitNoteExp = async (event) => {
    const e = {
      Type: noteExp.Type,
      Desc: noteExp.Desc,
      Amt: noteExp.Amt,
      Date: noteExp.Date,
      id: noteExp.id,
    };
    console.log(noteExp);
    axios.post("https://trackersy-back.onrender.com/upexpense", e);
    window.location.reload();
  };
  function editFunc(event) {
    setChange(change + 1);
    console.log(event.target.id);
    setEdit(event.target.id);
    setNoteExp((prevNote) => {
      return {
        ...prevNote,
        id: event.target.id,
      };
    });
    onOpenModal();
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
        url: "https://trackersy-back.onrender.com/expensetable2",
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
        url: "https://trackersy-back.onrender.com/api/expense2",
        params: { Username: user.user.email, Type: search1 },
      };

      axios
        .request(options2)
        .then((response) => {
          console.log(response.data.orders[0].totalAmount.$numberDecimal);
          set2(response.data.orders[0].totalAmount.$numberDecimal);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div>
      <Navy user={user} />
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
          <form onSubmit={submitNoteExp}>
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
              onChange={handleChangeExp}
            />
            <div className="gap"></div>
            <FormLabel className="home-pad" name="Email">
              Description
            </FormLabel>
            <Input
              placeholder="Description"
              _placeholder={{ opacity: 1, color: "gray.600" }}
              name="Desc"
              onChange={handleChangeExp}
            />
            <FormLabel className="home-pad" name="Email">
              Amount
            </FormLabel>
            <NumberInput className={styles.fie} width="30%" required>
              <NumberInputField name="Amt" onChange={handleChangeExp} />
            </NumberInput>
            <div className="home-pad"></div>
            <Button colorScheme="blackAlpha" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </Modal>
      <div className={styles.gap}></div>
      <div className={styles.topinc}>
        <h1 className={styles.topic}>Expense Table</h1>

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
                    <button
                      id={noteItem._id}
                      colorScheme="teal"
                      onClick={editFunc}
                    >
                      <AiFillEdit style={{fontSize:"2.5vh"}} />
                    </button>{" "}
                    &nbsp;&nbsp;{" "}
                    <button
                      className={styles.edit}
                      colorScheme="teal"
                      id={noteItem._id}
                      onClick={deleteFunc}
                    >
                      <AiFillDelete value={noteItem} style={{fontSize:"2.5vh"}}  />
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
              Total Expense :
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
