import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./features/user/Login";
import Register from "./features/user/Register";
import "./App.css";
import Main from "./containers/Main/Main";
import NewPost from "./containers/NewPost/NewPost";
import Comments from "./containers/Comments/Comments";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
