import {useState, useContext, useEffect} from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import toast from "react-hot-toast";
import {updateItem } from "../../Service/ManageItems.js";
import { assets } from "../../assets/logo.js";

const UpdateItemForm = ({updateId, setUpdateId}) => {
    const {items, setItems, categories } = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        price: 0,
        description: ""
    });

    useEffect(() => {
        if (updateId) {
            const item = items.find(item => item.itemId === updateId);
            if (data.name !== item.name ||
                data.description !== item.description ||
                data.bgColor !== item.bgColor) {

                setData({
                    name: item.name,
                    description: item.description,
                    price: item.price,
                });
            }
        } else {
            if (
                data.name !== "" ||
                data.description !== "" ||
                data.price !== 0
            ) {
                setData({
                    name: "",
                    description: "",
                    price: 0,
                });
                setImage(false);
            }   
        }
    // eslint-disable-next-line
    }, [updateId, items]);

    const onChangeHandler = (e) => {
        let value = e.target.value;
        const name = e.target.name;
        // Convert price to number if the field is 'price'
        if (name === "price") {
            // Convert to number if not empty
            value = value === "" ? "" : Number(value);
            
        }
        setData((data) => ({
            ...data,
            [name]: value,
        }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        const formData = new FormData();
        formData.append("item", JSON.stringify(data));

        if (image) {
            
            formData.append("file", image);
        }

        try {
            const response = await updateItem(updateId, formData);
            if (response.status === 200) {
                toast.success("Item update successfully");

                const updatedItems = items.map(item =>
                    item.itemId === updateId ? response.data : item
                );
                setItems(updatedItems);

                setData({
                    name: "",
                    price: 0,
                    description: ""
                });
                setImage(null);
            }
            else {
                console.log("Failed to update item");
            }
            
        } catch (error) {
            console.error("Error updating item:", error);
            toast.error("Failed to update item");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="item-form" style={{height: "100vh", overflowY: "auto", overflowX: "hidden"}}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-8 form-container">
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label" style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                        <img src={assets.uplodeIocn} alt="" width="48" />
                                        {image && (
                                            <span style={{fontSize: "0.9em", color: "#555"}}>
                                                {image.name}
                                            </span>
                                        )}
                                    </label>
                                    <input type="file" name="image" id="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0])}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name="name" id="name" placeholder="Product Name" className="form-control" onChange={onChangeHandler} value={data.name}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select name="categoryName" id="category" className="form-control" onChange={onChangeHandler} value={data.category}>
                                        <option value="">---Select Category---</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" name="price" id="price" placeholder="&#8377;200.00" className="form-control" onChange={onChangeHandler} value={data.price}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea rows={5} name="description" id="description" placeholder="Write Content here..." className="form-control" onChange={onChangeHandler} value={data.description}/>
                                </div>
                                <div className="d-flex justify-content-around align-items-center gap-5">
                                    <button type="submit" className="btn btn-warning w-50" disabled={loading}>{loading ? "loading..." : "update"}</button>
                                    <button type="button" className="btn btn-warning w-50" onClick={() => setUpdateId(false)}>Cancle</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateItemForm;