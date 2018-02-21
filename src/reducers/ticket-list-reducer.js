import c from './../constants';

// first step to pass test 1
// export default (state = {}, action) => {
//   return state;
// };

export default (state = {}, action) => {
  let newState;
  const { names, location, issue, timeOpen, id } = action;

  switch (action.type) {
  case c.ADD_TICKET:
    newState = Object.assign({}, state, {
      [id]: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: formattedWaitTime
      }
    });
    return newState;

  case c.UPDATE_TIME:
    const newTicket = Object.assign({}, state[id], {formattedWaitTime});
    newState = Object.assign({}, state, {
      [id]: newTicket
    });
    return newState;

  default:
    return state;
  }
};
