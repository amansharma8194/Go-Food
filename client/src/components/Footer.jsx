import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="container">
      <footer className="">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
          <li className="nav-item"><Link to="/myOrders" className="nav-link px-2 text-white">My Orders</Link></li>
          
        </ul>
        <p className="text-center text-white">© 2024 GoFood, Inc</p>
      </footer>
    </div>
  )
}

export default Footer