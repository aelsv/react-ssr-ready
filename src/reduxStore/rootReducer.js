import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/* @Reducers */
import { appReducer } from './app/reducer';
import { userReducer } from './user/reducer';
import { themeReducer } from './theme/reducer';

export const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer,
    user: userReducer,
    theme: themeReducer,
  });
