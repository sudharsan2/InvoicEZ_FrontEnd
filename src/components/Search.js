import * as React from "react";
import { Field, SearchBox } from "@fluentui/react-components";


const Search = ({ label = "", onSearchChange, ...props }) => {
    const searchstyle = {
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        marginLeft: "-2em",
        marginTop: "2em",
        marginBottom: "2em",
        padding: "20px",
        textDecoration:"none"

    };

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        onSearchChange(searchValue); 
        
    };

    return (
        <Field label={label} style={searchstyle}>
            <SearchBox {...props} onChange={handleSearchChange} />
        </Field>
    );
};


export default Search;
