import React, { useEffect } from 'react';
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

}
from 'mdb-react-ui-kit';
import { CookiesProvider, useCookies } from "react-cookie";

function Home() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const url= "http://localhost:8080/person/"+cookies.user.idUser;

  const fetchInfo = () => {
    return axios.get(url).then((response) => setCookie(response.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);



  return (
    <div>
    {cookies.user.privLevel==1 ? (
    
    <MDBContainer fluid className='bg-wheat'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-red-600 outline outline-black text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '1000px'}}>
            <MDBCardBody className='p-5 d-flex flex-column  mx-auto w-100'>

              <h2 className=" fw-bold text-2xl text-center">Hi {cookies.user.firstName}!</h2>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className='bg-red-600 outline outline-black text-white my-5 mx-auto' style={{padding:'20px', borderRadius: '1rem', maxWidth: '1000px'}}>
            <MDBBtn onClick={function(){navigate('/results')}  }   className='bg-gray-500 outline outline-gray-800 mx-2 px-5 text-white ' style={{  height: 'auto', maxHeight: '400px' }} color='dark' size='lg'>
                Analize
            </MDBBtn>
            <MDBBtn onClick={function(){navigate('/appointment')}  }  className='bg-gray-500 outline outline-gray-800  mx-2 mt-2 px-5 text-white '  color='dark' size='lg'>
                Progamari
            </MDBBtn>
            <MDBBtn onClick={function(){navigate('/')}  }  className='bg-gray-500 outline outline-gray-800  mx-2 mt-2 px-5 text-white '  color='dark' size='lg'>
                Sign out
            </MDBBtn>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    )
    :
    (
      <MDBContainer fluid className='bg-wheat'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

        <MDBCard className='bg-red-600 outline outline-black text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '1000px'}}>
            <MDBCardBody className='p-5 d-flex flex-column  mx-auto w-100'>

              <h2 className=" fw-bold text-2xl text-center">Hi {cookies.user.firstName}!</h2>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className='bg-red-600 outline outline-black text-white my-5 mx-auto' style={{padding:'20px', borderRadius: '1rem', maxWidth: '1000px'}}>
            <MDBBtn onClick={function(){navigate('/addReportPage')}  }   className='bg-gray-500 outline outline-gray-800 mx-2 px-5 text-white ' style={{  height: 'auto', maxHeight: '400px' }} color='dark' size='lg'>
                Adauga Analize
            </MDBBtn>
            <MDBBtn onClick={function(){navigate('/currentAppointment')}  }  className='bg-gray-500 outline outline-gray-800  mx-2 mt-2 px-5 text-white '  color='dark' size='lg'>
               Progamarile de azi 
            </MDBBtn>
            <MDBBtn onClick={function(){navigate('/')}  }  className='bg-gray-500 outline outline-gray-800  mx-2 mt-2 px-5 text-white '  color='dark' size='lg'>
                Sign out
            </MDBBtn>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    )
    } 
    </div>
  );
}

export default Home;