import { TypographyStylesProvider, Button, Text } from "@mantine/core";
import ModalComponent from "../../component/model";
import { useEffect, useState } from "react";
import LandingStore from "../landing/store";
import provider from "../../network/apiProvider";

function ViewCart() {
  const [open, setOpen] = useState(false);
  const { cartData, cart } = LandingStore();

  function clearForm() {
    setOpen(false);
  }

  const checkoutCart = async (id: any) => {
    const response = await provider.checkOutCart(id);
    cart(); 
  };

  useEffect(() => {
    cart(); 
  }, []); 
  const handleModalOpen = () => {
    setOpen(true);
    cart(); 
  };
  return (
    <div>
      <Button
        onClick={() => {handleModalOpen()}}
        variant="light"
        className="bg-blue-400 text-white"
      >
        Cart
      </Button>
      <ModalComponent
        title="Cart"
        size="100%"
        onClose={clearForm}
        opened={open}
      >
        <div className="flex flex-wrap justify-center items-center w-full top-11">
          {cartData &&
            cartData.data.map((product: any, key: number) => (
              <div
                key={product.id}
                className="border p-4 m-2 rounded shadow-md"
              >
                <div className="w-48 h-48 overflow-hidden">
                  {/* Uncomment if you want to show the image */}
                  <img
                    src={`http://localhost:3000/api/img/${product.product.image}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Text
                    lineClamp={1}
                    component="div"
                    className="max-sm:text-sm ml-1"
                  >
                    <TypographyStylesProvider>
                      <p>{product.description}</p>
                    </TypographyStylesProvider>
                  </Text>
                </div>
                {product?.sellingPrice !== undefined && (
                  <p className="text-gray-700">
                    Price: ${product.sellingPrice.toFixed(2)}
                  </p>
                )}
                {product?.discountPrice && (
                  <p className="text-red-500 line-through">
                    Discount Price: ${product.discountPrice.toFixed(2)}
                  </p>
                )}
                <p className="text-gray-600">
                  Quantity: {product.product.quantity} {product.product.uom}
                </p>
                <p className="text-gray-600">HSN Code: {product.product.hsnCode}</p>
                <Button onClick={() => checkoutCart(product.id)}>
                  Checkout
                </Button>
              </div>
            ))}
        </div>
      </ModalComponent>
    </div>
  );
}

export default ViewCart;
