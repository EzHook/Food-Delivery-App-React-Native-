import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slice/basketSlice';
import restaurantReducer from './slice/restaurantSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant : restaurantReducer,
  },
})