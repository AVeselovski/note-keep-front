import React from 'react';


const Select = ({ tags = [] }) => {
    return (
        <div className="select-container">
            <select>
                {tags.map((tag, index) => <option value={tag} key={index}>{tag}</option>)}
            </select>
        </div>
    );
}

export default Select;
