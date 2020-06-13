const axios = require('../client');

export const questionService = {
	getQuestions
}

function getQuestions() {
	return axios.get('/admin/questions');
}