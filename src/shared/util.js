// Generate a reducer function
export const reducerFactory = (actionHandlers = {}, defaultState = {}) =>
  (state = defaultState, action) => {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
  };