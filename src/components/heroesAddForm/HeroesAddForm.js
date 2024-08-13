import { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

import { useCreateHeroMutation } from "../../api/apiSlice.js";
import { useFetchFiltersQuery } from "../heroesFilters/filtersSlice.js";

const HeroesAddForm = () => {
    const heroNameRef = useRef(null);
    const heroDescriptionRef = useRef(null);
    const heroElementRef = useRef(null);

    const [createHero] = useCreateHeroMutation()

    const { data: filters, isError, isLoading } = useFetchFiltersQuery();

    const handleSubmit = (event) => {
        event.preventDefault()

        const newHero = {
            id: uuidv4(),
            name: heroNameRef.current.value,
            description: heroDescriptionRef.current.value,
            element: heroElementRef.current.value
        }

        createHero(newHero).unwrap()

        heroNameRef.current.value = ''
        heroDescriptionRef.current.value = ''
        heroElementRef.current.value = ''
    }

    const renderFilters = (filters, isLoading, isError) => {
        if (isLoading) {
            return <option>Loading...</option>
        } else if (isError) {
            return <option>Loading Error</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                if (name === 'all') return;

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
                    style={{ "height": '130px' }}
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
                    {renderFilters(filters, isLoading, isError)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;