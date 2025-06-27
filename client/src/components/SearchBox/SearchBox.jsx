import { useState } from 'react';

const SearchBox = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleInputeChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        if (value.trim() !== "") {
            onSearch(value.trim());
        }
    }

    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search item.." value={searchText} onChange={handleInputeChange}/>

            <span className="input-group-text bg-warning">
                <i className="bi bi-search"></i>
            </span>
        </div>
    )
}

export default SearchBox;