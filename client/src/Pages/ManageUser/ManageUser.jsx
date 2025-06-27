import './ManageUser.css';
import UserForm from '../../components/Users/UserForm.jsx';
import { useEffect, useState } from 'react';
import UserList from '../../components/Users/UserList.jsx';
import { getUsers } from '../../Service/ManageUsers.js';
import toast from 'react-hot-toast';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const users = async () => {
            try {
                setLoading(true);
                const response = await getUsers();
                if (response.status === 200) {
                    setUsers(response.data);
                } else {
                    console.error("Failed to fetch users");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to fetch users");   
            }
            finally {
                setLoading(false);
            }
        }

        users().then(() => {
            console.log("Users fetched successfully");
        }).catch((error) => {
            console.error("Error in fetching users:", error);
            toast.error("Error in fetching users");
        });
    }, [])

    return (
         <div className="users-container text-light">
            <div className="left-column">
                <UserForm setUsers={setUsers}/>
            </div>
            <div className="right-column">
                <UserList users={users} setUsers={setUsers}/>
            </div>
        </div>
    )
}

export default ManageUser;