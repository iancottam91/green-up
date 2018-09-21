export const defaultState = {};

const getDatesForTheWeek = () => {
  let dates = [];
  for(let i=0;i<7;i++) {
    let nextDay = new Date();
    let endOfDayDate = new Date(nextDay.getFullYear()
          ,nextDay.getMonth()
          ,nextDay.getDate()
          ,23,59,59);
    endOfDayDate.setDate(endOfDayDate.getDate()+i);
    dates.push(endOfDayDate.toISOString());
  }
  return dates;
}

const dates = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_WEEK_DATES':
      const currentWeek = getDatesForTheWeek();
      return {
        ...state,
        currentWeek
      };
    default:
      return state;
  }
};

export default dates;