import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Shop = () => {
    const first10  = fakeData.slice(0, 15);

    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    let totalPrice = cart.reduce((total, prd)=> total+prd.price, 0);
    let shippingCost =  totalPrice> 35?  0 : totalPrice > 15? 4.99 : totalPrice > 0? 12.99 : 0;
    let taxLessTotalPrice = totalPrice + shippingCost; 
    let tax = taxLessTotalPrice / 10;
    let grandTotal = taxLessTotalPrice + tax;
 
    const handleAddProduct = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };
    const toFixed = num => Number(num.toFixed(2));

    return (
        <div className='shop-container'>
            <div className="product-container">
                 
                {
                    products.map((prod, i) => <Product handleAddProduct = {handleAddProduct} key ={prod.key} product={prod} />)
                }
                 
            </div>
            <div className="cart-container">
                <h1>This is Cart</h1>
                <p>Items ordered {cart.length}</p>
                <p><small>Items: ${toFixed(totalPrice)} </small></p>
                <p><small>Shipping & Handling: ${shippingCost} </small></p>
                <p><small>Total before tax:	${taxLessTotalPrice} </small></p>
                <p><small>Estimated Tax: ${toFixed(tax)} </small></p>
                <p>Order Total: ${toFixed(grandTotal)} </p>
            </div>
          

        </div>
        
    );
};

export default Shop;