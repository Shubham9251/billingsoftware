import { useContext, useState } from 'react';
import {AppContext} from '../../Context/AppContext.jsx';
import SerarchBox from '../SearchBox/SearchBox.jsx';

import Item from './Item.jsx';

const DisplayItems = ({selectCategory}) => {
    const { items, setItems } = useContext(AppContext);
    const [ searchText, setSearchText ] = useState("");

    // Filter items based on search text also selected category
    // const filteredItems = items.filter(item => {
    //     const matchesCategory = selectCategory ? item.categoryName === selectCategory : true;
    //     const matchesSearch = searchText ? item.name.toLowerCase().includes(searchText.toLowerCase()) : true;
    //     return matchesCategory && matchesSearch;
    // })
    const filteredItems = items.filter(item => {
       return selectCategory ? item.categoryName === selectCategory : true;
    }).filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center">
                <div className='text-light'>Items</div>
                <div>
                    <SerarchBox onSearch={setSearchText} />
                </div>
            </div>
            <div className="row g-3">
                {filteredItems.map((item, index) => (
                    <div key={index} className="col-md-4 col-sm-6">
                        <Item 
                            itemName={item.name}
                            itemPrice={item.price}
                            itemImage={item.imgUrl}
                            itemId={item.itemId}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DisplayItems;