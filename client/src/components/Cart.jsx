import React from 'react'
import { useCartDispatch, useCartState } from './CartProvider'

const Cart = () => {
    const cartState = useCartState();
    const cartDispatch = useCartDispatch();
    const totalPrice = cartState.reduce((acc, current) => acc + current.price, 0);

    const handleCheckOut = async ()=> {
        try {
            const resp = await fetch('http://localhost:3000/api/orderData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                "email": localStorage.getItem("userEmail"),
                "date": new Date().toDateString(),
                "orderData": cartState
            })
        });
        if(resp.status === 200){
            cartDispatch({"type": "DROP"});
        }
        } catch (error) {
            console.log("------ Error while fetching order data ------");
            console.log(error.message);            
        }
    }

    return (
        <div>

            {
                cartState.length > 0 ?
                    <div className='container m-auto mt-2 table-responsive  table-responsive-sm table-responsive-md' >
                        <table className='table table-dark table-hover '>
                            <thead className=' text-success fs-4'>
                                <tr className='table-info'>
                                    <th scope='col' >#</th>
                                    <th scope='col' >Name</th>
                                    <th scope='col' >Quantity</th>
                                    <th scope='col' >Option</th>
                                    <th scope='col' >Amount</th>
                                    <th scope='col' ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartState.map((food, index) => (
                                    <tr key={food.id}>
                                        <th scope='row' >{index + 1}</th>
                                        <td >{food.name}</td>
                                        <td>{food.qty}</td>
                                        <td>{food.size}</td>
                                        <td>{food.price}</td>
                                        <td >
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => { cartDispatch({ type: "REMOVE", payload: { "index": index } }) }} > Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                        <div>
                            <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                        </div>
                    </div> :
                    <p className='text-center fs-2'>Cart is Empty. Add Items to buy them.</p>

            }

        </div>
    )
}

export default Cart