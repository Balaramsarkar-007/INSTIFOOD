import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../feature/ItemSlice';

export const store = configureStore({
    reducer : {
        menuItems : menuReducer,
    }
});