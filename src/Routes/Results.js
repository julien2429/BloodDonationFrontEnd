import React from 'react';
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

  const result = cookies.user.reports;

  const products = [
    { id: 1, name: "Item 1", price: 100 },
    { id: 2, name: "Item 2", price: 102 }
  ];

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
          <th>Date</th>
          <th>Anti HCV</th>
          <th>Anti HIV 1/2</th>
          <th>Anti HTLV 1/2</th>
          <th>Syphilis Total Ab</th>
          <th>Blood type</th>
          <th>RH</th>
          <th>Alt</th>
        </tr>
        
        {result.map((element,index) => {
            return(
                <tr>
                    <th>{element.appointment.dateOfAppointment.substring(0,10)}</th>                    
                    <th>{boolToString(element.syphlisTotalAB)}</th>
                    <th>{boolToString(element.antiHCV)}</th>
                    <th>{boolToString(element.antiHiv1over2)}</th>
                    <th>{boolToString(element.antiHtlv1over2)}</th>
                    <th>{element.bloodType}</th>
                    <th>{element.rh}</th>
                    <th>{element.alt}</th>
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