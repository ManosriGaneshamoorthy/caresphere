import React from "react";
import Quote from "./Quote";
import Features from "./Features";
import NavBar from "./Navbar";


const Home = ()=>{
    return(
        <div>
            <NavBar />
            <Quote/>
            <Features/>
        </div>
    );
}

export default Home;