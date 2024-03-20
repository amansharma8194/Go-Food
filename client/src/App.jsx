import './App.css'
import Home from './screens/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import CartProvider from './components/CartProvider'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.css'
// import '../node_modules/bootstrap/dist/js/bootstrap'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css'

// Bootstrap CSS
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import SignUp from './screens/SignUp';
import MyOrder from './screens/MyOrder'

function App() {

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/myOrders' element={<MyOrder />} />
        </Routes>
      </Router>
    </CartProvider>

  )
}

export default App
