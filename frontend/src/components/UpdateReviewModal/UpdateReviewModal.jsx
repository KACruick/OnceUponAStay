import './UpdateReviewModal.css'
import { IoMdStar } from "react-icons/io";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateReview, fetchReviewsByUser, fetchReviews } from "../../store/reviews";
import { getDetails } from '../../store/spots';
import { useModal } from "../../context/Modal";

function UpdateReviewModal({ initialReview, initialRating, reviewId, spotId, pageType }) {

    const dispatch = useDispatch();
    const [rating, setRating] = useState(initialRating || 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState(initialReview || '');

    const { closeModal } = useModal();

    const spot = useSelector(state => state.spots.allSpots[spotId]);
    // console.log("spot: ", spot)
    // console.log("spot.name: ", spot.name)

    // useEffect(() => {
    //     if (!spot) {
    //         dispatch(getDetails(spotId)); // Dispatch the getDetails action to fetch the spot details
    //     }
    // }, [dispatch, spot, spotId])

    // Autofill the review and rating
    useEffect(() => {
        setReview(initialReview);
        setRating(initialRating);
    }, [initialReview, initialRating]);

    // Helper function to render stars
    const fillStars = () => {
        return [0, 1, 2, 3, 4].map((index) => (
            <IoMdStar
            key={index}
            className={index < (hoverRating || rating) ? 'filled-star' : 'empty-star'}
            onClick={() => setRating(index + 1)} // Update rating on click
            onMouseEnter={() => setHoverRating(index + 1)} // Update hover state
            onMouseLeave={() => setHoverRating(0)} // Reset hover state
            aria-label={`Rate ${index + 1} star`}
            />
        ));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Updating review...");
        try {
          // Dispatch update review action
          await dispatch(updateReview(reviewId, { review, stars: rating }));

          // Conditionally dispatch based on the pageType
          if (pageType === "manage") {
            await dispatch(fetchReviewsByUser());  // Fetch reviews by user for the ManageReviews page
          } else if (pageType === "spot") {
            await dispatch(fetchReviews(spotId)); // Fetch reviews by spotId for the SpotPage
            await dispatch(getDetails(spot.id)); 
          }

          console.log("Review updated successfully");
          closeModal(); 

        } catch (error) {
          console.error("Failed to update review:", error.message);
        }
    };


  return (
    <div className='review-modal-container'>

      <div className='header-div'>
        <h1 className='header-title'>How was your stay at {spot.name}?</h1>
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
          Update Your Review
        </button>
      </div>

    </div>
  )
}

export default UpdateReviewModal
