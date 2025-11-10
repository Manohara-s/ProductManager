import { Product } from '@/types/product'
import React from 'react'

function ProductForm({product}: {product?: Product}) {

    const isNew = product === null;

    return (
        <div>ProductForm</div>
    )
}

export default ProductForm