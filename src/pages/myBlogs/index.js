import react, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/index.js";
import axios from "axios";
import "./style.css";
import Header from "../../components/Header/index.js";

const MyBlogs = () => {

    const [myBlogs, setMyBlogs] = useState([]);
    let token = localStorage.getItem("jwtToken");

    useEffect(() => {

        let tokenSecond = localStorage.getItem("jwtToken");
        if(tokenSecond){
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/get-user-blog`, {
                headers: {
                    "x-blog" : token
                }
            })
            .then((res) => {
                if(res.data.status === 200){
                    console.log(res.data.data);
                    setMyBlogs(res.data.data);
                }else{
                    alert(res.data.message);
                }
                
            }) 
            .catch((err) => {
                alert(err);
            })

        }else{

            window.location.href = "/login";
        }


    },[token]);

    return(
        <div>
            <h1 className="blog-heading">My Blogs</h1>
            {
                myBlogs.length > 0 ? 

                <div>
                    {
                        myBlogs.map((eachBlog) => (
                            <BlogCard title = {eachBlog.title} textBody = {eachBlog.textBody} id = {eachBlog._id} creationDateAndTime = {eachBlog.creationDateAndTime}/>
                        ))
                    }
                </div> : 

                <div className="no-blog-container">
                    <h2>You have not created Blogs</h2>
                </div>
            }
        </div>
    )
}

export default MyBlogs;