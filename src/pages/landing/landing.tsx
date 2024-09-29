import { useEffect, useState } from "react";
import LandingStore from "./store";
import { TypographyStylesProvider, Text } from "@mantine/core";
import SearchInput from "../../component/search";
import BuyPro from "../buy/buyProduct";
import provider from "../../network/apiProvider";
import { Button } from "@mantine/core";
import GridView from "../grid";

function Landing() {
    const { ProductData, Product, setSearch } = LandingStore();
    const [searchQuery, setSearchQuery] = useState(""); 
     
    useEffect(() => {
      Product(); 
    }, []);
  
    useEffect(() => {
      if (searchQuery.length > 0) {
        setSearch(searchQuery); 
        Product(); 
      }
    }, [searchQuery]); 
  
    const addCart =async (id:number) => {
        const data ={
            productId:id.toString()
        }
       await provider.addCart(data)
    };
  
    return (
      <div className="flex flex-col items-center">
       <div className="flex w-full justify-center items-center fixed top-16 left-[550px] h-20">
       <SearchInput onSearch={setSearchQuery} />
        </div>
        <div className="flex flex-wrap justify-center items-center w-full mt-9">
          {ProductData &&
            ProductData.data.map((product: any,key: number) => (
              <div key={product.id} className="border p-4 m-2 rounded shadow-md">
                <div className="w-48 h-48 overflow-hidden">
                  <img
                    src={`http://localhost:3000/api/img/${product.image}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Text lineClamp={1} component="div" className="max-sm:text-sm ml-1">
                    <TypographyStylesProvider>
                      <p>{product.description}</p>
                    </TypographyStylesProvider>
                  </Text>
                </div>
                <p className="text-gray-700">
                  Price: ${product.sellingPrice.toFixed(2)}
                </p>
                {product.discountPrice && (
                  <p className="text-red-500 line-through">
                    Discount Price: ${product.discountPrice.toFixed(2)}
                  </p>
                )}
                <p className="text-gray-600">
                  Quantity: {product.quantity} {product.uom}
                </p>
                <p className="text-gray-600">HSN Code: {product.hsnCode}</p>
                <div className="flex flex-row space-x-3">
                <div>
                    <div key={key}><BuyPro details={product} /></div>
                   
                </div>

                <div>
                
                <Button
                onClick={() => addCart(product.id)}
                variant="light"
                 className="bg-blue-400 text-white">
                Add to cart
                </Button>
                </div>
              </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

export default Landing;
