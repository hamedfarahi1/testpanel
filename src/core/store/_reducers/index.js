import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { ui } from './ui.reducer';

const rootReducer = combineReducers({
	authentication,
	alert,
	ui
});

export default rootReducer;