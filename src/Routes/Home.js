import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
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
import { CookiesProvider, useCookies } from "react-cookie";

function Home() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  
  
  return (
    <MDBContainer fluid className='bg-wheat'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-red-600  text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '1000px'}}>
            <MDBCardBody className='p-5 d-flex flex-column  mx-auto w-100'>

              <h2 className=" text-left fw-bold mb-2 text-uppercase">HI {cookies.user.firstName}</h2>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className='bg-red-600  text-white my-5 mx-auto' style={{padding:'20px', borderRadius: '1rem', maxWidth: '1000px'}}>
            <MDBBtn onClick={function(){navigate('/results')}  }   className='bg-gray-500 mx-2 px-5 text-white ' style={{  height: 'auto', maxHeight: '400px' }} color='dark' size='lg'>
                Analize
            </MDBBtn>
            <MDBBtn onClick={function(){navigate('/appointment')}  }  className='bg-gray-500 mx-2 mt-2 px-5 text-white '  color='dark' size='lg'>
                Progamari
            </MDBBtn>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Home;