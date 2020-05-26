import {combineReducers} from 'redux'
import manageMovieReducer from './movies'
import manageUserReducer from './users'
import userReducer from './user'
import manageBookTicketReducer from './ticket'
import manageTheatersReducer from './theaters'
import infoReducer from './info'
export default combineReducers({
    manageMovieReducer,
    manageUserReducer,
    manageTheatersReducer,
    userReducer,
    manageBookTicketReducer,
    infoReducer
})