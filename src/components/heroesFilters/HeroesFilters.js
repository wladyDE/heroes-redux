import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { useHttp } from '../../hooks/http.hook'
import Spinner from '../spinner/Spinner.js'
import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from "../../actions";

const HeroesFilters = () => {
    const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
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
                            onClick={() => dispatch(activeFilterChanged(name))}
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