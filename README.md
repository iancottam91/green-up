# My Application

The project is generated by [LoopBack](http://loopback.io).

NEXT:

* Find availabilities based on a date

Use a where filter and need to specify a date range or specific date

{"where": {"availability.date": { "gt":"1" }}}

https://loopback.io/doc/en/lb2/Where-filter.html#gt-and-lt
{"where": {"availability": { "gt":"2016-08-24T16:03:01.504Z" }}}

* Need to specify a complex data model - nested properties for ‘availability’

https://loopback.io/doc/en/lb2/Creating-models.html#getting-a-reference-to-a-model-in-javascript