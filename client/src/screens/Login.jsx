import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'



const Login = () => {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const navigate = useNavigate();


  const changeCredentials = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const verifyCredentials = await fetch('http://localhost:3000/api/loginUser',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": credentials.email,
        "password": credentials.password
      })
    });
    const verifyCredentialsResp = await verifyCredentials.json();
    if(verifyCredentialsResp.success) {
      localStorage.setItem("authToken", verifyCredentialsResp.authToken);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/");
    }
    else {
      alert(verifyCredentialsResp.msg);
    }
  }
  return (
    <>
      <div className='container'>
        <form className='col-4' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={changeCredentials} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="text" className="form-control" id="password" name="password" value={credentials.password} onChange={changeCredentials} />
          </div>
          <button type="submit" className="btn btn-dark">Submit</button>
          <span>Don't have a Account? <Link to="/signup">Sign Up</Link></span>
        </form>
      </div>
    </>
  )
}

export default Login;