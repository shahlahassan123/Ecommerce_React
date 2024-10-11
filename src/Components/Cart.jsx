// import React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CreateContext } from "./../App";
import { AddressForm } from "./AddressForm";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CreateContext);
  const navigate = useNavigate()

  const addressFormRef = useRef()

  console.log("cc", cartItems);

  const subTotal = cartItems.reduce((s, item) => s + item.price, 0);

  const discount =0

  const total = subTotal - discount;

  const handleCheckOut =() =>{
    if(addressFormRef.current){
      addressFormRef.current.submitForm()
    }
    navigate("/order-confirmation")
  }

  return (
    <div className="w-screen h-screen max-w-screen-xl flex flex-col items-center relative  p-[2rem] ">
      {cartItems.length === 0 ? (
        <p className="font-bold text-3xl">No Products in the Cart !!! </p>
      ) : (
        <div className="flex flex-col items-end  mb-[4rem]">
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-12 items-center text-2xl font-bold">
              <p>IMAGE</p>
              <p>PRODUCT</p>
              {/* <p>QTY</p> */}
              <p>PRICE</p>
            </div>
            {cartItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <p>{item.title}</p>
                  {/* <p>1</p> */}
                  <p>$ {item.price.toFixed(2)}</p>
                </div>
              );
            })}
            <div className="grid grid-cols-3 gap-4 items-center ">
              <p className="font-bold ">SubTotal : </p>
              <p></p>
              <p className="font-bold">$ {subTotal.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center ">
              <p className="font-bold ">Discount : </p>
              <p></p>
              <p className="font-bold">$ {discount.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center ">
              <p className="font-bold ">Total : </p>
              <p></p>
              <p className="font-bold">$ {total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
      <AddressForm ref={addressFormRef} />
      <div className="w-screen p-4 flex items-end justify-center font-bold bg-black text-white ">
        <button onClick={()=>handleCheckOut()}>PROCCED TO CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;




