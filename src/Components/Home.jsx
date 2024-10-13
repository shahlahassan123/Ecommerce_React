// import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CreateContext } from "./../App";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]); //[{category : [products]}]
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState([]);

  const { cartItems, setCartItems } = useContext(CreateContext);

  const navigate = useNavigate();

  useEffect(() => {
    //To fetch the list of categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (err) {
        console.log("Error getting categories", err);
      }
    };

    fetchCategories();
  }, []);

  //To show the products according to the category
  const fetchProductsPerCategory = async (categoryName) => {
    if (showCategories.includes(categoryName)) {
      setShowCategories(showCategories.filter((ele) => ele !== categoryName)); //Removing the category if already showing
    } else {
      setShowCategories([...showCategories, categoryName]); //adding the category if not showing
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${categoryName}`
        );
        setProducts((prevProd) => ({
          ...prevProd,
          [categoryName]: response.data,
        }));

        // console.log(showCategories);
      } catch (err) {
        console.log("Error getting products", err);
      }
    }
  };

  //Handle adding of products to cart
  const handleAddToCart = (prod) => {
    const isExistingProduct = cartItems.find(item => item.id === prod.id) 
    if(isExistingProduct){
      setCartItems(cartItems.map(item => item.id === prod.id ? {...item, qty: item.qty + 1} : item))
    }else{
      setCartItems([...cartItems, {...prod, qty: 1}]);
    }
   
  };

  const handleIncrementQty = prod =>{
    setCartItems(cartItems.map(item => item.id === prod.id ? {...item, qty: item.qty + 1} : item))
  }

  const handleDecrementQty = prod =>{
    setCartItems(cartItems.map(item => item.id === prod.id ? {...item, qty: item.qty - 1 } : item).filter(item=> item.qty >0))
  }

  // console.log("cc", cartItems);

  //If no catgories
  if (!categories.length > 0) {
    return (
      <div className="text-6xl w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto px-4 max-w-screen-xl">
      <div className="flex justify-between  m-[2rem] p-[1rem]">
        <h2 className=" w-screen text-6xl flex  mb-[2rem]   ">
          Shop Online
        </h2>
        <button  className="text-2xl"
        onClick={() => navigate("/cart")}><FaShoppingCart/></button>
      </div>

      {/* SHOWING LIST OF CATEGORIES */}
      {categories.map((category, ind) => {
        return (
          <div
            key={ind}
            className="flex flex-col justify-between m-[2rem] p-[1rem] shadow-md rounded-md"
          >
            <div
              onClick={() => fetchProductsPerCategory(category)}
              className="flex flex-row justify-between cursor-pointer"
            >
              <h2 className="text-4xl font-bold">{category.toUpperCase()}</h2>
              <h2
                className={`text-4xl transition-transform ${
                  showCategories.includes(category) ? "rotate-180" : ""
                }`}
              >
                V
              </h2>
            </div>
            {/* SHOWING PRODUCTS OF CLICKED CATEGORY */}
            {showCategories.includes(category) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
                {products[category]?.map((product, index) => {
                  const cartItem = cartItems.find(item=> item.id === product.id) //to display the qty as product doesnt have qty , only cartItems have
                  return (
                    <div key={index} className="flex flex-col  p-4 gap-[1rem]">
                      <p className="text-1xl font-bold overflow-hidden text-ellipsis h-20">
                        {product.title}
                      </p>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-[60%] object-contain"
                      />
                      <p className="text-1xl text-center">${product.price}</p>
                      {cartItem ?
                      <div className="flex w-[100%] justify-between">
                        <button   onClick={() => handleDecrementQty(product)}
                        className="border border-black p-2">-</button>
                        <p className="text-1xl">{cartItem.qty}</p>
                        <button  onClick={() => handleIncrementQty(product)}
                        className="border border-black p-2">+</button>

                      </div>
                      :
                      <button
                      onClick={() => handleAddToCart(product)}
                      className="w-[100%] border border-black p-2"
                    >
                      ADD TO CART
                    </button>
                      
                      }
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
