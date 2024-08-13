import { createSlice} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const filtersApi = createApi({
    reducerPath: 'filtersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (builder) => ({
        fetchFilters: builder.query({
            query: () => 'filters',
        }),
    }),
});

export const { useFetchFiltersQuery } = filtersApi;

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        filters: [],
        activeFilter: 'all',
    },
    reducers: {
        filtersChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            filtersApi.endpoints.fetchFilters.matchFulfilled,
            (state, action) => {
                state.filters = action.payload;
            }
        );
    },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
    filtersChanged
} = actions;