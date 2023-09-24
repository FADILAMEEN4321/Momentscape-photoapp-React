import React,{useContext, useEffect, useState}  from 'react'
import AuthContext from '../context/AuthContext';
import axios from 'axios';


const ProfilePage = () => {
  let { user } = useContext(AuthContext)
  const [userData, setUserData] = useState({
    username: user.username,
    bio: '',
    profile_image: '',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('bio', userData.bio);
    if (imageFile) {
      formData.append('profile_image', imageFile);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/update-profile/${user.user_id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        // Profile updated successfully
        alert('Profile updated successfully');
        // Fetch the updated user data and set it in state
        const {bio, profile_image } = response.data;
        setUserData({
          ...userData,
          bio,
          profile_image,
        });
        
        document.getElementById('my_modal_3').close();
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('Failed to update profile');
    }
  };

  console.log(userData.profile_image)

  
  useEffect(() => {
    // Fetch user profile data based on user ID
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user-profile/${user.user_id}`);
        if (response.status === 200) {
          
          const { username, bio, profile_image } = response.data;
          setUserData({
            username,
            bio,
            profile_image,
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [user.user_id]);




  return (
  <>
   <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
  {userData.profile_image ? (
            <img
              src={`${'http://127.0.0.1:8000/'+userData.profile_image}`}
              alt={`${userData.username}'s profile`}
              className="max-w-sm rounded-lg shadow-2xl"
            />
          ):(<img src="/fadil_profile.jpg" alt='' className="max-w-sm rounded-lg shadow-2xl" />)}
    
    <div>
      <h1 className="text-5xl font-bold">Iam, {userData.username}!</h1>
      {userData.bio ? (<p className="py-6">{userData.bio}</p>) :(<p>Update your bio</p>)}
    
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_3').showModal()}>Edit Bio</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Edit Bio</h3>
    <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  name="bio"
                  placeholder="Enter your bio"
                  className="textarea textarea-bordered"
                  value={userData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Image</span>
                </label>
                <input
                  type="file"
                  name="profile_image"
                  onChange={handleImageChange}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </form>
  </div>
</dialog>
    </div>
  </div>
</div>


  </>
  )
}

export default ProfilePage