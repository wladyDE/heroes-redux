import { useSelector, useDispatch } from "react-redux";

import Spinner from '../spinner/Spinner.js'
import {filtersChanged} from '../heroesFilters/filtersSlice.js'
import { useFetchFiltersQuery } from "../heroesFilters/filtersSlice.js";

const HeroesFilters = () => {   
    const {activeFilter } = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const { data: filters, isError, isLoading } = useFetchFiltersQuery();

    if (isLoading) {
        return <Spinner />;
    }
    
    if (isError) {
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