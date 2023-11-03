import react, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import "./style.css";

const CreateBlog = () => {

    const [title, setTitle] = useState("");
    const [textBody, setTextBody] = useState("");

    useEffect(() => {
        let token = localStorage.getItem("jwtToken");

        if(!token){
            window.location.href = "/login";
        }


    }, []);

    function handleSubmit(e){
        e.preventDefault();

        let token = localStorage.getItem("jwtToken");

        let blogObj = {
            title,
            textBody
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/blog/create-blog`, blogObj, {
            headers:{
                "x-blog": token
            }
        })
        .then((res) => {
            if(res.data.status === 201){

                window.location.href = "/my-blogs";
                

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
            <div className='create-blog-card'>  
                <h1>Create Blog</h1>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Enter Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="textBody">
                    <Form.Label>Enter TextBody</Form.Label>
                    <Form.Control as= "textarea" rows = {5} placeholder="Enter TextBody" onChange={(e) => setTextBody(e.target.value)}/>
                </Form.Group>

                <div className='btn-cont'>
                    <Button variant="primary" type='submit'>Post Blog</Button>
                </div>
                </Form>
            </div>
        </div>
  )
}


export default CreateBlog;