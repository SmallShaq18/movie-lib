import React from 'react'

export default function ApiSearchBar({onSearch}) {

    return(
        <form className="d-flex align-items-center justify-content-center">
            <input type="text" placeholder="Search for movies..." className="p-2 inputt"
            onChange={(e) => onSearch(e.target.value)} autoFocus />
        </form>
    );
}