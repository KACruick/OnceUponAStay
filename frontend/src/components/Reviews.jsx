import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../../store/reviews';

const { spotId } = useParams();
const dispatch = useDispatch();

console.log("spotId: ", spotId)

const reviews = useSelector((state) => state.reviews.reviewsBySpot[spotId] || [])

useEffect(() => {
    dispatch(fetchReviews(spotId))
}, [dispatch, spotId])

console.log("reviews: ", reviews)

function Reviews() {
  return (
    <div>
      <h1>Reviews</h1>
    </div>
  )
}

export default Reviews
