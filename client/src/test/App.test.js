import React from 'react';
import ReactDOM from 'react-dom';
import * as apiHelpers from '../js/utils/api';
import { AddAvailability } from '../js/AddAvailability';
import { ViewAvailability } from '../js/ViewAvailability';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


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
  it('should return availability to delete if necessary', () => {
    const wrapper = shallow(<AddAvailability/>);
    const initial = [
      {availability: "2018-09-21T22:59:59.000Z", id: "5ba4f66b101d05ddd4df33e3"},
      {availability: "2018-09-22T22:59:59.000Z", id: "5ba4f671101d05ddd4df33e4"},
      {availability: "2018-09-23T22:59:59.000Z", id: "5ba4f67a101d05ddd4df33e5"},
      {availability: "2018-09-24T22:59:59.000Z", id: "5ba4f67a101d05ddd4df33e6"}
    ];

    const next = ["2018-09-21T22:59:59.000Z", "2018-09-22T22:59:59.000Z", "2018-09-28T22:59:59.000Z"];

    const result = [
      "5ba4f67a101d05ddd4df33e5",
      "5ba4f67a101d05ddd4df33e6"
    ]

    expect(wrapper.instance().extractAvailabilityIdsForDelete(initial, next)).toEqual(result);
  });

  it('should return an empty array if there are no ids to delete', () => {
    const wrapper = shallow(<AddAvailability/>);
    const initial = [
      {availability: "2018-09-21T22:59:59.000Z", id: "5ba4f66b101d05ddd4df33e3"},
      {availability: "2018-09-22T22:59:59.000Z", id: "5ba4f671101d05ddd4df33e4"},
      {availability: "2018-09-28T22:59:59.000Z", id: "5ba4f67a101d05ddd4df33e5"},
    ];

    const next = ["2018-09-21T22:59:59.000Z", "2018-09-22T22:59:59.000Z", "2018-09-28T22:59:59.000Z"];

    const result = [];

    expect(wrapper.instance().extractAvailabilityIdsForDelete(initial, next)).toEqual(result);
  });
});

describe('filterAvailabilityByDate', () => {
  it('should return all availability for a specific date', () => {
    const noop = () => {};
    const wrapper = shallow(<ViewAvailability setWeekDates={noop} user={''} />);
    const unfilteredData = [{
      userId: "this.props.user.id", availability: "2018-09-21T22:59:59.000Z", id: "5ba506c10d0e34e458a097ec"
    },
    {
      userId: "this.props.user.id", availability: "2018-09-22T22:59:59.000Z", id: "5ba506c10d0e34e458a097ec"
    }]

    const filteredData = [{
      userId: "this.props.user.id", availability: "2018-09-21T22:59:59.000Z", id: "5ba506c10d0e34e458a097ec"
    }]
    expect(wrapper.instance().filterAvailabilityByDate()).toEqual(filteredData);
  });
});