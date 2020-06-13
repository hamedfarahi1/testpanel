const axios = require('../client');

export const questionService = {
	getQuestions,
	addQuestion,
	getQuestionStats
}

function getQuestions() {
	return axios.get('/admin/questions');
}

function addQuestion(obj) {
	return axios.post('/admin/questions', obj);
}

function getQuestionStats() {
	return axios.get('/admin/questions/stats');
}