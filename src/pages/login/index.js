import react, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import "./style.css";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        let userObj = {
            username,
            password
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, userObj)
        .then((res) => {
            if(res.data.status === 200){

                let token = res.data.data.token;

                localStorage.setItem("jwtToken", token);

                window.location.href = "/home-page-blogs";
                

            }else{
                alert(res.data.message);
            }
        })
        .catch((err) => {
            alert(err);
        })


    }
    return (
        <div className='register-whole-card'>
            <div className='register-card'>  
                <h1>Login</h1>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Enter Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <div className='btn-cont'>
                    <Button variant="primary" type='submit'>Login</Button>
                </div>
                </Form>
            </div>
        </div>
  )
}


export default Login;