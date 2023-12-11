import React, { useState, useEffect, useCallback } from "react";
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

import { Await, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Form from "react-bootstrap/Form";
import { CookiesProvider, useCookies } from "react-cookie";
function Appointment() {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState();
  const [arm,setArm]= useState(null);
  const [data, setData] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const url = "http://localhost:8080/appointment/date";


  const url2= "http://localhost:8080/person/"+cookies.user.idUser;

  const fetchInfo =   async  () => {
    return axios.get(url2).then((response) => setCookie(response.data));
  };

  

  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (!value) return;
    if (!startDate) return;
    let link =
      url +
      "/" +
      startDate.toISOString().substring(0, 4) +
      "/" +
      startDate.toISOString().substring(5, 7) +
      "/" +
      startDate.toISOString().substring(8, 10) +
      "/" +
      value.substring(0, 2) +
      "/" +
      value.substring(3, 5);
    getAvailability(link);
    setDisable(true);
  }, [value, startDate, arm]);

  function getAvailability(link) {
    axios
      .get(link)
      .then((response) => {
        setData(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const check = useCallback(async () => {
    if (
      (data.length == 0 &&
        +value.substring(0, 2) >= 9 &&
        +value.substring(0, 2) <= 16 &&
        +value.substring(3, 5) === 0) ||
      +value.substring(3, 5) === 30
    ) {
      console.log(arm);
      setDisable(false);
    } else setDisable(true);
  }, [data, startDate, value]);

  function setAppointment() {
    axios
    .post("http://localhost:8080/appointment/add/" + cookies.user.idUser, {
      dateOfAppointment:startDate.toISOString().substring(0, 4)+"-"+startDate.toISOString().substring(5, 7) + "-"+ startDate.toISOString().substring(8, 10) +"T" + value.substring(0, 2) + ":" +value.substring(3, 5),
      arm: arm,
      person: null,
      reports: null
    })
    .then(function (response) {
      console.log(response);
      fetchInfo().then(()=>(navigate("/home")));
      
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  return (
    <MDBContainer fluid className="bg-wheat ">
      <MDBRow className="d-flex justify-content-center align-items-center h-100 ">
        <MDBCol col="12">
          <MDBCard
            className="bg-red-600 outline border-black text-black my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 underline text-uppercase">
                Reserve a spot
              </h2>
              <p className="text-white mt-5 ">
                The schedule is from 9 AM to 16:30 PM everyday and each
                appointment can be set at either :00 or :30
              </p>

              <DatePicker
                className="bg-orange-300 outline rounded-sm w-80 mt-5"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <TimePicker
                className=" bg-orange-300 outline rounded-sm w-80 m-5"
                onChange={onChange}
                value={value}
              />
              <div>
                <Form>
                  <Form.Check
                    onClick={function() {setArm(null)}}
                    inline
                    label="any"
                    name="group1"
                    type="radio"
                    id="no preference"
                  />
                  <Form.Check
                  onClick={function() {setArm("left")}}
                    inline
                    label="left arm"
                    name="group1"
                    type="radio"
                    id="left"
                  />
                  <Form.Check
                    onClick={function() {setArm("right")}}
                    inline
                    name="group1"
                    label="right arm"
                    type="radio"
                    id="right"
                  />
                </Form>
              </div>
              <MDBBtn
                onClick={check}
                className="bg-gray-500 w-60 mx-2 mt-4 px-5 text-white "
                color="dark"
                size="lg"
              >
                Check if available
              </MDBBtn>
              <MDBBtn
                onClick={setAppointment}
                disabled={disable}
                className="bg-gray-500 w-60 mx-2 mt-2 px-5 text-white "
                color="dark"
                size="lg"
              >
                Set Appointment
              </MDBBtn>
              <MDBBtn
                className="bg-gray-500 w-60 mx-2 mt-2 px-5 text-white "
                color="dark"
                size="lg"
                onClick={function () {
                  navigate("/home");
                }}
              >
                Go back
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Appointment;
