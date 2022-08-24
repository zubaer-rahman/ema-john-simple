import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './Product.css';

const Product = (props) => {
    const {name, img, seller, stock, price }= props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name}</h4> 
                <br />
                <p><small>by: {seller} </small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                <button onClick={()=> props.handleAddProduct(props.product)} className='addToCart'><FontAwesomeIcon icon={faCartShopping} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;