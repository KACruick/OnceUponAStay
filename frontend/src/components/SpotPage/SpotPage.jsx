import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getDetails } from '../../store/spots';
import { fetchReviews } from '../../store/reviews';
import './SpotPage.css';
import { IoMdStar } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx'
import CreateReviewModal from '../CreateReviewModal/CreateReviewModal.jsx';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal.jsx';
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal.jsx';


function SpotPage() {

    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector((state) => state.spots.spotDetails);
    const reviews = useSelector((state) => state.reviews.reviewsBySpot[spotId] || {})
    const user = useSelector((state) => state.session.user);

    // console.log("spotId: ", spotId)
    // console.log("Spot from Redux state:", spot);
    
    const isOwner = user && spot.Owner?.id === user.id;
    // console.log("reviews", reviews)
    const hasReviewedSpot = Object.keys(reviews).some((id) => reviews[id].User?.id === user?.id); // .some method returns true if it finds a matching review

    useEffect(() => {
        dispatch(getDetails(spotId))
        dispatch(fetchReviews(spotId))
    }, [dispatch, spotId])

    // useEffect(() => {
    //     console.log("Reviews for this spot:", reviews);  // Verify reviews in the component
    //   }, [reviews]);

    if (!spot || Object.keys(spot).length === 0) {
        return <p>Loading spot details...</p>; 
    }

    // console.log("spot details: ", spot)
    // console.log("reviews: ", reviews)
    
    //helper functions for returning image urls
    // function mainImg(spot) {
    //     const img = spot.SpotImages.find((img) => img.id === 1);
    //     if (!img) return "https://placehold.co/600x400/ffcc00/png"
    //     return img.url
    // }
    // function otherImg(spot) {
    //     const imgs = spot.SpotImages.filter((img) => img.id !== 1);
    //     if (!imgs) return "https://placehold.co/600x400/ffcc00/png"
    // }
    
        // Get the main image 
        const mainImg = spot.SpotImages[0].url
        console.log("Spot Images:", spot.SpotImages);
        console.log("Spot Images[1]:", spot.SpotImages[0]);
        console.log("Main Image URL: ", mainImg);
    
        // Get other images (or fallback to placeholder)
        // const otherImages = spot.SpotImages?.filter((img) => img.id !== 1) || [];

   console.log("spot.owner: ", spot.Owner)

  return (
    <div className='spot-page-container'>

        <div className='spot-details-container'>
            <div className='name-location'>
                <div className='name'>{spot.name}</div>
                <div className='location'>{spot.city}, {spot.state}, {spot.country}</div>
            </div>
            
            <div className='img-container'>
                <div className='main-img'> <img src={mainImg} alt={`${spot.name} main image`}/> </div>
                {/* <div className='others'>
                    {otherImages.length > 0 && 
                        otherImages.map((img) => (
                            <div className="img" key={img.id}>
                                <img src={img.url} alt={`${spot.name} alternative img`} />
                            </div>
                        ))
                    }
                </div> */}
            </div>
            <div className='under-pictures-container'>
                
                <div className='spot-text'>
                    <div className='owner'>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</div>
                    <div className='description'>{spot.description}</div>
                </div>

                <div className='reserve-container'>
                    <div className='reserve-info'>
                        <div className='price'>${spot.price} night</div>
                        <div className='rating'><IoMdStar /> {spot.avgStarRating}</div>
                        <div className='num-reviews'>{spot.numReviews} reviews</div>
                    </div>
                    <div>
                        <button className='reserve-button'>Reserve</button>
                    </div>
                </div>
            </div>

        </div>

    <hr></hr>

        <div className='reviews-container'>
 
            <div className='reviews-top'>
                <h3><IoMdStar /> {spot.avgStarRating}</h3>
                < RxDotFilled />
                <h3>{spot.numReviews} reviews</h3>
            </div>

            <div className='post-review-div'>
                {user && !isOwner && !hasReviewedSpot && (
                    <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<CreateReviewModal spotId={spotId} />}
                        className="post-review-button"
                    />
                )}
            </div>

            {/* <h2>Reviews</h2> */}
            {reviews && Object.keys(reviews).length > 0 ? (
            Object.values(reviews).map((review) => {
            const reviewDate = new Date(review.createdAt);
            const formattedDate = reviewDate.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
            });

            const isReviewAuthor = user && review.User?.id === user.id;


            return (
                <div key={review.id} className='review-card'>
                    <div className='review-header'>
                        <strong>{review.User?.firstName}</strong>
                        <span>{formattedDate}</span>
                    </div>
                    <div className='review-body'>
                        <p>{review.review}</p>
                    </div>

                    {/* To render review Update and delete Buttons */}
                    {isReviewAuthor && (
                        <div className='update-delete-div'>
                            {/* Update Button */}
                            <div>
                            <OpenModalButton
                                buttonText="Update"
                                modalComponent={
                                    <UpdateReviewModal 
                                        reviewId={review.id} 
                                        initialReview={review.review} 
                                        initialRating={review.stars} 
                                        spotId={review.spotId}
                                        pageType="spot"
                                    />
                                }
                                className='update-modal'
                            />
                            </div>

                            {/* Delete Button */}
                            <div>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
                                className="delete-modal"
                            />
                            </div>

                        </div>
                    )}

                </div>
            );
            })
            ) : (
            <p>No reviews yet</p>
            )}
        </div>
    </div>
  )
}

export default SpotPage
