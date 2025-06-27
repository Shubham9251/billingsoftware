import { useContext, useState } from 'react';
import { AppContext } from '../../Context/AppContext.jsx';
import './Explore.css';
import DisplayCategories from '../../components/DisplayCategory/DisplayCategory.jsx';
import DisplayItems from '../../components/DisplayItem/DisplayItem.jsx';
import CustomerForm from '../../components/CustomerForm/CustomerForm.jsx';
import CartItem from '../../components/CartItem/CartItem.jsx';
import CartSummary from '../../components/CartSummary/CartSummary.jsx';


const Explore = () => {
    const {categories} = useContext(AppContext);
    const [selectCategory, setSelectCategory] = useState("");

    const [customerName, setCustomerName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
  
    return (
        <div className="explore-container text-light">
            <div className="left-column">
                <div className="first-row" style={{ overflowY: "auto"}}>
                    < DisplayCategories categories={categories}
                        selectCategory={selectCategory} 
                        setSelectCategory={setSelectCategory}
                    />
                </div>
                <hr className="horizantal-line" />
                <div className="second-row" style={{ overflowY: "auto"}}>
                    < DisplayItems 
                    selectCategory={selectCategory} />
                </div>
            </div>
            <div className="right-column d-flex flex-column">
                <div className="customer-form-container" style={{ height: "15%"}}>
                    < CustomerForm 
                        customerName={customerName} 
                        setCustomerName={setCustomerName}
                        mobileNumber={mobileNumber} 
                        setMobileNumber={setMobileNumber}
                    />
                </div>
                <hr className="my-2 text-light" />
                <div className="cart-items-container" style={{ height: "50%", overflowY: "auto"}}>
                    < CartItem />
                </div>
                <div className="cart-summary-container" style={{ height: "35%", overflowY: "auto"}}>
                    < CartSummary 
                        customerName={customerName} 
                        setCustomerName={setCustomerName}
                        mobileNumber={mobileNumber} 
                        setMobileNumber={setMobileNumber}
                    />
                </div>

            </div>
        </div>
        
    )
}

export default Explore;