import { useEffect, useState } from "react";
import LandingStore from "./landing/store";
import Table from "../component/table";
import { Button } from "@mantine/core";
import ModalComponent from "../component/model";

function GridView() {
    const { Product, setPage, page, ProductData } = LandingStore();
    const [open, setOpen] = useState(false);

    const onPageChanged = (page: number) => {
        setPage(page);
    };

    useEffect(() => {
        Product();
    }, []);

    useEffect(() => {
        Product();
    }, [page]);

    return (
        <div>
        <Button
        onClick={() => {setOpen(true)}}
        variant="light"
        className="bg-blue-400 text-white"
      >
       Grid
      </Button>
      <ModalComponent
        title="Products"
        size="100%"
        onClose={()=>setOpen(false)}
        opened={open}
      >
         <Table
            isLoading={false}
            columns={[
                "S.No",
                "Description",
                "Selling Price",
                "Discount Price",
                "Total Quantity",
                "UOM",
                "HSN Code",
                "Image",
            ]}
            from={ProductData?.form ?? 0} 
            to={ProductData?.to ?? 0}
            total={ProductData?.total ?? 0}
            totalPages={ProductData?.totalPages ?? 0}
            currentPage={page}
            onPageChanged={onPageChanged}
        >
                {ProductData && ProductData.data.map((e:any, index:Number) => (
                    <tr
                        key={index}
                        className="border border-solid border-gray-300 border-x-0"
                    >
                        <td className="table-body">{+index + 1}</td>
                        <td className="table-body">{e.description}</td>
                        <td className="table-body">{e.sellingPrice}</td>
                        <td className="table-body">{e.discountPrice ?? 'N/A'}</td>
                        <td className="table-body">{e.quantity}</td>
                        <td className="table-body">{e.uom}</td>
                        <td className="table-body">{e.hsnCode}</td>
                        <td className="table-body">
                            <img src={`http://localhost:3000/api/img/${e.image}`} className="w-16 h-16 object-cover" />
                        </td>
                    </tr>
                ))}
        </Table>
                </ModalComponent>

        </div>
       
    );
}

export default GridView;
