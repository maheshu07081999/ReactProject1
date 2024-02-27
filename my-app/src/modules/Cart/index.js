import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const carts = JSON.parse(localStorage.getItem('cart')) || [];

    useEffect(() => {
        const total = carts.reduce((acc, item) => {
            return acc + (item.price * item.quantity); // Corrected calculation
        }, 0);
        setTotal(total);
    }, [carts]);

    const handleInc = (id) => {
        const updatedCart = carts.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        navigate('/cart');
    }

    const handleDec = (id) => {
        const updatedCart = carts.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        navigate('/cart');
    }
   
     

    const removeProduct = (id) => {
        const carts = JSON.parse(localStorage.getItem('cart')) ||[];
        const updatedCart = carts.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        navigate('/cart');
    }
  

    if (carts.length == 0) {
        return <div className='h-[55vh] flex justify-center text-4xl'>Cart is Empty</div>;
    }

     
    return (
        <div>
            <main className="container mx-auto my-auto h-100vh">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="col-span-2 p-5">
                        <div className="cart flex justify-between">
                            <h2 className="text-xl font-bold">Shopping Cart</h2>
                            <h3 className="text-xl font-bold">{carts.length} Items</h3>
                        </div>
                        <hr className="border-black-300 text-center text-2xl mt-8" />
                        <div>
                            {carts.map(cart => (
                                <div className="flex justify-between items-center mt-6 pt-6" key={cart.id}>
                                    <div className="flex items-center">
                                        <img className='h-24' src={cart.image} alt={cart.title} />
                                        <div className="flex flex-col ml-3">
                                            <span className="md:text-md font-medium">{cart.title}</span>
                                            <span className="text-sm font-width-500  text-orange-800">{cart.category}</span>



                                            <div className='flex flex-col justify-between ml-4 flex-grow'>
                                           
       
                                            <div className='font-semibold hover:text-red-500 text-gray-700 text-xs cursor-pointer text-bold' onclick={() =>removeProduct(cart?.id)}>Remove</div>
                                           </div>



                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <div className="pr-8 flex">
                                            <span className="font-semibold cursor-pointer" onClick={() => handleDec(cart.id)}>-</span>
                                            <input type="text" className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2" value={cart.quantity} />
                                            <span className='cursor-pointer' onClick={() => handleInc(cart.id)}>+</span>
                                        </div>
                                        <div className="pr-8">
                                            <span className="text-xs font-medium">${cart.price}</span>
                                        </div>
                                        <div><i className="fa fa-close text-xs font-medium"></i></div>
                                        <div className="pr-8">
                                        <span className="text-xs font-medium  cursor-pointer  hover:bg-pink-200"  onClick={() => removeProduct(cart.id)}> Remove </span>
                                    </div>
                                    </div>
                                </div>
                            ))
                            }
                            

                            <div className="flex justify-between items-center mt-6 pt-6 border-t">
                                <NavLink to="/products" className="flex items-center">
                                    <i className="fa fa-arrow-left text-sm pr-2 text-blue-500"></i>
                                    <span className="text-md font-medium text-blue-500">Continue Shopping</span>
                                </NavLink>
                                <div className="flex justify-center items-center">
                                    <span className="text-sm font-medium text-gray-400 mr-1">Items {carts.length}</span>
                                    <span className="text-lg font-bold text-gray-800"> {total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-5 col-span-2 sm:col-span-1">
                        <div className="checkout">
                            <h2 className="text-xl font-bold">Order Summary</h2>
                            <hr className="border-black-300 text-center text-2xl mt-8" />
                            <div className="flex justify-between mt-5 uppercase font-semibold">
                                <span>Items {carts.length}</span>
                                <span>{total.toFixed(2)}</span>
                            </div>
                            <div className="mt-5">
                                <span className="text-md font-medium uppercase">Shipping</span>
                                <div className="mt-2">
                                    <div className="dropdown inline-block relative w-full">
                                        <select className="bg-gray-300 text-gray-700 p-2 w-full inline-flex items-center justify-between rounded">
                                            <span className="mr-1">Select delivery</span>
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                            <option value="selected">Cash On Delivery</option>
                                            <option value="1">Pre-payment</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="my-5 items-star">
                                <span className="uppercase text-md font-medium">Promo code</span>
                                <input type="text" className="p-2 w-full mt-2 bg-gray-300 rounded" placeholder="Enter your code" />
                                <button className="py-2 px-6 bg-orange-400 text-white rounded mt-3">
                                    Apply
                                </button>
                            </div>
                            <hr className="border-black-300 text-center text-2xl mt-8" />
                            <div className="flex justify-between mt-3 font-semibold">
                                <span className="uppercase">Total cost</span>
                                <span>{(total).toFixed(2)}</span>
                            </div>
                            <button className="uppercase font-medium py-2 w-full bg-blue-500 text-white rounded mt-8">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}










// import React, { useEffect, useState } from 'react'
// import { NavLink , useNavigate } from 'react-router-dom'

// export default function Cart() {
//     const navigate=useNavigate()
//     const[total,setTotal]=useState(0)
//     const carts = JSON.parse(localStorage.getItem('cart')) || []

//         useEffect(()=>{
//             const total=carts.reduce((acc,item)=>{
//                 return acc +(item.price = item.quantity)
//             },0)
//             setTotal(total)
//         },[carts])

//     const handleInc=(id)=>{
//         const updatedCart=carts.map(item=>{
//             if(item.id===id){
//                 return{
//                     ...item,
//                     quantity:item.quantity + 1
//                 }
//             }
//             return item
//         })
//         localStorage.setItem('cart',JSON.stringify(updatedCart))
//         navigate('/cart')
//     }

//     const handleDec=(id)=>{
//         const updatedCart=carts.map(item =>{
//             if(item.id=== id){
//                 return{
//                     ...item,
//                     quantity:item.quantity - 1
//                 }
//             }
//             return item
//         })
//         localStorage.setItem('cart',JSON.stringify(updatedCart))
//         navigate('/cart')
//     }
//     const removeProduct=(id)=>{
//         const updatedCart =carts.filter(item=> item.id !== id)
//         localStorage.setItem('cart',JSON.stringify(updatedCart))
//         navigate('/cart')
//     }
//     if(carts.length===0){
//         return <div className='h-[55vh] flex justify-center text-4xl'>Cart is Empty</div>
//     }
//     // if (!carts.length) { return <h3>Cart Is Empty</h3> }

//     return (
//         <div className='container mx-auto mt-10'>
//             <div className='block shadow-md my-10'>
//                 <div className='w-3/4 bg-white px-10 py-10'>
//                     <div className='flex justify-between border-b pb-8'>
//                         <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
//                         <h2 className='font-semibold text-2xl'>{carts?.length}Items</h2>
//                     </div>
//                     <div className='flex mt-10 mb-5'>
//                         <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>Product Details</h3>
//                         <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Quantity</h3>
//                         <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Price</h3>
//                         <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Total</h3>
//                     </div>
//                     {
//                         carts?.map(cart => {
//                             return (
//                                 <div className='flex items-center hover:bg-gray-100 mx-8 px-6 py-5'>
//                                     <div className='flex w-2/5'>
//                                         <div className='w-20'>
//                                             <img className='h-24' src={cart?.image} alt={cart?.title} />
//                                         </div>
//                                         <div className='flex flex-col justify-between ml-4 flex-grow'>
//                                             <span className='font-bold text-sm'>{cart?.title}</span>
//                                             <span className='text-red-500 text-xs capitalies'>{cart?.category}</span>
//                                             <div className='font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer' onclick={() =>removeProduct(cart?.id)}>Remove</div>
//                                         </div>
//                                     </div>
//                                     <div className='flex justify-center w-1/5'>
//                                         <svg className='fill-current text-gray-600 w-3  cursor-pointer' viewBox='0 0 448 512' onclick={()=> handleDec(cart?.id)}><path d="M416 208H32c-17.67
//                             0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
//                                         </svg>

//                                         <input className='mx-2 border text-center w-8' type='text' value={cart?.quantity}/>

//                                         <svg className='fill-current text-gray-600 w-3 cursor-pointer'  onclick={()=> handleInc(cart?.id)} viewBox='0 0 448 512'><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32-c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32.
//                                                 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33
//                                                 32-32v304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
//                                         </svg>
//                                     </div>
//                                     <span className='text-center w-1/5 font font-semibold text-sm'>${cart?.price}</span>
//                                     <span className='text-center w-1/5 font font-semibold text-sm'>{cart?.price * cart?.quantity}</span>
//                                 </div>

//                             )
//                         })
//                     }

//                     <NavLink to={'/products'} className='flex font-semibold text-indigo-600 text-sm mt-10'>
//                         <svg className='fill-current mr-2 text-indigo-600 w-4' viewBox="0 0 448 512"> <path d="M13.059
//                                 296H436c6.627 0 12-5.373 12-12v56c0-6.627-5.373-12-12-12h134.059v-46.059c0-21.382-25.851-32.09-40.
//                                 971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-1.971V296z"/></svg>
//                         Continue Shopping
//                     </NavLink>
//                 </div>

//                 <div id='summary' className='w-1/4 px-8 py-10'>
//                     <h1 className='font-semibold text-2xl border-b pb-8'>Order Summary</h1>
//                     <div className='flex justify-between mt-10 mb-5'>
//                         <span className='font-semibold text-sm uppercase'>Item {carts?.length}</span>
//                         <span className='font-semibold text-sm'>{total?.toFixed(2)}</span>
//                     </div>
//                 </div>
//                 <div>
//                     <label className='font-medium inline-block mb-3 text-sm uppercase' htmlFor="promo">Shipping</label>
//                     <select className='block p-2 text-gray-600 w-full text-sm'>
//                         <option>Standard Shipping - $10.00</option>
//                     </select>
//                 </div>
//                 <div className='py-10'>
//                     <label htmlFor="promo" className='font-semibold inline-block mb-3 text-sm uppercase'>Promo Code</label>
//                     <input type='text' id='promo' placeholder='Enter Your Code' className='p-2 text-sm w-full' />
//                 </div>
//                 <button className='bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase'>Apply</button>
//                 <div className='border-t mt-8'>
//                     <div className='flex font-semibold justify-between py-6 text-sm text-white uppercase'>
//                         <span>Total Cost</span>
//                         <span>{(total + 10).toFixed(2)}</span>
//                     </div>
//                     <button className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'>Checkout</button>
//                 </div>
//             </div>
//         </div>

//     )
// }
