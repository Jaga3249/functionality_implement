import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";

const App = () => {
  const [datas, setDatas] = useState([]);
  const [value,setValue]=useState();
  const loadUserData = async () => {
    const { data } = await axios.get("http://localhost:5000/users");
    setDatas(data);
    
  };
  const handleSearch=async(e)=>{
    e.preventDefault();
    const {data}=await axios.get(`http://localhost:5000/users?q=${value}`);
      setDatas(data);
      setValue("")
  }
  const handleReset=()=>{
    loadUserData();
  }
  useEffect(() => {
    loadUserData();
  }, []);
  return( 
  <MDBContainer >
    <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}}
    className="d-flex input-group w-auto" onSubmit={handleSearch}>
      <input type="text" className="form-control" placeholder="Search Name ...."
      value={value} onChange={(e)=>setValue(e.target.value)} />
      <MDBBtn type="submit" color="dark">Search</MDBBtn>
      <MDBBtn onClick={()=>handleReset()}>Reset</MDBBtn>
    </form>
    <div style={{marginTop:"100px"}}>
      <h2 className="text-center">Search Filter,Sort and pagination using fake json rest api</h2>
      <MDBRow >
        <MDBCol size="12" >
          <MDBTable >
            < MDBTableHead style={{backgroundColor:"green",color:"black"}} >
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
            </tr>
            </MDBTableHead>
            {datas.length===0?(
              <MDBTableBody className="align-center mb-0">
                <tr>
                  <td colSpan={8} className="text-center mb-0">No data</td>
                </tr>
              </MDBTableBody>
            ):(
              datas.map((item,i)=>(
                <MDBTableBody>
                  <tr key={i}>
                    <th>{i+1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.status}</td>
                  </tr>
                </MDBTableBody>
              ))
            )}
          
          </MDBTable>
        </MDBCol>
      </MDBRow>
    </div>
  </MDBContainer>);
};

export default App;
