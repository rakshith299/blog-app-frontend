import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import "./style.css";
import { useState } from 'react';

const BlogCard = ({title, textBody, id, creationDateAndTime, homePage, username}) => {

  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const [newTextBody, setNewTextBody] = useState();

    let token = localStorage.getItem("jwtToken");

    function handleDelete(id){
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/blog/delete-blog/${id}`, {
            headers:{
                "x-blog" : token
            }
        })
        .then(res => {

            if(res.data.status === 200){
                alert(res.data.message);
                window.location.reload();
            }else{
                alert(res.data.message);
            }
        }) 
        .catch(err => {
            alert(err);
        })
    }

    function handleEditBlog(id, e){

      e.preventDefault();

      let editBlogObj = {
        blogId: id,
        title: newTitle,
        textBody: newTextBody
      }


      console.log("edit-blog-obj",editBlogObj)

      axios.put(`${process.env.REACT_APP_BACKEND_URL}/blog/edit-blog`, editBlogObj, {
        headers:{
          "x-blog" : token
        }
      })
      .then(res => {
        if(res.data.status === 200){
          alert(res.data.message);
          window.location.reload();
        }else{
          alert(res.data.message);
        }
      })
      .catch(err => {
        alert(err);
      })
    }

  return (
    <Card className='blog-card' key = {id}>
      <Card.Body>
        <div className='title-date-cont'>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{creationDateAndTime}</Card.Text>
        </div>
        
        <Card.Text>
          {textBody}
        </Card.Text>
        {
          homePage ? 
          
          <div>
            <p>Created by - {username}</p>
          </div> : 

          <div>

              <Button variant="primary" className='blog-card-edit' onClick={() => setIsEdit(!isEdit)} >Edit</Button>
              <Button variant="danger" className='blog-card-edit' onClick={() => handleDelete(id)}>Delete</Button>
          </div>
        }
        
      </Card.Body>

      {
        isEdit? 

        <div className='edit-form-card'>
          <h2 className='edit-blog-heading'>Edit Blog</h2>
          <Form onSubmit={(e) => handleEditBlog(id, e)}>
                <Form.Group className="mb-3" controlId="newTitle">
                    <Form.Label>Enter New Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter New Title" onChange={(e) => setNewTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newTextBody">
                    <Form.Label>Enter New TextBody</Form.Label>
                    <Form.Control as= "textarea" rows = {5} placeholder="Enter New TextBody" onChange={(e) => setNewTextBody(e.target.value)}/>
                </Form.Group>

                <div className='btn-cont'>
                    <Button variant="primary" type='submit'>Edit Blog</Button>
                </div>
          </Form>
        </div> : ""
      }
    </Card>
  );
}

export default BlogCard;