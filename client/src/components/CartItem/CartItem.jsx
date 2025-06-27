import './CartItem.css';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';

const CartItem = () => {
    const {cartItems, addToCart, removeFromCart, deleteItemFromCart} = useContext(AppContext);

    return (
        <div className="p-3 h-100 overflow-y-auto">
            {cartItems.length > 0 ? (
                    <div className="cart-items list">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item mb-3 p-3 bg-dark rounded">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="mb-1">{item.name}</h6>
                                    <p className="mb-0 fw-bold">&#8377; {item.price*item.quantity}</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-3">
                                        <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item)}>
                                            <i className="bi bi-dash"></i>
                                        </button>
                                        <span className="mt-1">{item.quantity}</span>
                                        <button className="btn btn-success btn-sm" onClick={() => addToCart(item)}>
                                            <i className="bi bi-plus"></i>
                                        </button>
                                    </div>
                                    <button className='btn btn-danger btn-sm' style={{width: "auto"}} onClick={() => deleteItemFromCart(item.itemId)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                <p className="text-light">Your cart is empty.</p>
            )}
        </div>
    )
}

export default CartItem;