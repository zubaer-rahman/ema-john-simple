import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {

    const {product_key} = useParams();
    const product = fakeData.find(pd => pd.key === product_key);
    return (
        <div>
            <h1> Your product details </h1>
            <Product product={product} showAddToCart={false} />
        </div>
    );
};

export default ProductDetail;