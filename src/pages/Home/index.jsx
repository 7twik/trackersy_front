import styles from "./styles.module.css";
import ReactCardFlip from "react-card-flip";
import Linechart from "../LineGraph/LineGraph";
import React, { useEffect } from "react";
import axios from "axios";
//import NavBar from "../NavBar";
import Navy from "../Navy/index";
//import InvSell from "../InvSell";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Stack,
  Input,
  Textarea,
  Button,
  Select,
  Stat,
  StatLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";

//import "bootstrap/dist/css/bootstrap.min.css";

function Home(userDetails) {
  const user = userDetails;
  const [flip, setFlip] = React.useState(false);
  function submitRed(event) {
    const set = event.target.innerHTML;
    console.log(event.target.innerHTML);
    window.location.href = "https://www.google.com/search?q=" + set + "+stocks";
  }
  //expense code         /////////////////////////////////////////////////////////
  const [noteExp, setNoteExp] = React.useState({
    Type: "",
    Desc: "",
    Amt: 0,
    User: "",
  });
  function handleChangeExp(event) {
    const { name, value } = event.target;

    setNoteExp((prevNote) => {
      return {
        ...prevNote,
        User: userDetails.user.email,
        [name]: value,
      };
    });
  }
  const submitNoteExp = async (event) => {
    console.log(noteExp);
    axios.post("https://trackersy-back.onrender.com/expense", noteExp);
    window.location.reload();
  };
  ////////////////////////////////////////////////////////////////////////////////

  //income code         /////////////////////////////////////////////////////////
  const [noteInc, setNoteInc] = React.useState({
    Type: "",
    Desc: "",
    Amt: 0,
    User: "",
  });
  function handleChangeInc(event) {
    const { name, value } = event.target;

    setNoteInc((prevNote) => {
      return {
        ...prevNote,
        User: userDetails.user.email,
        [name]: value,
      };
    });
  }
  const submitNoteInc = async (event) => {
    // setNoteInc((prevNote)=>{
    // 	return{
    // 		...prevNote,
    // 		User: userDetails.user.email
    // 	}
    // })
    console.log(noteInc);
    axios.post("https://trackersy-back.onrender.com/income", noteInc);
    window.location.reload();
  };
  /////////////////////////////////////////////////////////////////////////

  //investment code         /////////////////////////////////////////////////////////
  const [noteInv, setNoteInv] = React.useState({
    Type: "",
    No: 0,
    Name: "",
    Amt: 0,
    User: "",
    Desc: "",
  });
  function handleChangeInv(event) {
    const { name, value } = event.target;

    setNoteInv((prevNote) => {
      return {
        ...prevNote,

        User: userDetails.user.email,
        [name]: value,
      };
    });
  }
  const submitNoteInv = async (event) => {
    axios.post("https://trackersy-back.onrender.com/invest", noteInv);
    console.log(noteInv);
    window.location.reload();
  };

  const [check, setCheck] = React.useState(false);

  const [nameNSE, setNameNSE] = React.useState([]);
  const [noteNSE, setNoteNSE] = React.useState(0);

  React.useEffect(() => {
    axios.get("https://trackersy-back.onrender.com/api/stockzz").then((res) => {
      setNameNSE(res.data);
      console.log(res.data);
    });
    //getData();
  }, []);
  const handleChangeInvy = async (e) => {
    const val = e.target.value;
    console.log(val);
    const options = {
      method: "GET",
      url: "https://trackersy-back.onrender.com/rtkQ",
      params: { Name: val },
    };

    await axios
      .request(options)
      .then((response) => {
        console.log(response);
        setNoteNSE(response);
        handleChangeInv(e);
      })
      .catch((error) => {
        console.error("2" + error);
        setCheck(false);
      });
  };
  React.useEffect(() => {
    if (noteNSE) {
      if (
        noteNSE.request.response === '{"data":[],"msg":"no data found"}' ||
        noteNSE.request.response === '"Missing symbol."' ||
        noteNSE.data.message ===
          "TypeError: Cannot read property 'length' of undefined"
      ) {
        setCheck(false);
        setNoteInv((prevNote) => {
          return {
            ...prevNote,
            Amt: 0,
          };
        });
      } else {
        setCheck(true);

        setNoteInv((prevNote) => {
          return {
            ...prevNote,
            Amt: noteNSE.data.priceInfo.lastPrice,
          };
        });
      }
    }
  }, [noteNSE]);

  ////////////////////////////////////////////////////////////////////////////

  /////Invest sell code ////////////////////////////////////////////////////

  const [noteIns, setNoteIns] = React.useState();
  const [noteInsx, setNoteInsx] = React.useState({
    Name: "",
    Amt: 0,
    No: 0,
    User: "",
  });

  React.useEffect(() => {
    const options = {
      method: "GET",
      url: "https://trackersy-back.onrender.com/investtable",
      params: { Username: user.user.email },
    };

    axios
      .request(options)
      .then((response) => {
        //console.log(response.data)
        setNoteIns(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.user.email]);

  React.useEffect(() => {
    console.log(noteIns);
  }, [noteIns]);

  const [lim, setL] = React.useState(0);
  //const [nsesell,setNSE]=React.useState(0);

  function handleChangeIns(event) {
    const { name, value } = event.target;
    const namzz = event.target.name;
    const valzz = event.target.value;
    console.log("namzz= " + namzz + ",," + valzz);
    if (namzz === "Name") {
      const pos3 = valzz.indexOf("{");
      const no = valzz.slice(pos3 + 1);
      console.log(no);
      setL(parseInt(no, 10));
      console.log("checkkk=" + lim);
    }
    setNoteInsx((prevNote) => {
      return {
        ...prevNote,
        User: user.user.email,
        [name]: value,
      };
    });
  }

  React.useEffect(() => {
    if (noteInv.Name === "") setL(0);
  }, [noteInv.Name]);

  const submitNoteIns = async (event) => {
    axios.post("https://trackersy-back.onrender.com/investSell", noteInsx);
    console.log(noteInsx);
    window.location.reload();
  };

  ////////////////////////////////////////////////////////  side alter
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
        //console.log(response.data.orders[0].totalAmount.$numberDecimal);
        set1(response.data.orders[0].totalAmount.$numberDecimal);
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
        //console.log(response.data.orders[0].totalAmount.$numberDecimal);
        set2(response.data.orders[0].totalAmount.$numberDecimal);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.user.email]);

  const [amt3, set3] = React.useState(null);
  React.useEffect(() => {
    const options = {
      method: "GET",
      url: "https://trackersy-back.onrender.com/investOri",
      params: { Username: user.user.email },
    };

    axios
      .request(options)
      .then((response) => {
        //console.log(response.data.orders[0].totalAmount.$numberDecimal);
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
      url: "https://trackersy-back.onrender.com/investCha",
      params: { Username: user.user.email },
    };

    axios
      .request(options)
      .then((response) => {
        // console.log(response.data.orders[0].totalAmount.$numberDecimal);
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

  ///////////////////////////////////////////////////////////////////////
  const [data01, setData] = React.useState();
  React.useEffect(() => {
    setData([
      { name: "Income", value: amt1 },
      { name: "Expense", value: amt2 },
      { name: "Investment valuation", value: amt4 },
    ]);
    //console.log(data01);
    console.log(inc1);
  }, [amt1, amt2, amt3, amt4, data01]);

  ///////////////Graph code///////////////////////////////////////////////
  const [inc1, setinc1] = React.useState([]);
  const [exp1, setexp1] = React.useState([]);
  const [inv1, setinv1] = React.useState([]);
  const [inv2, setinv2] = React.useState([]);
  const asyncInc = async () => {
    for (let i = 0; i <= 5; i++) {
      const ds = new Date();
      const dd = new Date(ds.setDate(ds.getDate() - i));
      const options = {
        method: "GET",
        url: "https://trackersy-back.onrender.com/api/income3",
        params: { Username: user.user.email, Date: dd },
      };

      await axios
        .request(options)
        .then((response) => {
          console.log(
            "RESP" + response.data.orders[0].totalAmount.$numberDecimal
          );

          setinc1((previousData) => [
            ...previousData,
            response.data.orders[0].totalAmount.$numberDecimal,
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    for (let i = 0; i <= 5; i++) {
      if (inc1[i] === undefined || inc1[i] === null) {
        setinc1((previousData) => [...previousData, 0]);
      }
    }
  };
  React.useEffect(() => {
    asyncInc();
  }, []);
  //write me a async function skeleton code
  const asyncExp = async () => {
    var a = 0;
    for (let i = 0; i <= 5; i++) {
      a++;
      const ds = new Date();
      const dd = new Date(ds.setDate(ds.getDate() - i));
      const options = {
        method: "GET",
        url: "https://trackersy-back.onrender.com/api/expense3",
        params: { Username: user.user.email, Date: dd },
      };

      await axios
        .request(options)
        .then((response) => {
          console.log(
            "RESP" + response.data.orders[0].totalAmount.$numberDecimal
          );

          setexp1((previousData) => [
            ...previousData,
            response.data.orders[0].totalAmount.$numberDecimal,
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (a >= 6) {
      for (let i = 0; i <= 5; i++) {
        if (exp1[i] === undefined || exp1[i] === null) {
          setexp1((previousData) => [...previousData, 0]);
        }
      }
    }
  };

  React.useEffect(() => {
    asyncExp();
  }, []);
  const asyncInv1 = async () => {
    var a = 0;
    for (let i = 0; i <= 5; i++) {
      a++;
      const ds = new Date();
      const dd = new Date(ds.setDate(ds.getDate() - i));
      const options = {
        method: "GET",
        url: "https://trackersy-back.onrender.com/investCha3",
        params: { Username: user.user.email, Date: dd },
      };

      await axios
        .request(options)
        .then((response) => {
          console.log(
            "RESP" + response.data.orders[0].totalAmount.$numberDecimal
          );

          setinv1((previousData) => [
            ...previousData,
            response.data.orders[0].totalAmount.$numberDecimal,
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (a >= 6) {
      for (let i = 0; i <= 5; i++) {
        if (inv1[i] === undefined || inv1[i] === null) {
          setinv1((previousData) => [...previousData, 0]);
        }
      }
    }
  };
  React.useEffect(() => {
    asyncInv1();
    console.log("i fire once");
  }, []);
  const asyncInv2 = async () => {
    var a = 0;
    for (let i = 0; i <= 5; i++) {
      a++;
      const ds = new Date();
      const dd = new Date(ds.setDate(ds.getDate() - i));
      const options = {
        method: "GET",
        url: "https://trackersy-back.onrender.com/investOri3",
        params: { Username: user.user.email, Date: dd },
      };

      await axios
        .request(options)
        .then((response) => {
          console.log(
            "RESP" + response.data.orders[0].totalAmount.$numberDecimal
          );

          setinv2((previousData) => [
            ...previousData,
            response.data.orders[0].totalAmount.$numberDecimal,
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (a >= 6) {
      for (let i = 0; i <= 5; i++) {
        if (inv2[i] === undefined || inv2[i] === null) {
          setinv2((previousData) => [...previousData, 0]);
        }
      }
    }
  };
  React.useEffect(() => {
    asyncInv2();
  }, []);

  //////////////////////////

  return (
    <div className={styles.home}>
      <div className={styles.navy}>
        <Navy user={user} />
      </div>
      <div className={styles.bgl} id={styles.bgl}>
        <Box bg="mint" w="40%" borderWidth="1px" className={styles.field}>
          <Tabs>
            <TabList>
              <Tab className={styles.head}>Earning</Tab>
              <Tab className={styles.head}>Expenses</Tab>
              <Tab className={styles.head}>Investment</Tab>
              <Tab className={styles.head}>Investment Sell</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* Income */}
                <Stack spacing={5}>
                  <label>Type :</label>
                  <Input
                    className={styles.fie}
                    placeholder="Enter income type"
                    size="md"
                    name="Type"
                    value={noteInc.Type}
                    onChange={handleChangeInc}
                    required
                  />

                  <label>Description :</label>
                  <Textarea
                    className={styles.fie}
                    name="Desc"
                    placeholder="Details about the entry"
                    value={noteInc.Desc}
                    onChange={handleChangeInc}
                  />

                  <label>Amount :</label>
                  <NumberInput
                    className={styles.fie}
                    value={noteInc.Amt}
                    width="30%"
                    required
                  >
                    <NumberInputField name="Amt" onChange={handleChangeInc} />
                  </NumberInput>

                  <Button colorScheme="teal" onClick={submitNoteInc}>
                    Submit
                  </Button>
                </Stack>
              </TabPanel>

              <TabPanel>
                {" "}
                {/* Expense */}
                <Stack spacing={5}>
                  <label>Type :</label>
                  <Input
                    className={styles.fie}
                    name="Type"
                    placeholder="Enter expense type"
                    size="md"
                    value={noteExp.Type}
                    onChange={handleChangeExp}
                    required
                  />

                  <label>Description :</label>
                  <Textarea
                    className={styles.fie}
                    name="Desc"
                    placeholder="Details about the entry"
                    value={noteExp.Desc}
                    onChange={handleChangeExp}
                  />

                  <label>Amount :</label>
                  <NumberInput
                    step={1}
                    className={styles.fie}
                    width="30%"
                    value={noteExp.Amt}
                    required
                  >
                    <NumberInputField name="Amt" onChange={handleChangeExp} />
                  </NumberInput>

                  <Button colorScheme="teal" onClick={submitNoteExp}>
                    Submit
                  </Button>
                </Stack>
              </TabPanel>

              <TabPanel>
                {" "}
                {/* INvest */}
                <Stack spacing={5}>
                  <label>Stock Name:</label>
                  {/* <Input className={styles.fie} name="Name" placeholder='Enter stock/forex/options/Crypto name' size='md' onChange={handleChangeInv} value={noteInv.Stk} />*/}
                  <input
                    className={styles.nse}
                    list="data"
                    name="Name"
                    onChange={handleChangeInvy}
                    value={noteInv.Stk}
                    placeholder="Search"
                  />
                  <datalist id="data">
                    {nameNSE === 0 ? (
                      <></>
                    ) : (
                      nameNSE.map((op, index) => (
                        <div className="item" key={index}>
                          <option value={op} key={index}>
                            {op}
                          </option>
                        </div>
                      ))
                    )}
                  </datalist>

                  {/* <label>Type :</label>
				<Select className={styles.fie} placeholder='Select option' name="Type" onChange={handleChangeInv} value={noteInv.Type} required>
					<option value='Stock'>Stock</option>
					<option value='Options'>Options</option>
					<option value='Forex'>Forex</option>
					<option value='Crypto'>Crypto</option>
				</Select> */}

                  <label>Description :</label>
                  <Textarea
                    className={styles.fie}
                    name="Desc"
                    placeholder="Details about the entry"
                    value={noteInv.Desc}
                    onChange={handleChangeInv}
                  />

                  <label>Amount per share :</label>
                  <NumberInput
                    className={styles.fie}
                    value={noteInv.Amt}
                    width="30%"
                    required
                  >
                    <NumberInputField name="Amt" onChange={handleChangeInv} />
                  </NumberInput>

                  <label>No. of shares :</label>
                  <NumberInput
                    className={styles.fie}
                    value={noteInv.No}
                    width="30%"
                    required
                  >
                    <NumberInputField name="No" onChange={handleChangeInv} />
                  </NumberInput>
                  <h2 className={styles.pri}>
                    Total Amount: INR {noteInv.No * noteInv.Amt}
                  </h2>

                  <Button colorScheme="teal" onClick={submitNoteInv}>
                    Submit
                  </Button>
                </Stack>
              </TabPanel>

              {/* invest sell code */}
              <TabPanel>
                <Stack spacing={5}>
                  <label>Stock name: </label>
                  <Select
                    className={styles.fie}
                    name="Name"
                    onChange={handleChangeIns}
                    value={noteInsx.name}
                    placeholder="Select option"
                  >
                    {noteIns ? (
                      noteIns.map((noteItem, index) => {
                        return (
                          <option
                            key={noteItem._id}
                            value={
                              noteItem._id +
                              "," +
                              noteItem.Name +
                              "." +
                              noteItem.Amt["$numberDecimal"].toLocaleString() +
                              "{" +
                              noteItem.No["$numberDecimal"].toLocaleString()
                            }
                          >
                            {noteItem.Name}
                          </option>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </Select>

                  <label>No: </label>
                  <NumberInput
                    className={styles.fie}
                    value={noteInsx.No}
                    width="30%"
                    required
                  >
                    <NumberInputField name="No" onChange={handleChangeIns} />
                  </NumberInput>

                  <label>Price: </label>
                  <NumberInput
                    className={styles.fie}
                    value={noteInsx.Amt}
                    width="30%"
                    required
                  >
                    <NumberInputField name="Amt" onChange={handleChangeIns} />
                  </NumberInput>

                  <Button colorScheme="teal" onClick={submitNoteIns}>
                    Submit
                  </Button>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        {!check ? (
          <ReactCardFlip isFlipped={flip} flipDirection="vertical">
            <Box
              borderWidth="1px"
              className={styles.field}
              onMouseEnter={() => setFlip(!flip)}
            >
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td size="lg" className={styles.head}>
                        Income Amount:
                      </Td>
                      <Td size="lg">INR {amt1 === null ? 0 : amt1}</Td>
                    </Tr>
                    <Tr>
                      <Td size="lg" className={styles.head}>
                        Expense Amount:
                      </Td>
                      <Td size="lg">INR {amt2 === null ? 0 : amt2}</Td>
                    </Tr>
                    <Tr>
                      <Td size="lg" className={styles.head}>
                        Current Wallet Amount:
                      </Td>
                      <Td size="lg">
                        INR{" "}
                        {amt1 === null
                          ? amt2 === null
                            ? 0
                            : -amt2
                          : amt2 == null
                          ? amt1
                          : amt1 - amt2}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td size="lg" className={styles.head}>
                        Investment Amount:
                      </Td>
                      <Td size="lg">
                        <div className={styles.flex}>
                          INR{" "}
                          {Math.round((amt4 === null ? 0 : amt4) * 100) / 100} (
                          <div
                            style={
                              amt5 > 0 ? { color: "green" } : { color: "red" }
                            }
                          >
                            {Math.round((amt5 === null ? 0 : amt5) * 100) / 100}
                            %
                          </div>
                          )
                        </div>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            <Box
              borderWidth="1px"
              className={styles.field}
              onMouseLeave={() => setFlip(!flip)}
            >
              <Linechart inc={inc1} exp={exp1} inv1={inv1} inv2={inv2} />
            </Box>
          </ReactCardFlip>
        ) : (
          <Box className={styles.field3}>
            {noteNSE ? (
              noteNSE.request.response ===
                '{"data":[],"msg":"no data found"}' ||
              noteNSE.request.response === '"Missing symbol."' ||
              noteNSE.data.message ===
                "TypeError: Cannot read property 'length' of undefined" ? (
                <></>
              ) : (
                <Stat>
                  <StatLabel className={styles.cn}>
                    <div className={styles.cn} onClick={submitRed}>
                      {noteNSE.data.info.companyName}
                    </div>
                    <div className={styles.pric}>
                      Last Price: Rs. {noteNSE.data.priceInfo.lastPrice} (
                      <div
                        style={
                          noteNSE.data.priceInfo.change > 0
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        {Math.round(noteNSE.data.priceInfo.change * 100) / 100}
                      </div>
                      )
                    </div>
                  </StatLabel>
                  <div className={styles.pric2}> Today </div>
                  <TableContainer className={styles.tabl}>
                    <Table variant="simple">
                      <Thead>
                        <Tr
                          style={{ backgroundColor: "#171710" }}
                          className={styles.head2}
                        >
                          <Th size="lg" className={styles.head2}>
                            <div className={styles.head2}>Open</div>
                          </Th>
                          <Th size="lg" className={styles.head2}>
                            <div className={styles.head2}>High</div>
                          </Th>
                          <Th size="lg" className={styles.head2}>
                            <div className={styles.head2}>Low</div>
                          </Th>
                          <Th size="lg" className={styles.head2}>
                            <div className={styles.head2}>Close</div>
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td size="lg">
                            {" "}
                            {noteNSE.data.priceInfo.intraDayHighLow.max}
                          </Td>
                          <Td size="lg">{noteNSE.data.priceInfo.open}</Td>
                          <Td size="lg">
                            {noteNSE.data.priceInfo.intraDayHighLow.min}
                          </Td>
                          <Td size="lg">{noteNSE.data.priceInfo.close}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <div className={styles.pric2}> Weekly </div>
                  <TableContainer className={styles.tabl}>
                    <Table variant="simple">
                      <Thead>
                        <Tr
                          style={{ backgroundColor: "#171710" }}
                          className={styles.head2}
                        >
                          <Th className={styles.head2}>
                            <div className={styles.head2}>High</div>
                          </Th>
                          <Th className={styles.head2}>
                            <div className={styles.head2}>Low</div>
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>{noteNSE.data.priceInfo.weekHighLow.max}</Td>
                          <Td>{noteNSE.data.priceInfo.weekHighLow.min}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Stat>
              )
            ) : (
              <></>
            )}
          </Box>
        )}
      </div>
    </div>
  );
}
export default Home;

