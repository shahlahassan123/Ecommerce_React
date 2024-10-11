import { createContext, useContext } from "react";
import { CreateContext } from "../App";

const OrderConfirmation = () => {
  const { cartItems, addressData } = useContext(CreateContext);


  return (
    <div className="w-screen h-screen justify-center content-center ">
      <div className="border-black P-[2rem]">
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
                <p>1</p>
                <p>$ {item.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
        {addressData && 
        <div className="text-center m-[1rem] text-xl">
          <h2 className="font-bold">Shipping Address:</h2>
            <p>{addressData.address}</p>
            <p>{addressData.city}, {addressData.state}, {addressData.zip}</p>
            <p>{addressData.country}</p>  
        </div>}
      </div>
    </div>
  );
};

export default OrderConfirmation;
