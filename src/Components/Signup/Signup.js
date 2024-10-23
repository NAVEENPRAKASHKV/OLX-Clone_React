import React, { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import FirebaseContext from "../../store/FirebaseContext";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase/config.js';
import { useNavigate,Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { Firebase } = useContext(FirebaseContext);
  const navigate= useNavigate()
 

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // signin logic
        const user = userCredential.user;
       
        updateProfile(user, {
          displayName: username,
        }).then(() => {
          addDoc(collection(db, "users"), {
            id:user.uid,
            username:username,
            phone:phone
          });
          alert('successfully sign up Please Login ')
          navigate("/login")
        }).catch((error) => {
          console.log(error)
          // An error occurred
          // ...
        });
      })
      .catch((error) => {
        
        alert("Error in registration Please Regegister with proper credentials")
        // ..
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login" >Login</Link>
      </div>
    </div>
  );
}
