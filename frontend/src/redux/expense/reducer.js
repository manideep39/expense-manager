import { ADD_EXPENSE } from './actionTypes'

const initState = {
    data: []
}
export default (state = initState, action) => {
    switch (action.type) {
        case ADD_EXPENSE:
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }

}