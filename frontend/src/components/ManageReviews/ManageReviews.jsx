import './ManageReviews.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviewsByUser } from '../../store/reviews'
import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal.jsx';
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal.jsx'

function ManageReviews() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.userReviews);

  useEffect(() => {
    dispatch(fetchReviewsByUser());
  }, [dispatch])

  if (!user) {
    return navigate("/", {
      state: { error: "You must be logged in to manage your reviews" },
      replace: true
    });
  }

  console.log("reviews:", reviews)
  const userReviews = Object.values(reviews).filter((review) => review.User?.id === user.id);

  return (
    <div className='page'>

      <div className='header'>
        <h1>Manage Reviews</h1>
      </div>

      <div></div>

      {userReviews.length === 0 ? (
                <div className='no-reviews'>
                    <p>You don&apos;t have any reviews yet</p>
                </div>
            ) : (
                <div className="reviews-container">
                    {userReviews.map((review) => {
                        const reviewDate = new Date(review.createdAt);
                        const formattedDate = reviewDate.toLocaleString('en-US', {
                            month: 'long',
                            year: 'numeric',
                        });

                        return (
                            <div key={review.id} className='review-card'>
                                <div className='review-header'>
                                    <strong>{review.Spot?.name || "Spot Name"}</strong>
                                    <span>{formattedDate}</span>
                                </div>
                                <div className='review-body'>
                                    <p>{review.review}</p>
                                </div>

                                <div className='update-delete-div'>
                                  <div className='update-button-div'>
                                    <OpenModalButton
                                      buttonText="Update"
                                      modalComponent={<UpdateReviewModal 
                                        reviewId={review.id} 
                                        initialReview={review.review} 
                                        initialRating={review.stars} 
                                        spotId={review.spotId}
                                        pageType="manage"  />}
                                        className='update-modal'
                                    />
                                  </div>
                                  <div className='delete-button-div'>
                                      <OpenModalButton
                                          buttonText="Delete"
                                          modalComponent={<DeleteReviewModal reviewId={review.id} spotId={review.spotId} />}
                                          className="delete-modal"
                                      />
                                  </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}


    </div>
  )
}

export default ManageReviews
