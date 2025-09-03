import { Link, useNavigate } from "react-router-dom";
import { successToast } from "../utils/toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";

// ✅ Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // validate when field loses focus
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ← must add this
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const res_data = await response.json();
        successToast("Login successfull!");
        // fetch user info immediately after login
        const me = await fetch("http://localhost:3000/api/auth/session", {
          credentials: "include",
        });
        const meData = await me.json();
        setUser(meData.user);
        reset();
        console.log(res_data);
        navigate("/HomePage/home");
      }
      console.log(response);
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <div className="registration-container relative min-h-screen overflow-hidden bg-[#16171a] flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8 text-[#ffffff]">
      {/* content container */}
      <div className="space-y-8 w-full pb-5">
        {/* title container */}
        <div className="main-title flex mt-8 justify-center">
          <h1 className="text-3xl font-bold text-center text-[#ffffff] mb-1">
            CAPTION AI
          </h1>
        </div>

        {/* form content */}
        <div className="CAI-content flex justify-center">
          <div className="CAI-Content-Wrapper">
            <div className="space-y-8 w-full px-4 sm:px-0">
              {/* form values */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="registration-form space-y-4 w-full max-w-400 mx-auto"
              >
                {/* Email Parent Container */}
                <div className="CAIFormGroupClass form-group">
                  <div className="CAI-InputWrapperClass col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <input
                      tabIndex="3"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="bg-transparent border border-[#2c2e33] placeholder:text-[#9ca3af] focus:text-[#ffffff] sm:text-sm rounded-[6px] focus:ring-2 focus:ring-[#ffffff] focus:outline-none block w-full p-2.5"
                      autoComplete="email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-[#DC2626] text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password parent container */}
                <div className="CAIFormGroupClass form-group">
                  <div className="CAI-InputWrapperClass col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <input
                      tabIndex="4"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="bg-transparent border border-[#2c2e33] focus:text-[#ffffff] placeholder:text-[#9ca3af] sm:text-sm rounded-[6px] focus:ring-2 focus:ring-[#ffffff] focus:outline-none block w-full p-2.5"
                      autoComplete="new-password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-[#DC2626] text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* submit button */}
                <div className="button-parent pt-2">
                  <div
                    id="CAI-form-buttons"
                    className="CAI-FormButtonsClass col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  >
                    <button
                      type="submit"
                      className="text-center flex items-center gap-2 justify-center text-sm font-medium whitespace-nowrap text-[#dcdcdc] bg-gradient-to-b transition-all duration-200 from-[#2c2e33] to-[#25272b] cursor-pointer hover:opacity-90 rounded-lg text-neutral-13 w-full sm:w-[430px] g-recaptcha"
                      tabIndex={6}
                      data-sitekey="6LefbVsqAAAAABmj0Ip-Uy71QWx1MqbaxXDa9-i9"
                      data-callback="onSubmit"
                      data-action="register"
                      style={{
                        height: "40px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                      }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>

              {/* form options */}
              <div
                id="kc-form-options"
                className="flex justify-center px-4 sm:px-0"
              >
                <p className="font-medium text-neutral-6 text-[#9c9c9c] text-sm sm:text-base">
                  New to Caption AI?{" "}
                  <Link
                    to="/"
                    className="font-medium text-[#dcdcdc] hover:text-[#f0eeee]"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
