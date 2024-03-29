import React, { useEffect, useState } from 'react'
import ProductCard from '../../component/ProductCard'
import Categories from '../../component/Categories'

const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const respose = await fetch('https://fakestoreapi.com/products')
            const data = await respose.json()
            console.log(data)
            setProducts(data)
        }
        fetchProducts()
    }, [])
 
    return (
        <div>
            <Categories/>
            <div className="flex flex-col text-center w-full mt-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">PRODUCTS</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">ALL PRODUCT</h1>
             </div>
            {
                products.length > 0 ?
                <ProductCard products={products}/>
                :
                <div>Loading......</div>

            }
        </div>
    )
}
export default Products