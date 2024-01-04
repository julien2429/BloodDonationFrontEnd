
import axios from "axios";
import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import MDBTable from "mdb-react-ui-kit";
import {
  MDBBtn,
  
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,

}
from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';
import { CookiesProvider, useCookies } from "react-cookie";

function Results() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [data, setData] = useState([]);
  const result = cookies.user.reports;
  const url = "http://localhost:8080/appointment/date/today/";
  const fetchInfo = () => {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // Months are zero-based, so we add 1
    var day = today.getDate();
    return axios.get(url+year+"/"+month+"/"+day).then((response) => setData(response.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  function boolToString( x)
  {
     if(x)
        return "true"
    else
        return "false"
  }
  
  return (
    <MDBContainer fluid className='bg-wheat'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100' >
        <MDBCol col='12' className="mt-10"  style={{borderRadius: '1rem', maxWidth: '1000px'}}>
        <table className='outline outline-slate-600 table table-hover'>
      <thead>
        <tr>
          <th>id Appointment</th>
          <th>Date</th>
          <th>Time</th>
          <th>Arm</th>
        </tr>
        
        {data.map((element,index) => {
            let fakeElement = element.dateOfAppointment.toLocaleString();
            console.log(fakeElement.substring(11,16))
            let hour = fakeElement.substring(11,13);
            let fakeHour= parseInt(hour)+2;
            return(
                <tr>
                    <th>{element.idAppointment}</th>
                    <th>{element.dateOfAppointment.substring(0,10)}</th> 
                    <th>{ fakeHour + element.dateOfAppointment.substring(13,16)}</th>                             
                    <th>{element.arm}</th>
                    
                </tr>
            )
     
      })}

        
      
      </thead>
      
      
    </table>
        
      
         
        
        <MDBBtn onClick={function(){navigate('/home')}} outline className=' mx-2 px-5 bg-red-600 text-white '  color='dark' size='lg'>
                Back
        </MDBBtn>
        </MDBCol>
      </MDBRow>
      
    </MDBContainer>
  );
}

export default Results;