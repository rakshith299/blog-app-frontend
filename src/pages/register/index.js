import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import "./style.css";
import Header from '../../components/Header';

const Register = () => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        let userObj = {
            name,
            username,
            email,
            password
        }

        console.log(process.env.REACT_APP_BACKEND_URL);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, userObj)
        .then((res) =>{
            if(res.data.status == 201){
                window.location.href = "/login"
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
            
            <h1 className='heading'>Register</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <div className='btn-cont'>
                <Button variant="primary" type='submit'>Register</Button>
            </div>
            </Form>
        </div>
    </div>
  );
}

export default Register;