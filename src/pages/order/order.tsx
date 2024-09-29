import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import ModalComponent from "../../component/model";
import CommonStore from "../common_store/commonStore";

function Order(){
    const [open, setOpen] = useState(false);
    const {transactionDetaialsData,transactionDetails}=CommonStore();
    useEffect(()=>{
        transactionDetails()
    },[])
    const handleModalOpen = () => {
        setOpen(true);
        transactionDetails(); 
      };
    return(
        <div>
        <Button
        onClick={() => {handleModalOpen()}}
        variant="light"
        className="bg-blue-400 text-white"
      >
      Orders
      </Button>
      <ModalComponent
        title="Oders"
        size="70%"
        onClose={()=>setOpen(false)}
        opened={open}
      >
      <div>
  {transactionDetaialsData && transactionDetaialsData.data.map((orders: any, key: number) => (
    <div key={key} className="flex flex-col border-2 border-black shadow-inner space-y-5 p-4 rounded-sm">
      <div>
        <div className="flex flex-row mb-1">
          <div className="font-bold">Description :</div>
          <div className="font-thin ml-2">{orders.product.description}</div>
        </div>
        <div className="flex flex-row">
          <div className="font-bold">Ordered on :</div>
          <div className="font-thin ml-2">{orders.createdAt.toString().slice(0, 10)}</div>
        </div>
      </div>
    </div>
  ))}
</div>
 
      </ModalComponent>
        </div>
    )
}
export default Order