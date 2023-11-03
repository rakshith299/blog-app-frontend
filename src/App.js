import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./pages/register/index.js";
import Login from "./pages/login/index.js";
import CreateBlog from "./pages/createBlog/index.js";
import MyBlogs from "./pages/myBlogs/index.js";
import HomePageBlogs from "./pages/homePage/index.js";
import Header from "./components/Header/index.js";
import Users from "./pages/users/index.js";

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path = "/" element = {<Register/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/create-blog" element = {<CreateBlog/>}/>
        <Route path = "/my-blogs" element = {<MyBlogs/>}/>
        <Route path = "/home-page-blogs" element = {<HomePageBlogs/>}/>
        <Route path = "/users" element = {<Users/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
