# My Application

The project is generated by [LoopBack](http://loopback.io).

NEXT:

* `yarn start:dev` to load up client and server
* `mongod` to fire up mongo from the terminal
* Use Robo 3T to check mongo is running and being used correctly

* Find availabilities based on a date

Use a where filter and need to specify a date range or specific date

{"where": {"availability.date": { "gt":"1" }}}

https://loopback.io/doc/en/lb2/Where-filter.html#gt-and-lt
{"where": {"availability": { "gt":"2016-08-24T16:03:01.504Z" }}}
{"where": {"availability": { "between": ["2016-08-24T16:03:01.504Z","2020-08-24T16:03:01.504Z"]}}}

* Need to specify a complex data model - nested properties for ‘availability’

https://loopback.io/doc/en/lb2/Creating-models.html#getting-a-reference-to-a-model-in-javascript


NEXT:

- How to login in front end?
See https://medium.freecodecamp.org/build-restful-api-with-authentication-under-5-minutes-using-loopback-by-expressjs-no-programming-31231b8472ca
- How to create user in front end?

Need:

* Register Page
* Login Page
(fields in middle of the page)
* Select availabilities page
* View availabilities page

To do:

* verify email address

NEXT:

- get availabilities for my current week to set initial state in set my greens
- post for each availability option
- view all availabilites of everyone else
- keep token in local storage
- make into an app??