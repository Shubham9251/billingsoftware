import './ManageCategory.css';
import CategoryForm from '../../components/Category/CategoryForm.jsx';
import UpdateCategoryForm from '../../components/Category/UpdateCategoryForm.jsx';
import CategoryList from '../../components/Category/CategoryList.jsx';
import { useState } from 'react';

const ManageCategory = () => {
    const [updateId, setUpdateId] = useState(false);

    return (
        <div className="category-container text-light">
            <div className="left-column">
                { updateId ?
                    <UpdateCategoryForm updateId={updateId} setUpdateId={setUpdateId} />
                    :
                    <CategoryForm/>
                }
            </div>
            <div className="right-column">
                <CategoryList setUpdateId={setUpdateId}/>
            </div>
        </div>
    )
}

export default ManageCategory;