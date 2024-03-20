import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartState } from './CartProvider';
import Modal from '../screens/Modal';
import Cart from './Cart';


const Navbar = () => {
    const navigate = useNavigate();
    const cartState = useCartState();
    const [openModal, setOpenModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body sticky-top" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav ">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>


                            {
                                localStorage.getItem("authToken") ?
                                    (
                                        <div className='d-flex flex-column flex-md-col flex-lg-row'>
                                            <Link className="nav-link" to="/myOrders">My Orders</Link>

                                            <button className='btn btn-outline-light mx-2 py-1 position-relative'
                                                onClick={() => setOpenModal(true)} >
                                                Cart
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                                    style={{ fontSize: "12px" }}
                                                >
                                                    {cartState.length}
                                                    <span className="visually-hidden">Cart Items</span>
                                                </span>
                                            </button>
                                            {
                                                openModal &&
                                                <Modal onClose={()=>setOpenModal(false)}>
                                                    <Cart />
                                                </Modal>
                                            }
                                            <button className='btn btn-outline-light mx-2 text-danger py-1' onClick={handleLogout}>LogOut</button>
                                        </div>
                                    ) :
                                    (
                                        <div className='d-flex flex-column flex-md-col flex-lg-row'>
                                            <Link className="nav-link " to="/login">
                                                <button className='btn btn-outline-light mx-2 py-1'>Login</button>
                                            </Link>
                                            <Link className="nav-link" to="/signup">
                                                <button className='btn btn-outline-light mx-2 py-1'>Sign Up</button>
                                            </Link>
                                        </div>
                                    )

                            }

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar