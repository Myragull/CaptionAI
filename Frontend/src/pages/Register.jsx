import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const res_data = await response.json();
        alert("Account Created successfull");
        setUser({ firstname: "", lastname: "", email: "", password: "" });
        console.log(res_data);
        navigate("/Home");
      }
      console.log(response);
    } catch (error) {
      console.log("login", error);
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
                onSubmit={handleSubmit}
                className="registration-form space-y-4 w-full max-w-[400px] mx-auto"
              >
                {/* first-last Name parent container */}
                <div className="firstN-LastN-conatiner flex flex-col sm:flex-row gap-4 w-full">
                  {/* first name */}
                  <div className="CAI FormGroupClass form-group w-full">
                    <div className="CAIInputWrapperClass col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <input
                        tabIndex="1"
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="First name"
                        className="bg-transparent border border-[#2c2e33] sm:text-sm rounded-[6px] focus:ring-2 focus:ring-[#ffffff] focus:outline-none block w-full p-2.5 focus:text-[#ffffff] placeholder:text-[#9ca3af]"
                        autoComplete="off"
                        required
                        value={user.firstname}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  {/* last name */}
                  <div className="CAI FormGroupClass form-group w-full">
                    <div className="CAIInputWrapperClass col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <input
                        tabIndex="2"
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Last name"
                        className="bg-transparent border border-[#2c2e33] placeholder:text-[#9ca3af] focus:text-[#ffffff] sm:text-sm rounded-[6px] focus:ring-2 focus:ring-[#ffffff] focus:outline-none block w-full p-2.5"
                        autoComplete="off"
                        required
                        value={user.lastname}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                </div>

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
                      required
                      value={user.email}
                      onChange={handleInput}
                    />
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
                      required
                      value={user.password}
                      onChange={handleInput}
                    />
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
                      Create Account
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
                  Already using Caption AI?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-[#dcdcdc] hover:text-[#f0eeee]"
                  >
                    Login
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

export default Register;
