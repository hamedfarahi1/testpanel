import { uiActions } from '../store/_actions';
import { store, history } from '../store/_helpers';
import { errorConstants } from '../store/_constants'
import { accountService } from '../service/account/accountService';
import { errorCodeKeyValues } from './errors-keyValue';

export const errorHandlerInterceptor = (error) => {
	const statusCode = error.response.status;
	createErrorMessage(statusCode);
	if (statusCode === 401 && !history.location.pathname.startsWith('/account')) {
		accountService.logout();
		window.location.reload(true);
	}
	return Promise.reject({ ...error })
}

const createErrorMessage = (statusCode) => {
	const errMsg = errorCodeKeyValues[statusCode]
	if (errMsg)
		showErrorMessage(errMsg);
	else
		showErrorMessage(errorConstants.ERROR);

}

const showErrorMessage = (message) => {
	store.dispatch(uiActions.errorSnackbar(message))
}