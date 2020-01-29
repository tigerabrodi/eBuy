import React, { Fragment } from 'react';

const ProductSearch = ({onSubmit, onChange, text}) => {
    return (
        <Fragment>
        <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} placeholder="Search For Products" className="form-control bg-danger" />
        <input type="text" value="Search" className="btn btn-outline-danger my-3"/>
        </form>
        </Fragment>
    );
}

export default ProductSearch;