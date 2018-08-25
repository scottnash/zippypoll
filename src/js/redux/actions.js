import * as constants from './constants';

export const setAvailabilityDates = (availabilityDates)=> {
  return Promise.resolve({
    type: constants.SET_AVAILABILITY_DATES,
    availabilityDates
  });
}
