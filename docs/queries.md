Use a where filter and need to specify a date range or specific date:

https://loopback.io/doc/en/lb2/Where-filter.html#gt-and-lt
{"where": {"availability": { "gt":"2016-08-24T16:03:01.504Z" }}}
{"where": {"availability": { "between": ["2016-08-24T16:03:01.504Z","2020-08-24T16:03:01.504Z"]}}}