import SignUp from '../Components/SignUp/SignUp';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {    
  const [isSuccess, setSuccess] = useState(false);
  const navigate = useNavigate();
  const getSuccess = (isSuccess) =>{
    if (isSuccess==true) 
      navigate('/main');
  }

  return (
    <>
      <SignUp isSuccess={isSuccess} getSuccess={getSuccess}/>
    </>
  );
}

export default Signup;