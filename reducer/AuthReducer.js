const reducer = (state, action) => {

    switch(action.type){
        case 'LOGIN':
            return {...state, data: action.payload};
        case 'REGISTER':
            return {...state, data: action.payload};
        case 'ERROR':
            return {...state, data: action.payload};
        default:
            return state

    }
  };
  
  export default reducer;
  