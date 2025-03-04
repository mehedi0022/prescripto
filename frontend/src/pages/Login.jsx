import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.success(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 shadow-lg text-sm">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Log In"}
          </p>
          <p className="text-sm mb-3">
            Please {state === "Sign Up" ? "Sign Up" : "Log In"} to book
            appointment
          </p>

          {state === "Sign Up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div className="w-full">
            <p>Eamil Address</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="something@example.com"
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md text-base"
          >
            {state === "Sign Up" ? "Create Account" : "Log In"}
          </button>

          <p className="text-sm">
            {state === "Sign Up" ? (
              <p>
                Already have a account?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setState("Log In")}
                >
                  Log In
                </span>
              </p>
            ) : (
              <p>
                Don't have a account?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setState("Sign Up")}
                >
                  Sign Up
                </span>
              </p>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
