import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import store from '../../store/index.js'
import { selectAll} from "../heroesFilters/filtersSlice.js";
import Spinner from '../spinner/Spinner.js'
import {filtersChanged, fetchFilters} from '../heroesFilters/filtersSlice.js'

const HeroesFilters = () => {   
    const {filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const filters = selectAll(store.getState())

    useEffect(() => {
        dispatch(fetchFilters())
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    }
    
    if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    if (filters.length === 0) {
        return <h5 className="text-center mt-5">There are no filters</h5>
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by elements</p>
                <div className="btn-group">
                    {filters.map(({label, name, className}) => {
                        return <button
                            className={`btn ${className} ${activeFilter === name ? 'active' : ''}`}
                            onClick={() => dispatch(filtersChanged(name))}
                            key={name}
                        >
                            {label}
                        </button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;