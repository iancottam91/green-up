import React from 'react';
import ReactDOM from 'react-dom';
import * as apiHelpers from '../js/utils/api';
import { AddAvailability } from '../js/AddAvailability';

describe('getAvailabilityFilter', () => {

  it('returns the an empty filter by defaut', () => {
    const result = {
      where: {}
    };
    expect(apiHelpers.getAvailabilityFilter()).toEqual(result);
  });

  it('returns the a filter for just user id', () => {
    const result = {
      where: {
        userId: 'userId'
      }
    };
    expect(apiHelpers.getAvailabilityFilter('userId')).toEqual(result);
  });

  it('returns the a filter for just start date', () => {
    const result = {
      where: {
        availability: { gt:"2016-08-24T16:03:01.504Z" }
      }
    };
    expect(apiHelpers.getAvailabilityFilter(undefined, "2016-08-24T16:03:01.504Z")).toEqual(result);
  });

  it('returns the a filter for just end date', () => {
    const result = {
      where: {
        availability: { lt:"2016-08-24T16:03:01.504Z" }
      }
    };
    expect(apiHelpers.getAvailabilityFilter(undefined, undefined, "2016-08-24T16:03:01.504Z")).toEqual(result);
  });

  it('returns the a filter for start date and end date', () => {
    const result = {
      where: {
        availability: { between: ["2016-08-24T16:03:01.504Z","2020-08-24T16:03:01.504Z"] }
      }
    };
    expect(apiHelpers.getAvailabilityFilter(undefined, "2016-08-24T16:03:01.504Z","2020-08-24T16:03:01.504Z")).toEqual(result);
  });

  it('returns the a filter for date range and userId', () => {
    const result = {
      where: {
        availability: { gt:"2016-08-24T16:03:01.504Z" },
        userId: 'userId'
      }
    };
    expect(apiHelpers.getAvailabilityFilter('userId', "2016-08-24T16:03:01.504Z")).toEqual(result);
  });
});

describe('extractAvailabilityIdsForDelete', () => {
  expect(AddAvailability.extractAvailabilityIdsForDelete()).toEqual('a');
});
