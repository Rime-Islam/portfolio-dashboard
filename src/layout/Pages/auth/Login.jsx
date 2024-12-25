import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";




const Login = () => {

  const [logInError, setLogInError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation()
  
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLogInError('');
    setSuccess('');
//     signIn(email, password)
//     .then(result => {
//       console.log(result)
//       setSuccess('User Logged in Successfully.')
//       e.target.reset();
//       navigate(location?.state ? location.state : '/');
//   })
//   .catch(error => {
//       console.error(error)
//      setLogInError(error.message);
//   })
};




  return (
    <div>
      
      <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
      <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold mb-5">Login now!</h1>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
  
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="Enter Your Email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="Provide Valid Password" className="input input-bordered" required />
          
        </div>
        <div className="form-control mt-6">
         
        <button  className="btn btn-success">Login</button>
        </div>
      </form>
    <div className="text-center">
      {
        logInError && <p className="text-red-700">{logInError}</p>
      }
      {
        success && <p className="text-green-600">{success}</p>
      }
      

    </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Login;