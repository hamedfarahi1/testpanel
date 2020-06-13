import { questionConstants } from '../_constants';

export function question(state = {}, action) {
	switch (action.type) {
		case questionConstants.QUESTION_ADD_REQUEST:
			return { addingQuestion: true };
		case questionConstants.QUESTION_ADD_SUCCESS:
			return {};
		case questionConstants.QUESTION_ADD_FAILURE:
			return {};
		case questionConstants.GET_QUESTIONS_REQUEST:
			return { gettingQuestions: true };
		case questionConstants.GET_QUESTIONS_SUCCESS:
			return {};
		case questionConstants.GET_QUESTIONS_FAILURE:
			return {};
		case questionConstants.GET_QUESTION_BY_ID_REQUEST:
			return { gettingQuestion: true };
		case questionConstants.GET_QUESTION_BY_ID_SUCCESS:
			return { question: action.question };
		case questionConstants.GET_QUESTION_BY_ID_FAILURE:
			return {};
		default:
			return state
	}
}