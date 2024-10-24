import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/config";
import Heart from "../../assets/Heart";
import "./Post.css";
import {  collection, getDocs } from "firebase/firestore"; 

function Posts() {
  const [products, setProducts] = useState([]);
  const fetchProduct =async()=>{
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);
    console.log(querySnapshot)
    const allPost = querySnapshot["_snapshot"].docChanges
    setProducts(allPost)
    console.log(products) 
  }

  useEffect(() => {
    fetchProduct()
    
   
  }, []);
  
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.length? products.map((data,index)=> {
            const product = data?.doc?.data?.value?.mapValue?.fields
            console.log(product)
            return(
          <div key={index} className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product?.url?.stringValue} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product?.price?.stringValue}</p>
              <span className="kilometer">{product?.category?.stringValue}</span>
              <p className="name"> {product?.name?.stringValue}</p>
            </div>
            <div className="date">
              <span>Available</span>
            </div>
          </div>
)}):<h1>.....Loading</h1>}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
