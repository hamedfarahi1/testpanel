const axios = require('axios');
const axiosInstance = axios.default.create({
	baseURL: 'http://tops.mtamadon.ir/api/v1'
})

module.exports = axiosInstance;