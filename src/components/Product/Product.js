import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = ({product, showAddToCart, handleAddProduct}) => {
    const {name, key, img, seller, stock, price }= product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'> <Link to={'/product/'+key}> {name} </Link></h4> 
                <br />
                <p><small>by: {seller} </small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                {
                    showAddToCart && <button onClick={()=> handleAddProduct(product)} className='button-main'><FontAwesomeIcon icon={faCartShopping} /> add to cart </button>
                }
            </div>
        </div>
    );
};

export default Product;