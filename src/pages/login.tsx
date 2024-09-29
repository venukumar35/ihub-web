import { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import AddUser from "./register_user";
import provider from "../network/apiProvider";

// Define animation variants for framer-motion
const variants = {
  hidden: { opacity: 0, y: 50 }, // Initial hidden state with opacity 0 and 50px y-offset
  visible: { opacity: 1, y: 0 }, // Visible state with opacity 1 and no y-offset
};

const Login = () => {
  
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state of form submission
  const navigate = useNavigate(); // Hook  to navigate page
  //Hook to  handle from data
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
  // Function to handle form submission
  const handleLoginSubmit = async (values: typeof loginForm.values) => {
    setIsLoading(true);
    const data = {
      email: values.email,
      password: values.password,
    };
    // Login function call to authenticate user
    const response = await provider.Login(data);
    if (response?.status) {
      // Storing user data in localStorage
      localStorage.setItem("id", response.response.data.data.id);
      localStorage.setItem("email", response.response.data.data.email);
      localStorage.setItem("token", response.response.data.data.token);
      localStorage.setItem("role", response.response.data.data.roles.name);
      // Navigate to '/inventory' page
      navigate("/landing");
      setIsLoading(false);
    } else {
      setIsLoading(false); // Set loading state to false after operation
    }
  };

  return (
    <section
      className="background-pattern flex min-h-screen max-w-full flex-col items-center justify-center p-4"
      style={{ backgroundColor: "#bde0fe" }}
    >
      <motion.section
        className="w-full max-w-md rounded-lg shadow-md"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-t-md bg-sky-300 px-2 py-4 text-center text-3xl font-semibold tracking-wider text-white shadow-sm md:text-4xl">
          <span className="w-full">Login</span>
        </div>
        <div className="rounded-b-2xl bg-white px-8 pb-10 pt-6">
          <form
            className="space-y-4"
            onSubmit={loginForm.onSubmit(handleLoginSubmit)}
          >
            <TextInput
              label="Email"
              placeholder="jhondoe@gmail.com"
              className="w-full"
              {...loginForm.getInputProps("email")}
            />
            <TextInput
              label="password"
              placeholder="***********"
              className="w-full"
              {...loginForm.getInputProps("password")}
            />
            <Button
              type="submit"
              size="md"
              className="bg-sky-500"
              fullWidth
              loading={isLoading}
              style={{ padding: "1px" }}
            >
              Log in
            </Button>
          </form>
          <div className="mt-3 flex justify-between">
            <div className="text-xs text-center">
              Do'not have a account yet?
            </div>
            <div className="text-xs hover:cursor-pointer">
              <AddUser />
            </div>
          </div>
        </div>
      </motion.section>
    </section>
  );
};

export default Login;
