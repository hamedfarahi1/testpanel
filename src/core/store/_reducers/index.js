import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { ui } from './ui.reducer';
import { question } from './question.reducer'

const rootReducer = combineReducers({
	authentication,
	alert,
	ui,
	question
});

export default rootReducer;