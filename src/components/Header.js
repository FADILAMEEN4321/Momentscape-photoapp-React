import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
    let { user,logoutUser } = useContext(AuthContext) 
  return (

  <>
  <div className="navbar bg-base-300">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>HOME</a>
          </li>
          <li>
            <a>ABOUT US</a>
          </li>
          <li>
            <a>CONTACT US</a>
          </li>
          <li>
            <a>ADMIN</a>
          </li>
        </ul>
      </div>
      <a className="btn btn-ghost  normal-case text-xl">Momentscape</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li>
        <Link to="/">HOME</Link>
        </li>
        <li>
        <a>GALLERY</a>
        </li>
        <li>
          <a>ABOUT US</a>
        </li>
        <li>
          <a>CONTACT US</a>
        </li>
        {user && user.is_superuser && <li>
          <Link to="/admin_dashboard">ADMIN</Link>
        </li>}
      </ul>
    </div>
    <div className="navbar-end">
      {user? (<>
<button className="btn">
  <div className="badge badge-secondary">Hello,</div>
  {user.username}
</button>
      </>):(
      <>
      {/* <a className="btn" Link to="/login">Login</a> */}
      {/* <a className="btn" Link to="/signup">Signup</a> */}
      <Link to="/login" className="btn">Login</Link>
      <Link to="/signup" className="btn">Signup</Link>
      </>
      )}
    </div>
    
    
    {user && <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="/fadil_profile.jpg" />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
      <Link to="/profile" className="justify-between">Profile<span className="badge">New</span></Link>
   

        </li>
        <li><a onClick={logoutUser}>Logout</a></li>
      </ul>
    </div>}
    

  </div>






  {/* <div>
    {user ? (
      <>
        <p onClick={logoutUser}>Logout</p>
        <p>Hello {user.username}</p>
      </>
    ) : (
      <Link to="/login">Login</Link>
    )}
  </div> */}
</>
  )
}

export default Header