// import { getDetails } from "./store/spots.js";
import { csrfFetch } from "./csrf";

// actions
const GET_REVIEWS = "reviews/GET_REVIEWS";
const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

// action creators
const getReviews = (spotId, reviews) => {
    return {
        type: GET_REVIEWS,
        payload: { spotId, reviews },
    };
};

const getUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        payload: reviews,
    };
};

const addReview = (spotId, review) => {
    return {
        type: ADD_REVIEW,
        payload: { spotId, review }
    }
}

const updateReviewAction = (spotId, review) => {
    return {
        type: 'UPDATE_REVIEW',
        payload: { spotId, review },
    };
};

const removeReview = (reviewId, spotId) => {
    return {
        type: REMOVE_REVIEW,
        payload: { reviewId, spotId},
    }
};

// thunks
export const fetchReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json();
    console.log("Fetched reviews:", data)
    return dispatch(getReviews(spotId, data.Reviews))
}

export const fetchReviewsByUser = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`);
    const data = await response.json();
    console.log("User reviews:", data);
    return dispatch(getUserReviews(data.Reviews));
};

export const createReview = (spotId, reviewData) => async (dispatch) => {
    // console.log("Sending review to server:", reviewData);

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewData)
    });
    // console.log("Server response:", response);
    // console.log("after csrfFetch but before dipatch add review")
    try {
        const newReview = await response.json();
        // console.log("New review received:", newReview);
        dispatch(addReview(spotId, newReview))
        dispatch(fetchReviews(spotId));
        // dispatch(getDetails(spotId)) // fetch updated spot details (for updated avgStarRating and numReviews)
        return true;
        // return newReview;
    } catch (error) {
        console.error("Failed to submit review:", error.message);
    }
}

export const updateReview = (reviewId, reviewData) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      body: JSON.stringify(reviewData),
    });
    const updatedReview = await response.json();
    dispatch(updateReviewAction(updatedReview.spotId, updatedReview))
    dispatch(fetchReviews(updatedReview.spotId)); // Refetch reviews for the spot
    return updatedReview;
  };

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
      dispatch(removeReview(reviewId, data.spotId));
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete review");
    }
  };

//initial state
const initialState = {
    reviewsBySpot: {},
    userReviews: {},
}

// reducer 
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:{
            const { spotId, reviews } = action.payload;
            const reviewsObject = reviews.reduce((acc, review) => {
                acc[review.id] = review;
                return acc;
            }, {});
            return {
                ...state,
                reviewsBySpot: {
                  ...state.reviewsBySpot,
                  [spotId]: reviewsObject,
                }
            }
        }
        case GET_USER_REVIEWS: {
            const reviewsObject = action.payload.reduce((acc, review) => {
                acc[review.id] = review;
                return acc;
            }, {});
            return {
                ...state,
                userReviews: reviewsObject,
            };
        }
        case ADD_REVIEW: {
            const { spotId, review } = action.payload;
            return {
                ...state,
                reviewsBySpot: {
                    ...state.reviewsBySpot,
                    [spotId]: {
                        ...(state.reviewsBySpot[spotId] || {}), 
                        [review.id]: review, 
                    },
                },
            };
        }
        case UPDATE_REVIEW: {
            const { spotId, review } = action.payload;
            return {
                ...state,
                reviewsBySpot: {
                    ...state.reviewsBySpot,
                    [spotId]: {
                        ...(state.reviewsBySpot[spotId] || {}),
                        [review.id]: review,
                    },
                },
                userReviews: {
                    ...state.userReviews,
                    [review.id]: review,
                },
            };
        }
        case REMOVE_REVIEW: {
            const { reviewId, spotId } = action.payload;
            const updatedReviews = { ...state.reviewsBySpot[spotId] };

            // Remove the review by reviewId
            delete updatedReviews[reviewId];

            // remove the review by user 
            const updatedUserReviews = { ...state.userReviews };
            delete updatedUserReviews[reviewId];

            return {
                ...state,
                reviewsBySpot: {
                    ...state.reviewsBySpot,
                    [spotId]: updatedReviews,
                },
                userReviews: updatedUserReviews,
                
            };
        }
        default: 
            return state;
    }
};

export default reviewsReducer;