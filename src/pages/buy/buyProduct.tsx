import { Button, Select, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import commonStore from "../common_store/commonStore";
import ModalComponent from "../../component/model";
import provider from "../../network/apiProvider";

interface ProductDetails {
    id: number;
    name: string;
    sellingPrice: number;
    description: string;
    quantity: number;
    uom: string;
    hsnCode: string;
    discountPrice:string
  }
  
  interface BuyProProps {
    details: ProductDetails;
  }
  
  function BuyPro({ details }: BuyProProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false); // State to track loading state of API requests

    const [openCost, setOpenCost] = useState(false); 
    const { transactionData,transaction } =
    commonStore();
    const form = useForm({
       initialValues:{
        productId:"",
        quantity:"",
        totalprice:"",
        transactionId:""
       }
    })
    function clearForm() {      
        setOpen(false);
        form.reset(); 
        setOpenCost(false);
      }
      const calculatePrice = async (values: typeof form.values) => {        
        setLoading(true); // Set loading state to true during API request
    
        const data = {
          productId: values.productId,
          quantity: values.quantity,
          price:details.sellingPrice,
          discount:details.discountPrice
        };

        const totalPrice = +details.discountPrice > 0 ?  Number(data.quantity) * Number(data.discount) :  Number(data.quantity) * Number(data.price);
  
        form.setFieldValue("totalprice", totalPrice.toFixed(2));    
        setOpenCost(true);
        setLoading(false);
      };

      const onSubmit = async(values: typeof form.values)=>{
       const data = {
        productId:details.id.toString(),
        quantity:values.quantity,
        totalPrice:values.totalprice,
        transId:values.transactionId
       }
         const response = await provider.buyProduct(data);         
         if(response?.status === 200 || response?.status === 201){
          clearForm() 
         }
      }
      useEffect(()=>{
        transaction()
      },[])

    return (
      <div>
      <ModalComponent
        title="Add Product"
        size="80%"
        onClose={clearForm}
        opened={open}
      >
        <form onSubmit={form.onSubmit(openCost ?   onSubmit : calculatePrice)}>
        <div className="flex flex-col justify-around ">
          <div className="flex flex-col w-full">
          <div>
            <TextInput
              {...form.getInputProps("quantity")}
              label="Quantity"
              placeholder="Enter quantity"
              withAsterisk
              className="w-10/12"
              variant="filled"
            />
          </div>
         {
          openCost ? undefined : <div className="mt-6">
          <Button type="submit" loading={loading} className="w-10/12">
            Calculate the price
          </Button>
        </div>
         }
          </div>
          {openCost ? (
          <div className="flex flex-col ">
            <div className="flex flex-col font-extrabold text-black">
              <TextInput
                {...form.getInputProps("totalprice")}
                label="Total cost"
                placeholder="Cost"
                withAsterisk
                disabled
                className="w-10/12"
              />

           <Select
            {...form.getInputProps("transactionId")}
            label="Select Transaction type"
            placeholder="Select Transaction type"
            data={transactionData?.map((e: any) => ({
              label: e.type,
              value: e.id.toString(),
            }))}
            clearable
            searchable
            className="w-10/12"
            />
            </div>
            <div className="flex mt-12">
              <Button type="submit" loading={loading} className="w-10/12">
                Submit
              </Button>
            </div>
          </div>
        ) : undefined}
        </div>
        </form>
      </ModalComponent>
      
      <Button
        onClick={() => setOpen(true)}
        variant="light"
        className="bg-blue-400 text-white"
      >
        Add Product
      </Button>
    </div>
    
    );
  }
  
  export default BuyPro;
  

