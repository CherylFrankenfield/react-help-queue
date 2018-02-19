import ticketListReducer from './../../src/reducers/ticket-list-reducer';

// describe('ticketListReducer', () => {
//
//   test('Temporary dummy test: two plus two is four', () => {
//     expect(2 + 2).toBe(4);
//   });
//
// });

describe('ticketListReducer', () => {

  test('Should return default state if no action type is recognized', () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
  });

});
