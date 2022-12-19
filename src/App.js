import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notfound/NotFound";
import Subreddit from "./pages/subreddit/Subreddit";
import React from "react";
import Header from "./components/header/Header";


function App() {

    return (

        <>


            <Routes>

                <Route path= "/" element={<Home/>}/>
                <Route path="/subreddit/:id" element={<Subreddit/>}/>
                <Route path="*" element={<NotFound/>}/>

            </Routes>


        </>

    );
}

export default App;
