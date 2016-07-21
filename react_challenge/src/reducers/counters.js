const initialState = {
  counters: [],
  message: 'Hi from Redux'
};

export function counters(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
