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
export const get = (url, token, filter) => {
  console.log(filter);
  return request
  .get(`http://localhost:3000/api${url}?access_token=${token}`)
  .query({filter})
  .set('Accept', 'application/json');
}

/*
* {string} url - the api url
* {string} token - the access token
*
* returns {promise}
*/
export const deleteItem = (url, token, id) => {
  console.log('delete');
  return request
  .delete(`http://localhost:3000/api${url}/${id}?access_token=${token}`)
  .set('Accept', 'application/json');
}

/*
* {string} userId - user id
* {date} startDate - Round-trip date format
* {date} endDate - Round-trip date format
* 
* returns {Object} - the filter for ajax
*/
export const getAvailabilityFilter = (userId, startDate, endDate) => {
  const filter = {
    where: {
      ...(userId && {userId}),
      ...((startDate && !endDate) && {"availability": {"gt": startDate}}),
      ...((!startDate && endDate) && {"availability": {"lt": endDate}}),
      ...((startDate && endDate) && {"availability": {"between": [startDate,endDate]}}),
    }
  }
  return filter
}