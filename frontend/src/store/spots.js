
import { csrfFetch } from "./csrf";

// actions
const GET_SPOTS = "spots/GET_SPOTS";
const GET_SPOTS_DETAILS = "spots/GET_SPOTS_DETAILS";
const CREATE_SPOT = "spots/CREATE_SPOT";

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

const createSpotAction = (spot) => {
    return {
        type: CREATE_SPOT,
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

        // Normalize spots into an object with spot IDs as keys
        const normalizedSpots = data.Spots.reduce((acc, spot) => {
            acc[spot.id] = spot;
            return acc;
        }, {});
        dispatch(getSpotsAction(normalizedSpots));
    }
};

export const getDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    console.log("API: ", data)
    return dispatch(getSpotDetails(data));
}

export const createSpot = (newSpotData) => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSpotData),
    });
    console.log("response: ", response)
    if (response.ok) {
        const newSpot = await response.json();

        const normalizedSpot = {
            ...newSpot,
            id: newSpot.id,
        };
        console.log("new: ", normalizedSpot)

        dispatch(createSpotAction(normalizedSpot));
        return normalizedSpot;
    } else {
        const errorData = await response.json();
        throw errorData;
    }
}


// spots initial state
const initialState = {
    allSpots: {},
    spotDetails: {},
};


// spots reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            return { ...state, allSpots: { ...action.payload } };
        case GET_SPOTS_DETAILS: {
            return { ...state, spotDetails: action.payload };
        }
        case CREATE_SPOT: {
            const newAllSpots = { ...state.allSpots, [action.payload.id]: action.payload };
            return {
                ...state,
                allSpots: newAllSpots,
                spotDetails: action.payload, // since we load the spots page after submit
            };
        }
    default:
        return state;
    }
};


export default spotsReducer;