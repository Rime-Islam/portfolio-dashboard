
import { useUserlogin } from "../../../hooks/auth/auth.hooks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; 


const Login = () => {
  const { mutate } = useUserlogin();
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
 
const data = {
  email: e.target.email.value,
  password: e.target.password.value
};
mutate(data, {
  onSuccess: () => {
    toast.success("login Successfull");
    navigate("/dashboard");
  },
  onError: (error) => {
    toast.error("Login Failed: " + (error?.message || "Something went wrong"));
    console.error("Login error:", error);
  },
});

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
        <button type="submit" className="btn btn-success">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
    </div>
  );
};

export default Login;