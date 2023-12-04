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
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';


function Appointment(){
    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState();

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const url="http://localhost:8080/appointment/date"

    useEffect(() => {
      if(!value) return
      if(!startDate) return
      let link = url+'/'+startDate.toISOString().substring(0,4)+'/'+startDate.toISOString().substring(5,7)+'/'+startDate.toISOString().substring(8,10)+'/'+value.substring(0,2)+'/'+ value.substring(3,5)
      getAvailability(link);
      console.log("1");
    

    }, [value,startDate])

    function  getAvailability( link )
    {
      
      axios.get(link).then( (response) => {  setData(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      })

    }
    const check = useCallback( async () => {

      console.log(data,'smth')

    },[data,startDate,value] )  

    /*
    async function check()
    {
      ///startDate.setHours(value.);
      
    
    
    }*/
  
  
  
  
  
  
  
  
  
  
    return (
    <MDBContainer fluid className='bg-wheat '>
      <MDBRow className="d-flex justify-content-center align-items-center h-100 ">
        <MDBCol col="12">
          <MDBCard
            className="bg-red-600 outline border-black text-black my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Reserve a spot</h2>
              <p className="text-white-50 mb-5"></p>

              <DatePicker className="bg-orange-300 outline rounded-sm w-80 m-5" selected={startDate} onChange={(date) => setStartDate(date)} />
              <TimePicker className=" bg-orange-300 outline rounded-sm w-80 m-5" onChange={onChange} value={value} />
              <MDBBtn
                onClick={check}
                
                className='bg-gray-500 w-60 mx-2 mt-2 px-5 text-white '  color='dark' size='lg'
              >
                Check if available
              </MDBBtn>
              <MDBBtn className='bg-gray-500 w-60 mx-2 mt-2 px-5 text-white '  color='dark' size='lg' onClick={function(){ navigate("/home")}}>Go back</MDBBtn>
              </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Appointment;
