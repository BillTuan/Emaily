const initialState = {};

export default function(state = initialState, action) {
  console.log("====================================");
  console.log(action);
  console.log("====================================");
  switch (action.type) {
    default:
      return state;
  }
}
