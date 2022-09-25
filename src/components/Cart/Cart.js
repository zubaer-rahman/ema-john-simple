import React from 'react';
import './Cart.css';

const Cart = (props) => {
    let cart = props.cart;
    let totalPrice = cart.reduce((total, prd)=> total + prd.price * prd.quantity, 0);
    debugger;
    let shippingCost =  totalPrice> 35?  0 : totalPrice > 15? 4.99 : totalPrice > 0? 12.99 : 0;
    let taxLessTotalPrice = totalPrice + shippingCost; 
    let tax = taxLessTotalPrice / 10;
    let grandTotal = taxLessTotalPrice + tax;
    const toFixed = num => Number(num.toFixed(2));

    return (
        <div>
            <h1>This is Cart</h1>
            <p>Items ordered {cart.length}</p>
            <p><small>Items: ${toFixed(totalPrice)} </small></p>
            <p><small>Shipping & Handling: ${shippingCost} </small></p>
            <p><small>Total before tax:	${taxLessTotalPrice} </small></p>
            <p><small>Estimated Tax: ${toFixed(tax)} </small></p>
            <p>Order Total: ${toFixed(grandTotal)} </p>
            {
                props.children              
            }
        </div>
    );
};

export default Cart;