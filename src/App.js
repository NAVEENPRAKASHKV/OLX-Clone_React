import React, { useEffect,useContext  } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { Authcontext } from "./store/FirebaseContext";
import Create from "./Pages/Create"
import ViewPost from "./Pages/ViewPost"
import Post from "./store/postContext";




function App() {
  const { user,setUser } = useContext(Authcontext);
  
  
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log(user)
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
    }
    })
  },[])

  return (
    <div>
        <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element= {<ViewPost/>} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
