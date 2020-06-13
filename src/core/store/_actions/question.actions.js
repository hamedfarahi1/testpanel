import { questionConstants } from '../_constants'
import { questionService } from '../../service/question/questionService'
import { alertActions } from './alert.actions'

export const questionActions = {
	getQuestions
}

function getQuestions() {

	return async dispatch => {
		dispatch(request())
		return questionService.getQuestions()
			.then((res) => {
				dispatch(success());
				return res.data;
			})
			.catch((error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()))
			})
	}

	function request() { return { type: questionConstants.GET_QUESTIONS_REQUEST } }
	function success() { return { type: questionConstants.GET_QUESTIONS_SUCCESS } }
	function failure(error) { return { type: questionConstants.GET_QUESTIONS_FAILURE, error } }
}