import { useState } from "react";
import { deleteUser } from "../../Service/ManageUsers.js";
import toast from "react-hot-toast";

const UserList = ({users=[], setUsers}) => {
    const [ searchUser, setSearchUser ] = useState("");

    const filteredUses = users.filter(user =>
        user.name.toLowerCase().includes(searchUser.toLowerCase())
    );

    const handleDeleteUserById = async (id) => {
        try {
            const response = await deleteUser(id);
            if (response.status === 204) {
                // Optionally, you can update the user state here to remove the deleted category
                const updateUsers = users.filter(user => user.userId !== id);
                setUsers(updateUsers);

                //dispalay toast message
                toast.success('user deleted successfully');
            } else {
                //display error toast message
                toast.error('Failed to delete user');
            }

        } catch (error) {
            console.error('Error deleting user:', error);
            //display error toast message
            toast.error('Failed to delete user');

        }
    }


  return (
    <div className='category-list-container' style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="row pe-2">
            <div className="input-group mb-3">
                <input type="text" 
                name='keyword' 
                id='keyword' 
                placeholder='search by name or email' 
                className='form-control' 
                onChange={(e) => setSearchUser(e.target.value)}
                value={searchUser}/>

                <span className='input-group-text bg-warning'>
                    <i className="bi bi-search"></i>
                </span>
            </div>
        </div>

        <div className="row g-3 pe-2">
            {filteredUses.map((user, index) => (
              <div key={index} className="col-12">
                <div className="card p-3 bg-dark">
                    <div className="d-flex align-item-center">
                        <div style={{marginRight: '20px'}}>
                            <span className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                                <i class="bi bi-person"></i>
                            </span>
                        </div>
                        <div className="flex-grow-1">
                            <h5 className='mb-1 text-white'>{user.name}</h5>
                            <p className='mb-0 text-white'>{user.email}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUserById(user.userId)}>
                                <i className="bi bi-trash"></i>
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

export default UserList;