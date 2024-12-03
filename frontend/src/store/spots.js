
import { csrfFetch } from "./csrf";

// actions
const GET_SPOTS = "spots/GET_SPOTS";
const GET_SPOTS_DETAILS = "spots/GET_SPOTS_DETAILS";

// action creators
const getSpotsAction = (spots) => {
    return {
      type: GET_SPOTS,
      payload: spots,
    };
};

const getSpotDetails = (spot) => {
    return {
        type: GET_SPOTS_DETAILS,
        payload: spot
    };
};


// thunks
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    
    if (response.ok) {
        const data = await response.json();
        // console.log('API response:', data)
        // console.log("key into 1 spot", data.Spots[0])
        return dispatch(getSpotsAction(data.Spots));
    }
};

export const getDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    console.log("API: ", data)
    return dispatch(getSpotDetails(data));
}


// spots initial state
const initialState = {
    allSpots: [],
    spotDetails: {},
};


// spots reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            return { ...state, allSpots: action.payload };
        case GET_SPOTS_DETAILS: {
            return { ...state, spotDetails: action.payload };
        }
    default:
        return state;
    }
};


export default spotsReducer;