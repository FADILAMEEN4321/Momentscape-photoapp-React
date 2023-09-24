import React, {useState,useEffect,useContext} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2';
import AuthContext from '../context/AuthContext'





const AdminPage = () => {

    
    const { authTokens,logoutUser } = useContext(AuthContext);
    

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');



    useEffect(() => {

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authTokens?.access}`,
            };

        // Fetch the list of users when the component mounts
        Axios.get('http://127.0.0.1:8000/api/users/',{ headers })
            .then((response) => {
                console.log(response.data)
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                logoutUser();

            });
    }, [authTokens, logoutUser]);

    const handleDelete = (userId) =>{
  
        const confirmDeletion = window.confirm('Are you sure you want to delete this user?');

        if (confirmDeletion) {
            
            Axios
                .delete(`http://127.0.0.1:8000/api/users/${userId}/`)
                .then((response) => {
                    if (response.status === 204) {
                        // User successfully deleted
                        Swal.fire({
                            title: 'Success',
                            text: 'User deleted successfully',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                        // Optionally, you can update the user list to remove the deleted user
                        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                    } else {
                        // Handle other status codes or errors
                        alert('Failed to delete user');
                    }
                })
                .catch((error) => {
                    // Handle network errors or other exceptions
                    console.error('Error deleting user:', error);
                    alert('Failed to delete user');
                });
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Create a copy of the selectedUser and update its username property
        const updatedUser = { ...selectedUser, [name]: value };
    
        // Update the selectedUser state with the updated user object
        setSelectedUser(updatedUser);
    };


    const editUser = (e) => {
        e.preventDefault();
    
        // Define the data you want to send to the server for editing
        const userData = {
            username: selectedUser.username, // You can include other fields here as needed
        };
    
        // Make a PUT request to your Django API to update the user
        Axios
            .put(`http://127.0.0.1:8000/api/users_edit/${selectedUser.id}/`, userData)
            .then((response) => {
                if (response.status === 200) {
                    // User successfully updated
                    console.log(selectedUser.id)
                    alert('user updated successfully')
                    // Optionally, you can update the user list with the updated user data
                        setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user.id === selectedUser.id ? response.data : user
                        )
                    );

                    document.getElementById('my_modal_1').close();
                } else {
                    alert('Failed to update user')
                }
            })
            .catch((error) => {
                // Handle network errors or other exceptions
                console.error('Error updating user:', error);
               
            });
    };


    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );


    


  return (
    <>

<div className="navbar bg-neutral text-neutral-content">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Admin Panel</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" 
      placeholder="Search" 
      className="input input-bordered w-24 md:w-auto" 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </div>
</div>








<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Profile Photo</th>
        <th>Username</th>
        <th>Email</th>
        <th>Action</th>   
      </tr>
    </thead>
    <tbody>
          {filteredUsers.map((user) => (
                        <tr key={user.id}>
                               
                               <td>
                            {user.profile_image && (
                                <img
                            
                                src={`${user.profile_image}`}
                                alt={`${user.username}'s profile`}
                                className="w-16 h-16"
                                />
                            )}
                            </td>
                                <td>{user.username}</td>
                                <td>Fadilameen321@gmail.com</td>

                                <td>
                                   

                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn btn-primary btn-xs" onClick={()=>{
                        setSelectedUser(user);
                        document.getElementById('my_modal_1').showModal()
                    }
                        }>EDIT</button>
                    <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit</h3>
                        <form onSubmit={editUser}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input 
                            type="text" 
                            name="username" 
                            placeholder="username" 
                            className="input input-bordered"
                            value={selectedUser ? selectedUser.username : ''}
                            onChange={handleChange}
                            />
                            </div>
                            <button className="btn" type='submit'>Save</button>
                            </form>

                            
                        <div className="modal-action">
                        
                       
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                        </div>
                    </div>
                    </dialog>






                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="btn btn-warning btn-xs"
                                    >
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}


    </tbody>
    
    
  </table>
</div>
    </>
  )
}

export default AdminPage