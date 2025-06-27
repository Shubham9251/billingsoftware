import './Category.css';

const Category = ({ categoryName, imgUrl, itemCount, bgColor, isSelected, onClick }) => {
    return (
        <div className="d-flex align-item-center p-2 rounded gap-1 position-relative category-hover"
            style={{ backgroundColor: bgColor, cursor: 'pointer' }}
            draggable="true" onClick={onClick}>

            <div style={{position: 'relative', marginRight: '20px'}}>
                <img src={imgUrl} alt={categoryName} className="category-image"/>
            </div>
            <div className="d-flex flex-column justify-content-center">
                <h6 className="text-white mb-0">{categoryName}</h6>
                <p className="text-white mb-0">{itemCount} items</p>
            </div>
            {isSelected && (
                <div className="active-category" style={{ width: '10px', height: '10px' }}></div>
            )}
        </div>
    )
}

export default Category;