import React, { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import HappyImage from '../../images/giphy.gif';
import { useNavigate } from 'react-router-dom';


const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    let navigate = useNavigate();

    const handleProceedToCheckout = () => {
        navigate('/shipment');
    };

    const handleRemoveProduct = (product_key) => {
        const newCart = cart.filter(pd => pd.key !== product_key);
        removeFromDatabaseCart(product_key);
        setCart(newCart);

    }
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });

        setCart(cartProducts);
    },[]);
    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem product={pd} handleRemoveProduct={handleRemoveProduct} key={pd.key} />)
                }
                {
                    orderPlaced && <img src={HappyImage} alt="" />
                }
            </div>
            <div className="cart-container">
                <Cart  cart={cart}>
                    <button onClick={handleProceedToCheckout} className="button-main"> Proceed To Checkout </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;