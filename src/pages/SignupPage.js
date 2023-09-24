import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



const SignupPage = () => {
    const navigate = useNavigate()

    const [formname, setFormname] = useState('')
    const [formpassword1, setFormpassword1] = useState('')
    const [formpassword2, setFormpassword2] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Update the state based on the input field name
        if (name === 'username') {
          setFormname(value);
        } else if (name === 'password1') {
          setFormpassword1(value);
        } else if (name === 'password2') {
          setFormpassword2(value);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formname.trim()===''){
          return Swal.fire({
              title: 'Error',
              text: "Enter username !", 
              icon: 'error',
              confirmButtonText: 'OK',
          });
      }
        
      if(formpassword1.trim()==='' || formpassword2.trim()===""){
        return Swal.fire({
            title: 'Error',
            text: "Enter a strong password !", 
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }



        if(formpassword1!==formpassword2){
            return Swal.fire({
                title: 'Error',
                text: "Passwords not matching", 
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }



        let formData = {
            username:formname,
            password:formpassword1
        }
        console.log(formData)
        
        let response = await fetch('http://127.0.0.1:8000/api/signup/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        let data = await response.json()
        console.log(data)
        if (response.status === 201){
            // Registration was successful
                Swal.fire({
                    title: 'Success',
                    text: 'Account created successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    // Redirect to the login page after the user clicks 'OK'
                    navigate('/login');
                });
        }else if(data.username){
                    // Display an alert with the username error message
            Swal.fire({
                title: 'Error',
                text: data.username, // Display the username error message
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }else{
            alert('somethingwrong')
        }


      };

  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Join MomentScape</h1>
      <p className="py-6">Start Your Creative Journey Today!</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input 
          type="text" 
          name="username" 
          placeholder="username" 
          className="input input-bordered"
          value={formname}
          onChange={handleChange} required/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input 
          type="password" 
          name="password1" 
          placeholder="password" 
          className="input input-bordered"
          value={formpassword1}
          onChange={handleChange} required/>
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input 
          type="password" 
          name="password2" 
          placeholder="password" 
          className="input input-bordered"
          value={formpassword2}
          onChange={handleChange} required/>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type='submit'>Signup</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default SignupPage