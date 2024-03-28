import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import reviews from '../data/reviews.js';

function HomeMainSection(){
  const [selectedReviews, setSelectedReviews] = useState([]);
  
  useEffect(() => {
    const selectedRandomReviews = () => {
        let randomReviews = [];
        while(randomReviews.length < 2){
            let randomIndex = Math.floor(Math.random() * reviews.length);
            if(!randomReviews.includes(reviews[randomIndex])){
                randomReviews.push(reviews[randomIndex]);
            }
        }
        setSelectedReviews(randomReviews);
    }
    selectedRandomReviews();
}, []);

    return(
    <div>
        <div className="about-us">
            <h1>About Us</h1>
            <p>Welcome to our online store! We are founded by Aiden and Omar, two university students from the University of Calgary and our aim is to deliver high-quality products that are affordable for other students like us.</p>
        </div>
        <div className="shop-now">
            <Link to='/Productpage'><button>Shop Now</button></Link>
        </div>
        <div className="customer-reviews">
            <h1>Customer Reviews</h1> 
            {selectedReviews.map((review, index) => (
                <div key={index}>
                    <h3>{review.customerName}</h3>
                    <p>{review.reviewContent}</p>
                    <p>{'★'.repeat(review.stars)}</p>
                </div>
            ))}
        </div>
    </div>
  );
};
export default HomeMainSection;
