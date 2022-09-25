import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10  = fakeData.slice(0, 15);

    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let savedCart = getDatabaseCart();
        let productKeys = Object.keys(savedCart);
        let previousCart = productKeys.map(existing_key => {
            let product = fakeData.find(pd => pd.key === existing_key);
            product.quantity = savedCart[existing_key];
            return product;
        });
         
        setCart(previousCart);

    }, []);
 
    const handleAddProduct = (product) => {
        const ToBeAddedKey = product.key;
        let sameProduct = cart.find(pd=> pd.key === ToBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            let others = cart.filter(pd => pd.key !== ToBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count); 
    };

    return (
        <div className='twin-container'>
            <div className="product-container"> 
                {
                    products.map((prod, i) => <Product handleAddProduct = {handleAddProduct} showAddToCart={true} key ={prod.key} product={prod} />)
                }         
            </div>
            <div className="cart-container">
                <Cart cart= {cart}> 
                    <Link to={"/review"}> <button className="button-main"> Review Order </button></Link>
                </Cart>

            </div>
          

        </div>
        
    );
};

export default Shop;