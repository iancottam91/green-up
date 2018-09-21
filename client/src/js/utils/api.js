import request from 'superagent';

/*
* {string} url - the api url
* {Object} data - the post data as JSON 
*
* returns {promise}
*/
export const post = (url, data) => {
  return request
  .post('http://localhost:3000/api' + url)
  .send(data)
  .set('Accept', 'application/json');
}

/*
* {string} url - the api url
* {string} token - the access token
*
* returns {promise}
*/
export const get = (url, token) => {
  return request
  .get(`http://localhost:3000/api${url}?access_token=${token}`)
  .set('Accept', 'application/json');
}