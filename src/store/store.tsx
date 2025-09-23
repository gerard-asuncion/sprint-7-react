import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './moviesSlice'
import movieDetailReducer from './moviesDetailSlice'

const store = configureStore({
	reducer: {
		movies: moviesReducer,
		movieDetail: movieDetailReducer
	}
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
