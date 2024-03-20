import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card2 from '../components/Card2';

const MyOrder = () => {
    const [myOrders, setMyOrders] = useState([]);

    const getOrdersData = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/myOrdersData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": localStorage.getItem("userEmail")
                })
            });
            const data = await resp.json();
            setMyOrders(data);
        } catch (error) {
            console.log("---------Error while fetching Data in MyOrders.jsx ---------");
            console.log(error.message);
        }
    }
    useEffect(() => {
        getOrdersData();
    }, [])
    return (
        <>
            <Navbar />
            <div className="container">
                {
                    myOrders.length > 0 &&
                    myOrders.map((curOrder, curOrderind) => {
                        return (
                            <div key={curOrderind + 1}>
                                <h1 className='fs-3 m-3'>{curOrder.date}</h1>
                                <hr />
                                <div className="row">
                                    {
                                        curOrder.orders.map((foodItem) => {
                                            return (
                                                <Card2 
                                                    key={foodItem.id}
                                                    title={foodItem.name}
                                                    imgLink={foodItem.img}
                                                    qty={foodItem.qty}
                                                    size={foodItem.size}
                                                    cost={foodItem.price}
                                                />
                                            )

                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Footer />
        </>
    )
}

export default MyOrder