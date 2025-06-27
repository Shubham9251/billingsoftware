import { useContext, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import ReceiptPopup from '../../components/Receipts/ReceiptPopup.jsx';
import './CartSummary.css';
import { createOrder, deleteOrder } from '../../Service/OrderService.js';
import toast from 'react-hot-toast';
import { createRazorpayOrder, verifyPayment } from '../../Service/PaymentService.js';



const CartSummary = ({customerName, setCustomerName, mobileNumber, setMobileNumber}) => {
    const {cartItems, clearCart} = useContext(AppContext);

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subTotal * 0.18; // Assuming 18% tax
    const finalAmount = subTotal + tax;

    const clearAll = () => {
        setCustomerName("");
        setMobileNumber("");
        clearCart();
    }

    const placeOrder = () => {
        setShowPopup(true)
        clearAll();
    }

    const handlePrintReceipt = () => {
        window.print();
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        })
    }

    const deleteOrderOnFailure = async (orderId) => {
        try {
            const response = await deleteOrder(orderId);
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed deleting order process');
        }
    }

    const completePayment = async (paymentMode) => {
        if (!customerName || !mobileNumber) {
            toast.error('Please enter customer details');
            return;
        }

        if (cartItems.length === 0) {
            toast.error('Your Cart is empty');
            return;
        }

        const orderData = {
            customerName,
            phoneNumber: mobileNumber,
            orderItems: cartItems,
            subTotal,
            tax,
            finalAmount,
            paymentMethod: paymentMode.toUpperCase()
        }

        setIsProcessing(true);

        try {
            const response = await createOrder(orderData);
            const savedData = response.data;

            if (response.status === 201 && paymentMode === "cash") {
                toast.success('cash received successfully');
                setOrderDetails(savedData);
            }else if (response.status === 201 && paymentMode === "upi") {
                const razorpayLoaded = await loadRazorpayScript();

                if (!razorpayLoaded) {
                    toast.error('Razorpay SDK failed to load. Are you online?');
                    await deleteOrderOnFailure(savedData.orderId);
                    return;
                }

                // create a Razorpay order
                const razorResponse = await createRazorpayOrder({
                    amount: finalAmount,
                    currency: 'INR',
                    receipt: savedData.orderId,
                });

                const options = {

                    key: AppConstants.RAZORPAY_KEY_ID, // Replace with your Razorpay key ID
                    amount: razorResponse.data.amount,
                    currency: razorResponse.data.currency,
                    order_id: razorResponse.data.id,
                    name: 'My Retail Shop',
                    description: razorResponse.data.description || 'Order Payment',
                    handler: async (response) => {
                       await verifyPaymentHandler(response, savedData);
                    },
                    prefill: {
                        name: customerName,
                        contact: mobileNumber,
                    },
                    theme: {
                        color: '#3399cc',
                    },
                    model: {
                       ondismiss: async () => {
                            await deleteOrderOnFailure(savedData.orderId);
                            toast.error('Payment cancelled or failed');
                       } 
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', async (response) => {
                    await deleteOrderOnFailure(savedData.orderId);
                    toast.error('Payment failed');
                    console.error('Payment failed:', response.error.description);
                });
                rzp.open();
            }

        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Payment processing failed');
        }
        finally {
            setIsProcessing(false);
        }
    }

    const verifyPaymentHandler = async (response, savedOrder) => {
        try {
            const paymentData = {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                orderId: savedOrder.orderId
            };
            // Call your backend to verify the payment
            const verifyResponse = await verifyPayment(paymentData);
            if (verifyResponse.status === 200) {
                toast.success('payment successful');
                setOrderDetails({...savedData, 
                    paymentDetails: {
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature
                    }
                });
            } else {
                toast.error('payment verification failed');
                await deleteOrderOnFailure(savedData.orderId);
            }
        } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment failed');
        }
    }

    return (
        <div className="mt-1 ">
            <div className="cart-summary-details">
                <div className="d-flex justify-content-between mb-1">
                    <span className="text-light">Item: </span>
                    <span className="text-light">&#8377;{subTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                    <span className="text-light">Tax (18%): </span>
                    <span className="text-light">&#8377;{tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                    <span className="text-light">Total: </span>
                    <span className="text-light" style={{backgroundColor: "gray"}}>&#8377;{finalAmount.toFixed(2)}</span>
                </div>

                <div className="d-flex gap-4 mt-3">
                    <button className="btn btn-success flex-grow-1" 
                        onClick={() => completePayment("cash")}
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processing...": "CASH"}
                    </button>
                    <button className="btn btn-primary flex-grow-1"
                        onClick={() => completePayment("upi")}
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processing...": "UPI"}
                    </button>
                </div>  
                <div className="d-flex gap-3 mt-2">
                    <button className="btn btn-warning flex-grow-1" 
                        onClick={placeOrder}
                        disabled={isProcessing || !orderDetails}
                    >
                        Place Order
                    </button>
                </div>

                {
                    showPopup && (
                        <ReceiptPopup 
                            orderDetails={{
                                ...orderDetails,
                                razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
                                razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,

                            }}

                            onClose={() => setShowPopup(false)}
                            onPrint={handlePrintReceipt}

                        />
                    )
                }
            </div>
        </div>
    );
}

export default CartSummary;