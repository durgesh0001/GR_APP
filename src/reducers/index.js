import {combineReducers} from 'redux';
import AuthReducer from './Auth/AuthReducer';
import  HomeReducer from './HomeReducer/HomeReducer';
export default combineReducers({
auth:AuthReducer,
home:HomeReducer,
});