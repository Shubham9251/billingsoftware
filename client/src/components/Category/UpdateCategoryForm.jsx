import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import toast from 'react-hot-toast';
import { updateCategory } from "../../Service/categoryService.js";
import { assets } from "../../assets/logo.js";

const UpdateCategoryForm = ({updateId, setUpdateId}) => {

    const { categories, setCategories } = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
    });

    useEffect(() => {
        if (updateId) {
            const category = categories.find(cat => cat.categoryId === updateId);
            if (data.name !== category.name ||
                data.description !== category.description ||
                data.bgColor !== category.bgColor) {

                setData({
                    name: category.name,
                    description: category.description,
                    bgColor: category.bgColor,
                });
            }
        } else {
            if (
                data.name !== "" ||
                data.description !== "" ||
                data.bgColor !== "#2c2c2c"
            ) {
                setData({
                    name: "",
                    description: "",
                    bgColor: "#2c2c2c",
                });
                setImage(false);
            }   
        }
    // eslint-disable-next-line
    }, [updateId, categories]);

    useEffect(() => {
        console.log("Update Category Form Data:", data);
    }, [data]);

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({
            ...data,
            [name]: value,
        }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        const formData = new FormData();
        formData.append("category", JSON.stringify(data));
        if (image) {
            formData.append("file", image);
        }

        try {
            const response = await updateCategory(updateId, formData);
  
            if (response.status === 200) {
                const updatedCategories = categories.map(cat =>
                    cat.categoryId === updateId ? response.data : cat
                );
                setCategories(updatedCategories);
                toast.success("Category update successfully");
                setData({
                    name: "",
                    description: "",
                    bgColor: "#2c2c2c",
                });
                setImage(false);
            }
        } catch (error) {
            console.error("Error in category update:", error);
            toast.error("Error updating category");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-8 form-container">
                    <div className="card-body">
                        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    <img src={assets.uplodeIocn} alt="" width="48"/>
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
                                <input type="text" name="name" id="name" placeholder="Category name" className="form-control" onChange={onChangeHandler} value={data.name}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea rows={5} name="description" id="description" placeholder="Write Content here..." className="form-control" onChange={onChangeHandler} value={data.description}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgColor" className="form-label">Background Color</label> <br />
                                <input type="color" rows={5} name="bgColor" id="bgColor" placeholder="#ffffff" onChange={onChangeHandler} value={data.bgColor}/>
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
    )
}

export default UpdateCategoryForm;