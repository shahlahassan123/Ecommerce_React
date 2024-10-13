import { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CreateContext } from "../App";

const OrderConfirmation = () => {
  const { cartItems, customerData } = useContext(CreateContext);

  const location = useLocation();
  const { subTotal, discount, total } = location.state || {
    subTotal: 0,
    discount: 0,
    total: 0,
  };

  return (
    <div className="w-screen h-screen justify-center content-center  ">
      <div className="border border-black p-4 m-[2rem]">
        <h1 className="text-5xl font-bold text-center m-[1rem] ">
          ORDER CONFIRMED!!!{" "}
        </h1>
        <div className="flex flex-col gap-4 text-center m-[1rem]">
          <div className="grid grid-cols-3 gap-4 items-center text-2xl font-bold">
            <p>PRODUCT</p>
            <p>QTY</p>
            <p>PRICE</p>
          </div>
          {cartItems.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 items-center text-1xl "
              >
                <p>{item.title}</p>
                <p>{item.qty}</p>
                <p>$ {item.price.toFixed(2) * item.qty}</p>
              </div>
            );
          })}
          <div className="grid grid-cols-3 gap-4 items-center text-1xl">
            <p></p>
            <p className="font-bold">Subtotal : </p>
            <p>$ {subTotal.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center text-1xl">
            <p></p>
            <p className="font-bold">Discount : </p>
            <p>$ {discount.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center text-1xl">
            <p></p>
            <p className="font-bold">Total : </p>
            <p>$ {total.toFixed(2)}</p>
          </div>
        </div>
        {customerData && (
          <div className="text-center m-[1rem] text-1xl">
            <h2 className="font-bold">Customer Details:</h2>
            <p><b>Full Name :</b> {customerData.fullName}</p>
            <p><b>Email :</b>  {customerData.email}</p>
            <p><b>Address :</b>{customerData.address}</p>
            <p>
              {customerData.city}, {customerData.state}, {customerData.zip}
            </p>
            <p>{customerData.country}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
