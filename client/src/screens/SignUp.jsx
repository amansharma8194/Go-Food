import React, { useState } from 'react';
import {Link} from 'react-router-dom';


const SignUp = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        location: "",
        email: "",
        password: ""
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/createUser',
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                location: credentials.location,
                email: credentials.email,
                password: credentials.password
            })
        }
        );
        const result = await response.json();
        if(!result.success){
            alert('Enter Valid Credentials');
        }
        else{
            setCredentials({
                name: "",
                location: "",
                email: "",
                password: ""
            });
            alert('Account Created Successfully. You can Login Now.');
        }
        
    }
    const changeCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <>
        <div className='container'>
            <form className='col-4' onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={changeCredentials} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Address</label>
                    <input type="text" className="form-control" id="location" name = "location" value={credentials.location} onChange={changeCredentials} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name = "email" value={credentials.email}  onChange={changeCredentials}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="text" className="form-control" id="password" name="password" value={credentials.password}  onChange={changeCredentials}/>
                </div>
                <button type="submit" className="btn btn-dark">Submit</button>
                <span>Already a User? <Link to="/login">Login</Link></span>
            </form>
        </div>
        </>
    )
}

export default SignUp