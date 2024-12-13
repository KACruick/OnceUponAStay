import './CreateReviewModal.css';
import { IoMdStar } from "react-icons/io";
// import { IoMdStarHalf } from "react-icons/io";
// import { IoMdStarOutline } from "react-icons/io";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createReview, fetchReviews } from "../../store/reviews";
import { getDetails } from '../../store/spots';
import { useModal } from "../../context/Modal";


function CreateReview({ spotId }) {
  const dispatch = useDispatch();
  // const [stars, setStars] = useState([false, false, false, false, false])
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    // console.log("submit ...")
    // use thunk action to submit review 
    try {
      const newReview = await dispatch(createReview(spotId, { review, stars: rating }));
      console.log("Review submitted successfully:", newReview);
      closeModal();
      await dispatch(fetchReviews(spotId));
      await dispatch(getDetails(spotId));
    } catch (error) {
      console.log("Failed to submit review:", error);

      
    if (error instanceof Response) {
      try {
        const errorData = await error.json(); // Parse the JSON response to display the backend API error message
        if (errorData.message) {
          setErrors({ general: errorData.message }); 
        } else {
          setErrors({ general: "Something went wrong. Please try again." });
        }
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError);
        setErrors({ general: "Something went wrong. Please try again." });
      }
    } else {
      setErrors({ general: "Something went wrong. Please try again." });
    }
    }
  }

  return (
    <div className='review-modal-container'>

      <div className='review-header-div'>
        <h1 className='header-title'>How was your stay?</h1>
      </div>

      <div className='review-error-container'>
        {errors?.general && <p>{errors.general}</p>}
      </div>

      <div className='textarea-div'>
        <textarea 
          value={review}
          className='text'
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
          >
        </textarea>
      </div>

      <div className='stars-div'>
          {fillStars()}
      </div>

      <div className="button-div">
        <button className='submit-review-button' type="submit" onClick={handleSubmit} disabled={!review || review.length < 10 || rating === 0}>
          Submit Your Review
        </button>
      </div>

    </div>
  )
}

export default CreateReview
