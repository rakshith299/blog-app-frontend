import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const UsersCard = ({username, name, email, follow, id}) => {

    const [flag, setFlag] = useState(false);
    let token = localStorage.getItem("jwtToken");

    function handleUnfollow(id){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/connection/unfollow`, {
            followingUserId : id
        }, {
            headers:{
                "x-blog": token
            }
        })
        .then((res) => {
            if(res.data.status===200){
                
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                alert(res.data.message);
            }else{
                alert(res.data.message);
            }
        })
        .catch((err) => {
            alert(err);
        })
    }

    function handleFollow(id){

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/connection/follow`, {
            followingUserId : id
        }, {
            headers:{
                "x-blog": token
            }
        })
        .then((res) => {
            if(res.data.status===200){
                
                
                window.location.reload();
                alert(res.data.message);
               
                          
            }else{
                alert(res.data.message);
            }
        })
        .catch((err) => {
            alert(err);
        })

    }


  return (
    <Card style={{ width: '18rem', margin: "20px" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{username}</Card.Text>
        <Card.Text>{email}</Card.Text>
        
        {
            follow? 
            <div>
                <Button variant="danger" onClick={() => handleUnfollow(id)}>Unfollow</Button>
            </div> : 

            <div>
                <Button variant="primary" onClick={() => handleFollow(id)}>Follow</Button>
            </div>
        }

        
      </Card.Body>
    </Card>
  );
}

export default UsersCard;