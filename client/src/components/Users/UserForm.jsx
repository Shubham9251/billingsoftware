import { useState } from "react";
import toast from "react-hot-toast";
import { createUser } from "../../Service/ManageUsers.js";

const UserForm = ({setUsers}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER"
    });

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

        try {
            const response = await createUser(data);
            if (response.status === 201) {
                toast.success("User created successfully!!");
                setUsers((prevUsers) => [...prevUsers, response.data]);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    role: "ROLE_USER"
                });
            } else {
                toast.error("Failed to create user");
            }
            
        } catch (error) {
            console.error("Error in user creation:", error);
            toast.error("Error creating user");
            
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
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name="name" id="name" placeholder="Jhon Deo" className="form-control" onChange={onChangeHandler} value={data.name}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" id="email" placeholder="example@gmail.com" className="form-control" onChange={onChangeHandler} value={data.email}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" id="password" placeholder="*********" className="form-control" onChange={onChangeHandler} value={data.password}/>
                            </div>
                            
                            <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading ? "loadin..." : "submit"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm;