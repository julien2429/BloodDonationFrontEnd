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

}
from 'mdb-react-ui-kit';
import { CookiesProvider, useCookies } from "react-cookie";
import { FormCheck } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

function Home() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [data, setData] = useState([]);
  const url= "http://localhost:8080/appointment/notfilled";

  const fetchInfo = () => {
    return axios.get(url).then((response) => setData(response.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [idAppointment, setIdAppointment] = useState('');
  const [syphilisTotalAB, setSyphilisTotalAB] = useState(false);
  const [antiHCV, setAntiHCV] = useState(false);
  const [antiHiv1over2, setAntiHiv1over2] = useState(false);
  const [antiHtlv1over2, setAntiHtlv1over2] = useState(false);
  const [bloodType, setBloodType] = useState('-');
  const [rh, setRH] = useState('-');
  const [alt, setAlt] = useState('');
  
  
  async function check() {
    if (
      idAppointment !== '' &&
      bloodType != '-' &&
      rh !== '-' &&
      alt !== ''
    ) {
      
        console.log({
          idAppointment: idAppointment,
          syphilisTotalAB: syphilisTotalAB,
          antiHCV:antiHCV,
          antiHiv1over2: antiHiv1over2,
          antiHtlv1over2:antiHtlv1over2,
          bloodType:bloodType,
          rh: rh,
          alt: parseInt(alt)
        })
        
        axios
          .post("http://localhost:8080/report/add/"+idAppointment, {
            syphilisTotalAB: syphilisTotalAB,
            antiHCV:antiHCV,
            antiHiv1over2: antiHiv1over2,
            antiHtlv1over2:antiHtlv1over2,
            bloodType:bloodType,
            rh: rh,
            alt: parseInt(alt)
          })
          .then(function (response) {
            console.log(response);
            navigate("/home");
          })
          .catch(function (error) {
            console.log(error);
          });

      }
      
  }

  return (
  
    <MDBContainer fluid className='bg-wheat'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          
          <MDBCard className='bg-red-600 outline outline-black text-white my-5 mx-auto' style={{padding:'20px', borderRadius: '1rem', maxWidth: '1000px'}}>
           <div className=" mb-3">
           <select onInput={(e) => setIdAppointment(e.target.value)} className="m-4 outline text-black w-20" id="mySelect">
            <option>No ID</option>
            {data.map((element,index) => {
                return(
                    <option>{element.idAppointment}</option>
                )
                })}
            </select>
            <label className="outline outline-black p-1 mt-3 mx-3">
                <input onChange={(e) => setSyphilisTotalAB(!syphilisTotalAB) } className="" type="checkbox" />
                syphilisTotalAB      
            </label>
            <label className="outline outline-black p-1 mt-3 mx-3">
                <input onChange={(e) => setAntiHCV( !antiHCV ) } className="mx-2" type="checkbox" />
                    antiHCV      
            </label>
            <label className="outline outline-black p-1 mt-3 mx-3">
                <input onChange={(e) => setAntiHiv1over2(!antiHiv1over2) } className="mx-2" type="checkbox" />
                    antiHiv     1/2       
            </label>
            <label className="outline outline-black p-1 mt-3 mx-3">
                <input onChange={(e) => setAntiHtlv1over2(!antiHtlv1over2) } className="mx-2" type="checkbox" />
                antiHtlv 1/2       
            </label>
            <label className="outline  outline-black p-1 mt-3 mx-3">
            <select onChange={(e) => setBloodType(e.target.value)} className="mx-2 outline text-black w-20" id="mySelect">
                     <option>-</option>
                    <option>0</option>
                    <option>A</option>
                    <option>B</option>
                    <option>AB</option>
                </select>
                Blood Type    
            </label>

            <label className="outline  outline-black p-1 mt-3 mx-3">
            <select onChange={(e) => setRH(e.target.value)} className="mx-2 outline text-black w-20" id="mySelect">
                    <option>-</option>
                    <option>+</option>
                </select>
                RH   
            </label>

            <label className="outline  outline-black p-1 mt-3 mx-3">
            <input onChange={(e) => setAlt(e.target.value)} className="w-8 outline text-black outline-black mx-2" value={alt} />
            Alt      
            </label>
            
            </div> 
            
            <MDBBtn onClick={check}   className='bg-gray-500 outline outline-gray-800 mx-2 px-5 text-white ' style={{  height: 'auto', maxHeight: '400px' }} color='dark' size='lg'>
                Adauga
            </MDBBtn>
            <MDBBtn onClick={function(){navigate('/home')}  }  className='bg-gray-500 outline outline-gray-800  mx-2 mt-2 px-5 text-white '  color='dark' size='lg'>
                Inapoi
            </MDBBtn>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    

  );
}

export default Home;