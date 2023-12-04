import React, { useState, useEffect } from "react";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { CookiesProvider, useCookies } from "react-cookie";

function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  
  const url = "http://localhost:8080/person";



  
  
  const navigate = useNavigate();

 

  function check()
  {
    
    axios.get(url+'/'+userName+'/'+password).then((response) => setData(response.data))
    .catch(function (error) {
      
    });
    
    if(data.length !== 0)
    {
      console.log(data);
      setCookie("user", data,{ path: '/' });
      navigate("/home");
    }
    
    
  }
  
  return (
    <MDBContainer fluid className='bg-wheat'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-red-600 text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput onChange={(ev) => setUserName(ev.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='User name' id='formControlLg' type='email' size="lg"/>
              <MDBInput onChange={(ev) => setPassword(ev.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"/>

              <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
              <MDBBtn onClick={check} outline className='mx-2 px-5' color='white' size='lg'>
                Login
              </MDBBtn>

          
              <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!"></a></p>
              <div>
                <p className="mb-0">Don't have an account? <a href="/signup" class="text-white-50 fw-bold">Sign Up</a></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;