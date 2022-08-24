import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10  = fakeData.slice(0, 15);

    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
 
    const handleAddProduct = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    return (
        <div className='shop-container'>
            <div className="product-container"> 
                {
                    products.map((prod, i) => <Product handleAddProduct = {handleAddProduct} key ={prod.key} product={prod} />)
                }         
            </div>
            <div className="cart-container">
                <Cart cart= {cart}/>

            </div>
          

        </div>
        
    );
};

export default Shop;