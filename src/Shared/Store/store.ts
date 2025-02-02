import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import animationComponentSlice from '../../Features/AnimationComponent/animationComponentSlice';

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    animationComponentSlice: animationComponentSlice,
		// sketch: sketchSlice
});

export const store = configureStore({
    reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: true,
				immutableCheck: false,
				serializableCheck: false,
			}),
});

//Saving store to the window
// @ts-ignore
window.store = store;