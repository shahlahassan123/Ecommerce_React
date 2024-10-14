import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CreateContext } from "./../App";
import { CustomerForm } from "./CustomerForm";

const Cart = () => {
  const { cartItems, customerData } = useContext(CreateContext);
  const navigate = useNavigate();
  const customerFormRef = useRef();

  const subTotal = cartItems.reduce((s, item) => s + item.price * item.qty, 0);
  const discount = 0;
  const total = subTotal - discount;

  const handleCheckOut = () => {
    if (customerFormRef.current) {
      customerFormRef.current.submitForm(); // This triggers the form validation in CustomerForm
    }

    // console.log(customerData)

    if (customerData) { // This condition shows the form validation messages when we submit the form without the customerData
      navigate("/order-confirmation", {
        state: { subTotal, discount, total }, // Passing as states
      });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center relative p-[2rem]">
      {cartItems.length === 0 ? (
        <p className="font-bold text-3xl">No Products in the Cart !!!</p>
      ) : (
        <div className="overflow-x-auto m-[2rem] w-full">
          <table className="table-auto w-full text-center">
            <thead>
              <tr className="text-2xl font-bold">
                <th className="px-4 py-2">IMAGE</th>
                <th className="px-4 py-2">PRODUCT</th>
                <th className="px-4 py-2">QTY</th>
                <th className="px-4 py-2">PRICE</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain"
                    />
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.qty}</td>
                  <td className="px-4 py-2">
                    $ {(item.price * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td className="px-4 py-2 font-bold">SubTotal:</td>
                <td className="px-4 py-2 font-bold">$ {subTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className="px-4 py-2 font-bold">Discount:</td>
                <td className="px-4 py-2 font-bold">$ {discount.toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className="px-4 py-2 font-bold">Total:</td>
                <td className="px-4 py-2 font-bold">$ {total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <CustomerForm ref={customerFormRef} />
      <div className="w-screen p-4 flex items-center justify-center font-bold bg-black text-white mt-8">
        <button onClick={handleCheckOut}>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;
