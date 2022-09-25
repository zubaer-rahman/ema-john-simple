import React from 'react';

const ReviewItem = ({product, handleRemoveProduct}) => {
    const {key, name, quantity, price} = product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginLeft: '200px',
        marginBottom: '5px',
        paddingBottom: '5px'
    };

    return (
        <div style={reviewItemStyle} className='reviw-item'>
            <h4 className='product-name'> {name} </h4>
            <p> Quantity: {quantity} </p>
            <small>Price: ${price}</small>
            <br />
            <button onClick={() => handleRemoveProduct(key)} className='button-main'> Remove Item </button>
            
        </div>
    );
};

export default ReviewItem;