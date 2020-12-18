/* @Constants */
import { SWITCH_THEME, LIGHT_THEME, DARK_THEME } from './constants';

const initialState = {
  theme: LIGHT_THEME,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME: {
      return {
        ...state,
        theme: state.theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME,
      };
    }

    default:
      return state;
  }
};
