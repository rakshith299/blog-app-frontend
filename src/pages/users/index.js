import react, { useEffect, useState } from "react";
import UsersCard from "../../components/UsersCard";
import axios from "axios";
import "./style.css"

const Users = () => {

    const [users, setUsers] = useState();
    
    useEffect(() => {
        let token = localStorage.getItem("jwtToken");
        
        if(token){
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-all-users`, {
                headers: {
                    'x-blog': token,
                }
            })
            .then((res) => {
                if(res.data.status === 200){
                    setUsers(res.data.data);
                }
                
            })
            .catch(err => {
                alert(err);
            })
        }else{
            window.location.href = "/login"
        }
    }, []);


    return (
        <div>
            {
                users && users.length > 0? 
                <>
                <h2 className="users-h2">Our Users</h2>
                <div className="users-cont">
                    {
                        users.map((each) => (
                            <UsersCard username={each.username} name = {each.name} email={each.email} follow={each.follow} id = {each._id}/>
                        ))
                    }
                </div> </>: 

                <div className="no-users">
                    <h2>No Users are currently available</h2>
                </div>
            }
        </div>
    )
}

export default Users;