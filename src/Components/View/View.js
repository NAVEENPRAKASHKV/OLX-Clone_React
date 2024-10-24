import React from 'react';
import { useEffect,useState,useContext } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './View.css';
import { PostContext } from '../../store/postContext';
function View() {
  const [userDetials,setUserDetails] =useState("")
  const {postDetails}= useContext(PostContext)
  const fetchData =async(Id)=>{
    const productDocRef = doc(db, "users",Id);
    const docSnap = await getDoc(productDocRef);
    const userData = docSnap.data();
    console.log(docSnap)
    

  }
  useEffect(()=>{
    console.log(postDetails)
    const {stringValue} =postDetails?.userId
    fetchData(stringValue)
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url.stringValue}
          alt="image"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price.stringValue} </p>
          <span>{postDetails.name.stringValue}</span>
          <p>{postDetails.category.stringValue}</p>
          <span>{ postDetails.createdAt.stringValue ||"not avilable"}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>Name: NAVEEN PRAKASH K V</p>
          <p>Phone :9633751833</p>
        </div>
      </div>
    </div>
  );
}
export default View;
