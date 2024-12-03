import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getDetails } from '../../store/spots';
import './SpotPage.css';
import { IoMdStar } from "react-icons/io";
import Reviews from '../Reviews.jsx';



function SpotPage() {

    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector((state) => state.spots.spotDetails);

    console.log("spotId: ", spotId)
    console.log("Spot from Redux state:", spot);
    
    useEffect(() => {
        dispatch(getDetails(spotId))
    }, [dispatch, spotId])

    console.log("spot details: ", spot)
    

  return (
    <div className='spot-page-container'>

        <div className='spot-details-container'>
            {/* <h1>Spot Page</h1> */}
            <h2>{spot.name}</h2>
            <div className='name'>{spot.name}</div>
            <div className='location'>{spot.city}, {spot.state}, {spot.country}</div>
            <div className='img-container'>
                <div className='big-img'> <img src={spot.SpotImages[0]} alt={spot.name} /> </div>
                <div className='other-img'> </div>
            </div>
            <div className='owner'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
            <div className='description'>{spot.description}</div>
            <div className='reserve-container'>
                <div className='reserve-info'>
                    <div className='price'>${spot.price}</div>
                    <div className='rating'><IoMdStar /> {spot.avgStarRating}</div>
                    <div className='num-reviews'>{spot.numReviews} reviews</div>
                </div>
                <div className='reserve-button'>
                    <button>Reserve</button>
                </div>
            </div>
        </div>

        <div className='reviews-container'>
            <h2>Reviews</h2>
            <Reviews />
        </div>
    </div>
  )
}

export default SpotPage
