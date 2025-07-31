import React from 'react'

export default function LocalSearchBar({filterText, onFilterTextChange}) {

    return(
        <form className="d-flex align-items-center justify-content-center">
            <input type="text" value={filterText} placeholder="Search for movies..." className="p-2 inputt"
            onChange={(e) => onFilterTextChange(e.target.value)} autoFocus />
        </form>
    );

}