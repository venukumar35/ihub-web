import { Button } from "@mantine/core";
import ViewCart from "../pages/cart/cart";
import Order from "../pages/order/order";
import User from "../pages/user";
import { useState, useEffect } from "react";
import GridView from "../pages/grid";
import provider from "../network/apiProvider";
import { useNavigate } from "react-router-dom";

export default function NavBarTwo() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  useEffect(()=>{
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
},[])

   const logOut = async ()=>{
    const response = await provider.logoutUser()
    if(response?.status == 200 || response?.status == 201){
      localStorage.clear();
      navigate("/"); 
    }
   }

  return (
    <div className="flex flex-col fixed z-10 w-full lg:h-20 bg-slate-300">
      <div className="flex flex-row justify-between p-2 lg:p-0 md:p-4 shadow-sm lg:shadow-none">
        <div className="flex text-2xl font-bold mt-4 ml-6">
          Welcome
        </div>
          <div className="flex ml-auto mt-4 space-x-4">
          {role === "Admin" && <User />}
          <GridView />
          <Order/>
          <ViewCart />
          <Button className="bg-blue-400" onClick={logOut}>Logout</Button>
        </div>
      </div>
  </div>
  
  );
}

