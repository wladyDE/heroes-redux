import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { useHttp } from "../../hooks/http.hook";
import { heroCreated } from "../heroesList/heroesSlice";

const HeroesAddForm = () => {
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const heroNameRef = useRef(null);
    const heroDescriptionRef= useRef(null);
    const heroElementRef= useRef(null);
    const {request} = useHttp()
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault()

        const newHero = {
            id : uuidv4(),
            name : heroNameRef.current.value,
            description :  heroDescriptionRef.current.value,
            element : heroElementRef.current.value
        }

        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero))
            .then(data => dispatch(heroCreated(data)))
            .catch(error => console.log(error))

            heroNameRef.current.value = ''
            heroDescriptionRef.current.value = ''
            heroElementRef.current.value = ''
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Loading...</option>
        } else if (status === "error") {
            return <option>Loading Error</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New hero</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What is my name?"
                    ref={heroNameRef}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What can I do?"
                    style={{"height": '130px'}}
                    ref={heroDescriptionRef}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose heroes element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    ref={heroElementRef}
                >
                    <option >I wield the element...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;