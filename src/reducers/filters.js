const defaultFiltersState = {
  text: '',
  category: 'All',
  costType: 'All'
};

const filterReducer = (state = defaultFiltersState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        category: action.category
      };
    case 'SET_COST_FILTER':
      return {
        ...state,
        costType: action.costType
      };
    default:
      return state;
  }
};

export default filterReducer;
