import react, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard";
import axios from "axios";
import "./style.css"

const HomePageBlogs = () => {

    const [homePageBlogs, setHomePageBlogs] = useState();

    

    useEffect(() => {
        let token = localStorage.getItem("jwtToken");

        if(token){

            axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/home-blogs`, {
                headers: {
                    "x-blog": token
                }
            })
            .then((res) => {
                if(res.data.status === 200){
                    setHomePageBlogs(res.data.data);
                }else{
                    alert(res.data.message);
                }
            })
            .catch(err => {
                alert(err.message);
            })
        }else{
            window.location.href = "/login";
        }
    }, []);

    return(
        <div>

            <h1 className="home-page-heading">Home</h1>
            {
                homePageBlogs && homePageBlogs.length > 0? 

                <div>
                    {
                        homePageBlogs.map((each) => (
                            <BlogCard id = {each._id} title={each.title} textBody={each.textBody} creationDateAndTime={each.creationDateAndTime} homePage = {true} username={each.username}/>
                        ))
                    }
                </div> : 

                <div className="h2-cont">
                    <h2 className="h2">Follow People to see their Blogs</h2>
                </div>
            }
        </div>
    )
}

export default HomePageBlogs;