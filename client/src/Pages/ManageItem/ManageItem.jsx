import './ManageItem.css';
import ItemForm from '../../components/Items/ItemForm.jsx';
import UpdateItemForm from '../../components/Items/UpdateItemForm.jsx';
import ItemList from '../../components/Items/ItemList.jsx';
import { useState } from 'react';


const ManageItem = () => {
    const [updateId, setUpdateId] = useState(false);

    return (
         <div className="items-container text-light">
            <div className="left-column">
                { updateId ?
                    <UpdateItemForm updateId={updateId} setUpdateId={setUpdateId} />
                    :
                    <ItemForm />
                }
                
            </div>
            <div className="right-column">
                <ItemList setUpdateId={setUpdateId}/>
            </div>
        </div>
    )
}

export default ManageItem;