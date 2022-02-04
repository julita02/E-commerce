import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

import directoryReducer from './directory/directory.reducer';

// object with a key from the root , passing to storage the whitelist property (an array containing the string names of a reducer that we want to store)
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory:directoryReducer
});


export default persistReducer(persistConfig, rootReducer);