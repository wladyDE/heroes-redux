import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const heroesAdaptor = createEntityAdapter()

const initialState = heroesAdaptor.getInitialState({
    heroesLoadingStatus: 'idle'
})

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const { request } = useHttp()
        return await request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroCreated: (state, action) => { heroesAdaptor.addOne(state, action.payload) },
        heroDeleted: (state, action) => { heroesAdaptor.removeOne(state, action.payload) }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle'
                heroesAdaptor.setAll(state, action.payload)
            })
            .addCase(fetchHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = heroesSlice

export default reducer

const { selectAll } = heroesAdaptor.getSelectors(state => state.heroes)

//memorize the values with createSelector
export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if(filter === 'all'){
            return heroes
        } else {
            return heroes.filter(hero => hero.element === filter)
        }
    }
)

export const {
    heroCreated,
    heroDeleted
} = actions