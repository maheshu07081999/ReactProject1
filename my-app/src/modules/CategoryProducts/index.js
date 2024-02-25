import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../component/ProductCard'

function CategoryProducts() {
    const {name} =useParams([])
    const[products,setProducts]=useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const respose = await fetch(`https://fakestoreapi.com/products/category/${name}`)
            const data = await respose.json()
            console.log(data)
            setProducts(data)
        }
        fetchProducts()
    }, [])
    if(products.length ===0) return <div>Loading....</div>
  return (
    <div>
      <ProductCard products={products}/>
    </div>
  )
}

export default  CategoryProducts;
