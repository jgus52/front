import { ELECTIONLIST_REQUEST, ELECTIONLIST_SUCCESS, ELECTIONLIST_FAIL, ELECTIONLIST_CHECK, ELECTIONLIST_CHECK_OUT} from "../constants/electionConstants"

const initialState = {
    loading: false,
    success: null,
    error: null,
    iselection: false,
    electionloading: false,
    electionlist: [],
}

const electionReducer = (state = initialState, action) => {
    switch(action.type){
        case ELECTIONLIST_REQUEST:
            return {
                ...state,
                electionloading: true,
                success: null,
                error: null,
            }
        case ELECTIONLIST_SUCCESS:
            return {
                ...state,
                electionloading: false,
                success: action.success,
                electionlist: action.data,
                error: null,
            }
        case ELECTIONLIST_FAIL:
            return {
                ...state,
                electionloading: false,
                success: null,
                error: action.error,
            }
        case ELECTIONLIST_CHECK:
            return {
                ...state,
                iselection: true,
            }
        case ELECTIONLIST_CHECK_OUT:
            return {
                ...state,
                iselection: false,
            }
        default:
            return state
        }
    }

export default electionReducer