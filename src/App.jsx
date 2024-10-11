import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import OrderConfirmation from "./Components/OrderConfirmation";

export const CreateContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [addressData, setAddressData] = useState(null)

  return (
    <Router>
      <CreateContext.Provider value={{ cartItems, setCartItems , addressData, setAddressData}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />}   />
          <Route path="/order-confirmation" element={<OrderConfirmation/>} />
        </Routes>
      </CreateContext.Provider>
    </Router>
  );
}

export default App;
