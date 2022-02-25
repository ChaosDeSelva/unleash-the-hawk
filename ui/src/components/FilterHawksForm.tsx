import React, { useState } from "react";
import { FilterIcon } from "@heroicons/react/solid";

export default function FilterHawksForm({ onFilterHawks }: { onFilterHawks: Function }) {
    const [filter, setFilter] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value)
    }

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        onFilterHawks(filter);
    }

    return (
        <div>
            <form className="flex space-x-4" onSubmit={handleSubmit}>
                <div className="flex-1 w-96 min-w-0 min-h-full">
                    <label htmlFor="filter" className="sr-only">
                        Filter
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <input
                            autoFocus
                            type="text"
                            name="filter"
                            id="filter"
                            data-testid="filterInput"
                            className="focus:ring-hawk-500 focus:border-hawk-500 block w-full px-3 py-2 border-gray-300 rounded-md"
                            placeholder="Filter"
                            value={filter}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button
                    title="Filter"
                    type="submit"
                    data-testid="filterButton"
                    className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hawk-500"
                >
                    <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="sr-only">Filter</span>
                </button>
            </form>
        </div>
    )
}
