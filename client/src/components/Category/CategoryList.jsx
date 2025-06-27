import { useState, useContext } from 'react';
import './CategoryList.css'
import { AppContext } from '../../Context/AppContext.jsx';
import { deleteCategory } from '../../Service/categoryService.js';
import toast from 'react-hot-toast';

const CategoryList = ({setUpdateId}) => {
    const {categories, setCategories, items, setItems} = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteCategoryById = async (id, name) => {
        try {
            const response = await deleteCategory(id);
            if (response.status === 204) {
                // Optionally, you can update the categories state here to remove the deleted category
                const updatecategory = categories.filter(category => category.categoryId !== id);
                setCategories(updatecategory);

                // also update the items state
                const updateItems = items.filter(item => item.categoryName !== name);
                setItems(updateItems);

                //dispalay toast message
                toast.success('Category deleted successfully');
            } else {
                //display error toast message
                toast.error('Failed to delete category');
            }

        } catch (error) {
            console.error('Error deleting category:', error);
            //display error toast message
            toast.error('Failed to delete category');

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
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}/>

                <span className='input-group-text bg-warning'>
                    <i className="bi bi-search"></i>
                </span>
            </div>
        </div>

        <div className="row g-3 pe-2">
            {filteredCategories.map((category, index) => (
              <div key={index} className="col-12">
                <div className="card p-2" style={{ backgroundColor: category.bgColor}}>
                    <div className="d-flex align-item-center justify-content-center">
                        <div style={{marginRight: '30px'}}>
                            <img src={category.imgUrl} alt={category.name} className="category-image" />
                        </div>
                        <div className="flex-grow-1">
                            <h5 className='mb-1 text-white'>{category.name}</h5>
                            <p className='mb-0 text-white'>{category.itemCount} items</p>
                        </div>
                        <div className='d-grid gap-2'>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCategoryById(category.categoryId, category.name)}>
                                <i className="bi bi-trash"></i>
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleUpdateCategoryById(category.categoryId)}>
                                <i className="bi bi-gear"></i>
                            </button>
                        </div>
                    </div>
                </div>
              </div>  
            ))}
        </div>
    </div>
  );
}

export default CategoryList;