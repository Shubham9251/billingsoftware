import { getDashboardData } from '../../Service/Dashboard.js';
import './Dashboard.css'
import {useState, useEffect} from 'react';
import toast from 'react-hot-toast';

const Deshboard = () => {
    const [ordersData, setOrdersData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadingData() {

            try {
                const response = await getDashboardData();
                if (response.status === 200) {
                    setOrdersData(response.data)
                }
            } catch (error) {
                console.log(error);
                toast.error("Unable to view the data")
            } finally {
                setLoading(false)
            }
        };

        loadingData();
    }, [])

    if (loading) {
        return <div className="loading">Loading dashboard...</div>
    }

    return (
        <div className='dashboard-wrapper'>
            <div className="dashboard-container">
                <h2 className="dashboard-title"></h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-currency-rupee"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Today's Sales</h3>
                            <p>{ordersData.todaySales.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-cart-check"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Today's Orders</h3>
                            <p>{ordersData.todayOrderCount}</p>
                        </div>
                    </div>
                </div>

                <div className="recent-orders-card">
                    <h3 className="recent-orders-title">
                        <i className="bi bi-clock-history"></i>
                        Recent Orders
                    </h3>

                    {ordersData ? (<div className="orders-table-container">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>PaymentMethod</th>
                                    <th>Status</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersData.recentOrders.map((order) => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId.substring(0,8)}...</td>
                                        <td>{order.customerName}</td>
                                        <td>&#8377; {order.finalAmount.toFixed(2)}</td>
                                        <td>
                                            <span className={`payment-method ${order.paymentMethod.toLowerCase()}`}>
                                                {order.paymentMethod}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${order.paymentDetails.status.toLowerCase()}`}>
                                                {order.paymentDetails.status}
                                            </span>
                                        </td>
                                        <td>
                                            {new Date(order.createdAt).toLocaleDateString([], {
                                                hour: '2-digit',
                                                minite: '2-digite'
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>) : (
                        <div className="error">Failed to load the dashboard data...</div>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default Deshboard;