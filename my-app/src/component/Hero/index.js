import React, {useEffect,useState}from 'react'
import { useParams,useNavigate } from 'react-router-dom';

export default function Hero() {
   const idproduct=()=>{
    Math.floor(Math.random *10)
   }
  const [product, setProduct] = useState({})
    // console.log(id, 'id', product)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch (`https://fakestoreapi.com/products/3`)
            const data = await response.json();
            console.log(data)
            setProduct(data)
        }
        fetchProduct()
    }, [])

  return (
    <div>
     
    <section className="text-gray-600 body-font">
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"> 
          <br className="hidden lg:inline-block"/>{product?.title} 
        </h1>
        <p className="mb-8 leading-relaxed">{product?.description}</p>
        
      </div>
      <div className="lg:max-w-lg lg:w-50% md:w-1/2 w-5/6 ml-30">
        <img className="object-cover object-center rounded h-55" alt={product?.title} src={product?.image}/>
      </div>
    </div>
  </section>
    </div>
  )
}
