import { SAVE_DATA_DRINK, SAVE_DATA_FOOD } from '../../services/consts';

const INITIAL_STATE = {
  dataFood: {},
  dataDrink: {},
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_DATA_FOOD:
    return { ...state,
      dataFood: action.data,
    };
  case SAVE_DATA_DRINK:
    return { ...state,
      dataDrink: action.data,
    };
  default:
    return state;
  }
};

export default dataReducer;
