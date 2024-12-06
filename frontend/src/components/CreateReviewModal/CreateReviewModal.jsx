import './CreateReviewModal.css';
import { IoMdStar } from "react-icons/io";
// import { IoMdStarHalf } from "react-icons/io";
// import { IoMdStarOutline } from "react-icons/io";
import { useState, useEffect } from 'react';

function CreateReview({ spotId }) {

  // const [stars, setStars] = useState([false, false, false, false, false])
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');


  // Helper function to render stars
  const fillStars = () => {
    return [0, 1, 2, 3, 4].map((index) => (
      <IoMdStar
        key={index}
        className={index < (hoverRating || rating) ? 'filled-star' : 'empty-star'}
        onClick={() => setRating(index + 1)} // Update rating on click
        onMouseEnter={() => setHoverRating(index + 1)} // Update hover state
        onMouseLeave={() => setHoverRating(0)} // Reset hover state
      />
    ));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // use thunk action to submit review 
  }

  return (
    <div className='review-modal-container'>

      <div className='header-div'>
        <h1 className='header-title'>How was your stay?</h1>
      </div>

      <div className='textarea-div'>
        <textarea 
          value={review}
          className='text'
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
          required>
        </textarea>
      </div>

      <div className='stars-div'>
          {fillStars()}
      </div>

      <div className="button-div">
        <button className='submit-review-button' type="submit" onClick={handleSubmit} disabled={!review || rating === 0}>
          Submit Your Review
        </button>
      </div>

    </div>
  )
}

export default CreateReview
