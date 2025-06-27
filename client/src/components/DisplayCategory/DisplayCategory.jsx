import './DisplayCategory.css';
import Category from '../SingleCategory/Category.jsx';

const DisplayCategory = ({ categories, selectCategory, setSelectCategory }) => {
    return (
        <div className="row g-3" style={{width: '100%', margin: 0}}>
            {categories.map(category => (
                <div key={category.categoryId} className="col-md-3 col-sm-6 " style={{padding: '0 10px'}}>
                    < Category
                        categoryName={category.name}
                        imgUrl={category.imgUrl}
                        itemCount={category.itemCount}
                        bgColor={category.bgColor}
                        isSelected={selectCategory === category.name}
                        onClick={() => {

                            // If the category is already selected, unSelect it
                            if (selectCategory === category.name){
                                setSelectCategory(null);
                                return;
                            };
                            setSelectCategory(category.name)
                        
                        }}

                    />
                </div>
            ))}
        </div>
    )
}

export default DisplayCategory;