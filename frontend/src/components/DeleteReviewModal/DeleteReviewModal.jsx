import "./DeleteReviewModal.css"
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { fetchReviews, deleteReview } from "../../store/reviews";
import { getDetails } from "../../store/spots";

function DeleteReviewModal({ reviewId, spotId }) {

  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    console.log(reviewId)
    try {
      await dispatch(deleteReview(reviewId));
      closeModal();
      // Refetch reviews and spot details
      dispatch(fetchReviews(spotId)); // Refetch reviews
      dispatch(getDetails(spotId));   // Refetch spot details
    } catch (error) {
      console.error("Failed to delete review:", error.message);
    }
    
  };

  const handleCancel = async () => {
    closeModal();
  }

  return (
    <div>
      <div className='modal-container'>
      <h1>Confirm Delete</h1>
      
      <div className='h4-container'>
        <h4>Are you sure you want to delete this review?</h4>
      </div>

      
      <div className="action-buttons">
        <button onClick={handleDelete} className='yes'>Yes (Delete Review)</button>
        <button onClick={handleCancel} className='no'>No (Keep Review)</button>
      </div>
    </div>
    </div>
  )
}

export default DeleteReviewModal
