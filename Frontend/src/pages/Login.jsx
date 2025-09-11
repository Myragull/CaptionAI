import { Link, useNavigate } from "react-router-dom";
import { successToast } from "../utils/toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { useState } from "react";

// ✅ Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loginError, setLoginError] = useState("");

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
    setLoginError(""); // Clear previous errors
    try {
      const response = await api.post("/auth/login", data); // ✅ no need for headers, api handles it
      if (response.status === 200) {
        successToast("Login successful!");

        // fetch user info
        const me = await api.get("/auth/session");
        setUser(me.data.user);

        reset();
        navigate("/HomePage/home");
      }
    } catch (error) {
      console.log("login error", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("Login failed. Please try again.");
      }
    }
  };

  // Add to handleImageUpload in Home.jsx
  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                })
              );
            },
            "image/jpeg",
            0.8
          ); // 80% quality
        };
      };
    });
  };

  // Then use it before upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const optimizedFile = await compressImage(file);
    const formData = new FormData();
    formData.append("image", optimizedFile);

    // Rest of your upload code...
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

              {/* Error message box */}
              {loginError && (
                <div className="error-container mt-4 flex justify-center">
                  <div className="error-box p-3 rounded-lg bg-[#303032]  text-[#dcdcdc] text-center w-full sm:w-[430px]">
                    {loginError}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
