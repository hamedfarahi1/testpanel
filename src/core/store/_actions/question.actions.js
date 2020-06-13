import { questionConstants } from '../_constants'
import { questionService } from '../../service/question/questionService'
import { alertActions } from './alert.actions'
import { uiActions } from './ui.actions'
import { history } from '../_helpers'

export const questionActions = {
	getQuestions,
	addQuestion
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

function addQuestion(obj) {

	return dispatch => {
		dispatch(request(obj))
		questionService.addQuestion(obj)
			.then((res) => {
				dispatch(success(res));
				dispatch(uiActions.successSnackbar('عملیات ثبت سوال با موفقیت انجام شد'));
				history.push('/questions/list');
			})
			.catch((error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()))
			})
	}

	function request(question) { return { type: questionConstants.QUESTION_ADD_REQUEST, question } }
	function success(question) { return { type: questionConstants.QUESTION_ADD_SUCCESS, question } }
	function failure(error) { return { type: questionConstants.QUESTION_ADD_FAILURE, error } }
}