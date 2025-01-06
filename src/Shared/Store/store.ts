import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import animationComponentSLice from '../../Features/AnimationComponent/animationComponentSlice.ts';

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    animationComponentSLice: animationComponentSLice,
});

export const store = configureStore({
    reducer: rootReducer,
});

//Saving store to the window
// @ts-ignore
window.store = store;