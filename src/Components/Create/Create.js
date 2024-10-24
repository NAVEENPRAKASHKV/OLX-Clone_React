import React, { Fragment,useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useContext } from 'react';
import FirebaseContext,{Authcontext} from "../../store/FirebaseContext"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase/config.js';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name,setName] =useState("")
  const [category,setCategory] =useState("")
  const [price,setPrice] =useState("")
  const [image,setImage] =useState("")
  const {Firebase} =useContext(FirebaseContext)
  const {user} = useContext(Authcontext)
  const [url, setUrl] = useState(""); // To store the image download URL
  const date = new Date()
  const navigate =useNavigate()
  
  const handleSubmit = () => {
    if (image) {
      const storage = getStorage(); // Get Firebase storage instance
      const storageRef = ref(storage, `images/${image.name}`); // Create a reference to 'images/your_image_name'
  
      // Upload the file
      uploadBytes(storageRef, image)
        .then((snapshot) => {
          console.log("Uploaded a file!");
  
          // Get the download URL after upload
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          console.log("File available at", downloadURL);
  
          // Save the image URL and other details to Firestore
          addDoc(collection(db, "products"), {
            name,
            category,
            price,
            url: downloadURL, // Use downloadURL directly here
            userId: user.uid,
            createdAt: date.toDateString(),
          })
          .then(() => {
            console.log("Product added to Firestore!");
            navigate("/")
          })
          .catch((error) => {
            console.error("Error adding product to Firestore:", error);
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };
  
  return (
    
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            type="number" 
            id="fname" 
            name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):""}></img>
          
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
