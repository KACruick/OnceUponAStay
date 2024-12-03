import { csrfFetch } from "./csrf";

// actions
const GET_REVIEWS = "reviews/GET_REVIEWS";

// action creators
const getReviews = (spotId, reviews) => {
    return {
        type: GET_REVIEWS,
        payload: { spotId, reviews },
    };
};

// thunks
export const fetchReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json();
    console.log(data)
    return dispatch(getReviews(spotId, data.Reviews))
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
        default: 
            return state;
    }
};

export default reviewsReducer;