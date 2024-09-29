import { useEffect, useState } from "react";
import { TypographyStylesProvider, Text, Button } from "@mantine/core";
import SearchInput from "../component/search";
import LandingStore from "./landing/store";
import { useNavigate } from "react-router-dom";

function Home() {
  const { ProductData, Product, setSearch } = LandingStore();
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    Product(); 
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setSearch(searchQuery); 
      Product(); 
    }
  }, [searchQuery]); 

  const navToLoginPage = () => {
    navigate("/login"); // Redirects to the login page
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center p-2">
        <div className="flex justify-center items-center">
          <SearchInput onSearch={setSearchQuery} />
        </div>
        <div className="ml-[950px] mt-1">
        <Button onClick={navToLoginPage}>
          Login
        </Button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center w-full top-11">
        {ProductData &&
          ProductData.data.map((product: any) => (
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
              <div>
                <button onClick={navToLoginPage}>
                  <div className="font-bold">Buy</div>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
