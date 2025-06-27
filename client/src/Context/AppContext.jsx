import { createContext, useEffect, useState } from "react";
import { getCategories } from "../Service/categoryService.js";
import { getItems } from "../Service/ManageItems.js";
import toast, { resolveValue } from "react-hot-toast";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    }
    else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  }

  const removeFromCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem && existingItem.quantity > 1) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      ));
    } else {
      setCartItems(cartItems.filter(cartItem => cartItem.name !== item.name));
    }
  }

  const clearCart = () => {
    setCartItems([]);
  }

  const deleteItemFromCart = (itemId) => {
    setCartItems(cartItems.filter(cartItem => cartItem.itemId !== itemId));
  }

  useEffect(() => {
    console.log("Auth in AppContext.jsx", auth);
  }, [auth]);

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token && role) {
        setAuth({
          token: token,
          role: role
        });
        
      }
    
      const response = await getCategories();
      const itemResponse = await getItems();


     
      if (!response.status === 200 || !itemResponse.status === 200) {
        throw new Error('Failed to fetch data');
      }
      setCategories(response.data);
      setItems(itemResponse.data);

    }

    loadData()
      .then(() => {
        console.log("Data loaded successfully");
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        toast.error("Failed to load data");
      });
  }, []);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  }


  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    items,
    setItems,
    addToCart,
    cartItems,
    removeFromCart,
    clearCart,
    deleteItemFromCart
  };

  return <AppContext.Provider value={contextValue}>
    {props.children}
  </AppContext.Provider>
}