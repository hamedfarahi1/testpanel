import { userConstants } from '../_constants';
import { accountService } from '../services/account/accountService'
import { alertActions } from '.';
import { history } from '../_helpers';

export const userActions = {
	login,
	logout
};

function login(user) {
	return dispatch => {
		dispatch(request({ username: user.username }));
		const credential = { username: user.username, roleTypeIndex: user.roleTypeIndex }
		accountService.login(user)
			.then(
				() => {
					dispatch(success(credential));
					history.push('/home');
				},
				error => {
					dispatch(failure(error.toString()));
					dispatch(alertActions.error(error.toString()));
				}
			);
	};

	function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
	function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
	accountService.logout();
	return { type: userConstants.LOGOUT };
}