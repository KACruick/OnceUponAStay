import { csrfFetch } from "./csrf";

// actions
const GET_SPOTS = "spots/GET_SPOTS";


// action creators
const getSpotsAction = (spots) => {
    return {
      type: GET_SPOTS,
      payload: spots,
    };
};


// thunks
export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots");
    const data = await res.json();
    return dispatch(getSpotsAction(data));
};


// spots initial state
const initialState = {
    allSpots: [],
};


// spots reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SPOTS:
        return { ...state, allSpots: [...action.payload.Spots] };
    default:
        return state;
    }
};


export default spotsReducer;