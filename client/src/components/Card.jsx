import React, { useEffect, useRef, useState } from 'react'
import { useCartDispatch, useCartState } from './CartProvider';

const Card = ({data}) => {
    const optionsKeys = Object.keys(data.options[0]);
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const cartDispatch = useCartDispatch();
    let cartState = useCartState();
    let totalCost = qty * data.options[0][size];

    const handleAddToCart = async ()=>{ 
        for(let foodItem in cartState){
            if(data._id === cartState[foodItem].id && size===cartState[foodItem].size && qty!==cartState[foodItem].qty){
                await cartDispatch({type: 'UPDATE', payload: {
                    id: data._id,
                    qty: qty,
                    price: totalCost
                }});
                // console.log("update", data._id, qty);
                return;
            }
        }
        // console.log("state", cartState);
        // console.log("data", data);
        await cartDispatch({type: 'ADD' , payload: {
            id: data._id,
            name: data.name,
            img: data.img,
            qty: qty,
            size: size,
            price: totalCost
        }});
    }
    useEffect(()=>{
        setSize(priceRef.current.value);
    }, []);

    return (
            <div className="card border border-success bg-dark text-white border-2 p-2" style={{ "width": "16rem" }} >
                <img 
                    src={data.img} 
                    className="card-img-top" 
                    alt="..."
                    style={{height:"10rem", "objectFit": "fill"}}
                    />
                <div className="card-body">
                    <h5 className="card-title fs-5">{data.name}</h5>
                    <p className="card-text">{data.description.slice(0, 50)}...</p>
                </div>
                <div>
                    <div className='d-inline'>
                        <select className='m-2 rounded bg-dark text-white' onChange={(e)=>setQty(e.target.value)}>

                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                    </div>
                    <div className='d-inline '>
                        <select className='m-2 w-40 rounded bg-dark text-white' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {
                                optionsKeys.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))
                            }
                        </select>
                    </div>
                    <p className='d-inline m-2 fs-5'> ₹{totalCost}/-</p>
                </div>
                <hr />
                <button className='btn btn-success m-2' onClick={handleAddToCart}>Add to Cart</button>
            </div>
    )
}

export default Card