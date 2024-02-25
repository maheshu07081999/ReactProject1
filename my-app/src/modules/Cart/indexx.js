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
        const updatedCart = carts.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        navigate('/cart');
    }

    if (carts.length === 0) {
        return <div className='h-[55vh] flex justify-center text-4xl'>Cart is Empty</div>;
    }

    return (
        <div>
            <main className="container mx-auto my-auto h-screen">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="col-span-2 p-5">
                        <div className="cart flex justify-between">
                            <h2 className="text-xl font-bold">Shopping Cart</h2>
                            <h3 className="text-xl font-bold">{carts.length} Items</h3>
                        </div>
                        <hr className="border-black-300 text-center text-2xl mt-8" />
                        <div>
                            {
                                carts.map(cart => (
                                <div className="flex justify-between items-center mt-6 pt-6" key={cart.id}>
                                    <div className="flex items-center">
                                        <img className='h-24' src={cart.image} alt={cart.title} />
                                        <div className="flex flex-col ml-3">
                                            <span className="md:text-md font-medium">{cart.title}</span>
                                            <span className="text-sm font-light text-orange-400">{cart.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <div className="pr-8 flex">
                                            <span className="font-semibold cursor-pointer" onClick={() => removeProduct(cart.id)}>-</span>
                                            <input type="text" className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2" value={cart.quantity} />
                                            <span className='cursor-pointer' onClick={() => handleDec(cart.id)}>+</span>
                                        </div>
                                        <div className="pr-8">
                                            <span className="text-xs font-medium">${cart.price}</span>
                                        </div>
                                        <div><i className="fa fa-close text-xs font-medium"></i></div>
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
                                <span>{(total + 10).toFixed(2)}</span>
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
// import { NavLink, useNavigate } from 'react-router-dom'

// export default function Cart() {
//     const navigate = useNavigate()
//     const [total, setTotal] = useState(0)
//     const carts = JSON.parse(localStorage.getItem('cart')) || []

//     useEffect(() => {
//         const total = carts.reduce((acc, item) => {
//             return acc + (item.price = item.quantity)
//         }, 0)
//         setTotal(total)
//     }, [carts])

//     const handleInc = (id) => {
//         const updatedCart = carts.map(item => {
//             if (item.id === id) {
//                 return {
//                     ...item,
//                     quantity: item.quantity + 1
//                 }
//             }
//             return item
//         })
//         localStorage.setItem('cart', JSON.stringify(updatedCart))
//         navigate('/cart')
//     }

//     const handleDec = (id) => {
//         const updatedCart = carts.map(item => {
//             if (item.id === id) {
//                 return {
//                     ...item,
//                     quantity: item.quantity - 1
//                 }
//             }
//             return item
//         })
//         localStorage.setItem('cart', JSON.stringify(updatedCart))
//         navigate('/cart')
//     }
//     const removeProduct = (id) => {
//         const updatedCart = carts.filter(item => item.id !== id)
//         localStorage.setItem('cart', JSON.stringify(updatedCart))
//         navigate('/cart')
//     }
//     if (carts.length === 0) {
//         return <div calssNameName='h-[55vh] flex justify-center text-4xl'>Cart is Empty</div>
//     }

//     export default function cart() {
//         return (
//             <div>
//                 <main calssName="container mx-auto my-auto h-screen">
//                     <div calssName="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                         <div calssName="col-span-2 p-5">
//                             <div calssName="cart flex justify-between">
//                                 <h2 calssName="text-xl font-bold">Shoping Cart</h2>
//                                 <h3 calssName="text-xl font-bold">{carts?.length}Items</h3>
//                             </div>
//                             <hr calssName="border-black-300 text-center text-2xl mt-8" />
//                             <div>
//                                 {
//                                     carts?.map(cart => {
//                                         return (


//                                             <div calssName="flex justify-between items-center mt-6 pt-6">
//                                                 <div calssName="flex items-center">
//                                                     <img calssName='h-24' src={cart?.image} alt={catr?.title} />
//                                                     <div calssName="flex flex-col ml-3">
//                                                         <span calssName="md:text-md font-medium">{cart?.title}</span>
//                                     // <span calssName="text-xs font-light text-gray-400">#41551</span>
//                                                         <span calssName="text-sm font-light text-orange-400">{cart?.category}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div calssName="flex justify-center items-center">
//                                                     <div calssName="pr-8 flex">
//                                                         <span calssName="font-semibold cursor-pointer" onclick={() => removeProduct(cart?.id)}>-</span>
//                                                         <input type="text" calssName="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2" value="1" />
//                                                         <span className='cursor-pointer' onclick={() => handleDec(cart?.id)}>+</span>
//                                                     </div>
//                                                     <div calssName="pr-8">
//                                                         <span calssName="text-xs font-medium">${catr?.price}</span>
//                                                     </div>
//                                                     <div><i calssName="fa fa-close text-xs font-medium"></i></div>
//                                                 </div>
//                                             </div>
//                                         )
//                                     })
//                                 }

//                                 <div calssName="flex justify-between items-center mt-6 pt-6 border-t">
//                                     <NavLink to={"/products"} calssName="flex items-center">
//                                         <i calssName="fa fa-arrow-left text-sm pr-2 text-blue-500"></i>
//                                         <span calssName="text-md font-medium text-blue-500">Continue Shopping</span>
//                                     </NavLink>
//                                     <div calssName="flex justify-center items-center">
//                                         <span calssName="text-sm font-medium text-gray-400 mr-1"> Items{carts?.length}</span>
//                                         <span calssName="text-lg font-bold text-gray-800"> {total?.toFixed(2)}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div calssName="bg-gray-100 p-5 col-span-2 sm:col-span-1">
//                             <div calssName="checkout">
//                                 <h2 calssName="text-xl font-bold">Order Summary</h2>
//                                 <hr calssName="border-black-300 text-center text-2xl mt-8" />
//                                 <div calssName="flex justify-between mt-5 uppercase font-semibold">

//                                     <span>Items{carts?.length}</span>
//                                     <span>{total?.toFixed(2)}</span>
//                                 </div>
//                                 <div calssName="mt-5">
//                                     <span calssName="text-md font-medium uppercase">Shipping</span>
//                                     <div calssName="mt-2">
//                                         <div calssName="dropdown inline-block relative w-full">
//                                             <select calssName="bg-gray-300 text-gray-700 p-2 w-full inline-flex items-center justify-between rounded">
//                                                 <span calssName="mr-1">Select delivery</span>
//                                                 <svg calssName="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                                                     <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                                                 </svg>
//                                                 <option value="selected">Cash On Delivery</option>
//                                                 <option value="1">Pre-payment</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div calssName="my-5 items-star">
//                                     <span calssName="uppercase text-md font-medium">Promo code</span>
//                                     <input type="text" calssName="p-2 w-full mt-2 bg-gray-300 rounded" placeholder="Enter your code" />
//                                     <button calssName="py-2 px-6 bg-orange-400 text-white rounded mt-3">
//                                         Apply
//                                     </button>
//                                 </div>
//                                 <hr calssName="border-black-300 text-center text-2xl mt-8" />
//                                 <div calssName="flex justify-between mt-3 font-semibold">
//                                     <span calssName="uppercase">Total cost</span>
//                                     <span>{(total + 10).toFixed(2)}</span>
//                                 </div>
//                                 <button calssName="uppercase font-medium py-2 w-full bg-blue-500 text-white rounded mt-8">
//                                     checkout
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </main>

//             </div>
//         )
//     }
