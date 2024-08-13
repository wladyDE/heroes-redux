import { configureStore } from '@reduxjs/toolkit';

import filters from '../components/heroesFilters/filtersSlice'
import { apiSlice } from '../api/apiSlice';
import { filtersApi } from '../components/heroesFilters/filtersSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: {
        filters,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [filtersApi.reducerPath] : filtersApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware, filtersApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;