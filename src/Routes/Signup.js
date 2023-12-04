import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";

function Signup() {

  let navigate= useNavigate();
  const url = "http://localhost:8080/person";
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [CNP, setCNP] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [birthDate, setBirthDate] = useState("");

  const fetchInfo = () => {
    return axios.get(url).then((response) => setData(response.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  function isNumeric(str) {
    const pattern = /^-?\d+(\.\d+)?$/;
    return pattern.test(str);
  }
  function checkAvailability()
  {
    let ok=1;
      data.map( (e) =>{ 
       if(e.CNP == CNP || e.userName == userName) 
       ok=0 })
      if(ok===1)
      return 1;
      return 0;
  }


  function checkCNP() {
    if (isNumeric(CNP) === false || CNP.length !== 13) return 0;
    else {
      let date = "";
      if (CNP.charAt[0] === "1" || CNP.charAt[0] === "2") {
        date = date + "19" + CNP[1] + CNP[2];
      } else {
        date = date + "20" + CNP[1] + CNP[2];
      }
      date = date + "-" + CNP[3] + CNP[4] + "-" + CNP[5] + CNP[6];
      setBirthDate(date);
    }
    return 1;
  }
  function check() {
    if (
      userName !== "" &&
      password !== "" &&
      checkCNP() &&
      firstName !== "" &&
      lastName !== "" &&
      address !== ""
    ) {
      if (checkAvailability()) {
        axios
          .post("http://localhost:8080/person/add", {
            privLevel: 1,
            cnp: CNP,
            userName: userName,
            birthDate: birthDate,
            firstName: firstName,
            lastName: lastName,
            address: address,
            password: password,
            appointments: [],
            reports: []
          })
          .then(function (response) {
            console.log(response);
            navigate("/");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else{
        setUserName("");
        setCNP("");
        document.getElementById("userNameField").value="";
        document.getElementById("CNPField").value="";
        return;
      }
    } else console.log("bad input");
  }

  return (
    <MDBContainer fluid className='bg-wheat '>
      <MDBRow className="d-flex justify-content-center align-items-center h-100 ">
        <MDBCol col="12">
          <MDBCard
            className="bg-red-600 border-black text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Sign-up</h2>
              <p className="text-white-50 mb-5"></p>

              <MDBInput
                onChange={(ev) => setUserName(ev.target.value)}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white "
                label="User Name"
                id="userNameField"
                type="email"
                size="lg"
              />
              <MDBInput
                onChange={(ev) => setPassword(ev.target.value)}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />
              <MDBInput
                onChange={(ev) => setCNP(ev.target.value)}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="CNP"
                id="CNPField"
                size="lg"
              />
              <MDBInput
                onChange={(ev) => setfirstName(ev.target.value)}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="First name"
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                onChange={(ev) => setlastName(ev.target.value)}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Last name"
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                onChange={(ev) => setAddress(ev.target.value)}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Address"
                id="formControlLg"
                type="email"
                size="lg"
              />

              <MDBBtn
                onClick={check}
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
              >
                Sign up
              </MDBBtn>
              <p className="small mt-3 pb-lg-2"><a class="text-bold text-white-50" href="/">Go back</a></p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
