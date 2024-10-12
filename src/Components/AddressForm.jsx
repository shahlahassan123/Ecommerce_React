import { useForm } from "react-hook-form";
import { forwardRef, useImperativeHandle, useContext } from "react";
import { CreateContext } from "../App";
import { useNavigate } from "react-router-dom";

export const AddressForm =forwardRef((props, ref) => {

 const {setAddressData} = useContext(CreateContext)
 const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      country: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setAddressData(data);  
  }

  useImperativeHandle(ref, ()=>({
    submitForm: handleSubmit(onSubmit) //  To make the Child's(AddressForm) function(handleSubmit(onSubmit)) available to the Parent(Cart)
  }))



  return (
    <form className="flex flex-col w-[100%] gap-[1rem] text-center m-[2rem]"
    onSubmit={handleSubmit(onSubmit)}>
      <input className="p-[1rem]"
        {...register("address", { required: "Address is Required!" })}
        placeholder="Address"
      ></input>
       {errors.address && (
        <span className="text-red-500 text-sm">{errors.address.message}</span>
      )}
     
      <input className="p-[1rem]"  {...register("country", { required: "Country is Required!" })}
      placeholder="Country"></input>

      <input className="p-[1rem]" 
        {...register("city", { required: "City is Required!" })}
        placeholder="City"
      ></input>

      <input className="p-[1rem]"  {...register("state", { required: "State is Required!" })}
       placeholder="State"></input>

      <input className="p-[1rem]" {...register("zip", { required: "Zip Code is Required!" })}
      placeholder="ZipCode"></input>

     
    </form>
  );
});


