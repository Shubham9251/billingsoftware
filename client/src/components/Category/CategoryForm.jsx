import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import toast from 'react-hot-toast';
import { createCategory } from "../../Service/categoryService.js";
import { assets } from "../../assets/logo.js";

const CategoryForm = () => {
    const { categories, setCategories } = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
    });

    useEffect(() => {
        console.log(data);
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
        if (!image) {
            toast.error("Please select an image");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("category", JSON.stringify(data));
        formData.append("file", image);

        try {
            const response = await createCategory(formData);
  
            if (response.status === 201) {
               setCategories([...categories, response.data]);
                toast.success("Category created successfully");
                setData({
                    name: "",
                    description: "",
                    bgColor: "#2c2c2c",
                });
                setImage(false);
            }
        } catch (error) {
            console.error("Error in category creation:", error);
            toast.error("Error creating category");
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
                            <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading ? "loading..." : "submit"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm;