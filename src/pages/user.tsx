import { useEffect, useState } from "react";
import CommonStore from "./common_store/commonStore";
import { Button } from "@mantine/core";
import ModalComponent from "../component/model";

function User(){
    const {userData,user}=CommonStore()
    const [open, setOpen] = useState(false);
   
    useEffect(()=>{
        user()
    },[])
 
    console.log(userData)
    return (
        <div>
        <Button
        onClick={() => {setOpen(true)}}
        variant="light"
        className="bg-blue-400 text-white"
      >
       Users
      </Button>
      <ModalComponent
        title="User"
        size="70%"
        onClose={()=>setOpen(false)}
        opened={open}
      >
        <div>
            {
                userData && userData.map((e)=>(
                    <div className="flex flex-col border-b-2 border-black shadow-inner p-3 bg-slate-50 mb-2 rounded-sm">
                        
                    <div className="flex flex-row">
                    <div className="font-bold">Name :</div>
                    <div>{e.username}</div>
                    </div>
                    <div className="flex flex-row">
                    <div className="font-bold">Email :</div>
                    {e.email}
                    </div>
                    <div className="flex flex-row">
                    <div className="font-bold">Modile :</div>
                    {e.mobile}</div>
                    </div>
                ))
            }
        </div>
        </ModalComponent>
        </div>
    )
}
export default User