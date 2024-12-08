import { csrfFetch } from "./csrf";

// actions
const GET_REVIEWS = "reviews/GET_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";

// action creators
const getReviews = (spotId, reviews) => {
    return {
        type: GET_REVIEWS,
        payload: { spotId, reviews },
    };
};

const addReview = (spotId, review) => {
    return {
        type: ADD_REVIEW,
        payload: { spotId, review }
    }
}

// thunks
export const fetchReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json();
    console.log(data)
    return dispatch(getReviews(spotId, data.Reviews))
}

export const createReview = (spotId, reviewData) => async (dispatch) => {
    console.log("Sending review to server:", reviewData);

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewData)
    });
    console.log("Server response:", response);
    console.log("after csrfFetch but before dipatch add review")
    try {
        const newReview = await response.json();
        console.log("New review received:", newReview);
        dispatch(addReview(spotId, newReview))
        dispatch(fetchReviews(spotId));
        return true;
        // return newReview;
    } catch (error) {
        console.error("Failed to submit review:", error.message);
    }
}

//initial state
const initialState = {
    reviewsBySpot: {},
}

// reducer 
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:{
            const { spotId, reviews } = action.payload;
            return {
                ...state,
                reviewsBySpot: {
                  ...state.reviewsBySpot,
                  [spotId]: reviews
                }
            }
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
        default: 
            return state;
    }
};

export default reviewsReducer;