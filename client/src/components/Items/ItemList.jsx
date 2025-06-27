import { useState, useContext } from 'react';
import { AppContext } from '../../Context/AppContext.jsx';
import { deleteItem } from '../../Service/ManageItems.js';
import toast from 'react-hot-toast';
import './ItemList.css';

const ItemList = ({setUpdateId}) => {
    const { items, setItems, setCategories } = useContext(AppContext);
    const [ searchItem, setSearchItem ] = useState("");
    
    const filteredItem = items.filter(item =>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    const handleDeleteItemById = async (itemId, categoryName) => {
        try {
            const response = await deleteItem(itemId);
            if (response.status === 204) {
                // Optionally, you can update the item state here to remove the deleted item
                const updatedItems = items.filter(item => item.itemId !== itemId);
                setItems(updatedItems);

                setCategories((prevCategories) => 
                    prevCategories.map((category) => category.name === categoryName ? {...category, itemCount: category
                        .itemCount - 1} : category)
                );

                // Display success message
                toast.success('Item deleted successfully');
            } else {
                // Display error message
                toast.error('Failed to delete item');
            }
            
        } catch (error) {
            console.error('Error deleting item:', error);
            // Display error message
            toast.error('Failed to delete item');
        }
    }

    
    const handleUpdateCategoryById = (id) => {
        setUpdateId(id);
    }

    return (
        <div className='category-list-container' style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="row pe-2">
                <div className="input-group mb-3">
                    <input type="text" 
                    name='keyword' 
                    id='keyword' 
                    placeholder='search by keyword' 
                    className='form-control' 
                    onChange={(e) => setSearchItem(e.target.value)}
                    value={searchItem}/>

                    <span className='input-group-text bg-warning'>
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>

            <div className="row g-3 pe-2">
                {filteredItem.map((item, index) => (
                <div key={index} className="col-12">
                    <div className="card p-2 bg-dark">
                        <div className="d-flex align-item-center justify-content-center">
                            <div style={{marginRight: '30px'}}>
                                <img src={item.imgUrl} alt={item.name} className="item-image" />
                            </div>
                            <div className="flex-grow-1">
                                <h5 className='mb-0 text-white'>{item.name}</h5>
                                <p className='mb-1 text-white'>
                                    Category: {item.categoryName}
                                </p>
                                <span className='mb-0 text-block rounded-pill text-bg-warning p-1'> 
                                    &#8377; {item.price}
                                </span>
                            </div>
                            <div className='d-grid gap-2'>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItemById(item.itemId, item.categoryName)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleUpdateCategoryById(item.itemId)}>
                                    <i className="bi bi-gear"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>  
                ))}
            </div>
        </div>    
    )
}

export default ItemList;