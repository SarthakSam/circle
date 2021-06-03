const axios = require('axios');

module.exports = async (req, res, next) => {
    const {authorization} = req.headers;
    try {
        const response = await axios.get('https://sarthak-kapoor.au.auth0.com/userInfo', { headers: { authorization } })
        req.userDetails = response.data
        next();
    } catch(error) {
        next(error);
    }
}
