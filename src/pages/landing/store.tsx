import { z } from "zod";
import { create } from "zustand";
import provider from "../../network/apiProvider";

const productResponseSchema = z.object({
  id: z.number(),
  description: z.string(),
  image: z.string().url().optional(),
  sellingPrice: z.number(),
  discountPrice: z.number().nullable().optional(),
  quantity: z.number(),
  uom: z.string(),
  hsnCode: z.string(),
  createdBy: z.number(),
  createdAt: z.string().transform((date) => new Date(date)), 
  updatedAt: z.string().transform((date) => new Date(date)),
  isActive: z.boolean(),
});

const productDetails = z.object({
  from: z.number(),
  to: z.number(),
  total: z.number(),
  totalPages: z.number(),
  data: productResponseSchema.array().nullable(),
});
export type ProductResponse = z.infer<typeof productDetails>;


interface Store{
    ProductData: ProductResponse[] | null;
    Product:()=>void;
    page:number;
    search:string;
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    reset:()=>void
    cartData:any[]|null;
    cart:()=>void
}

const LandingStore = create<Store>((set, get) => ({
    page: 0,
    search: "",
    ProductData: null,
    cartData:null,
    cart: async()=>{
      const { page, search } = get(); // Destructure page and search from current state
      const data = {
        page: page,
        searchQuery: search,
      }; 
      const response = await provider.cartDetails(data);
      if (response != null) {
          console.log(response.response.data )
        set({ cartData: response.response.data ?? [] });
      }
    },
    Product: async () => {
        const { page, search } = get(); // Destructure page and search from current state
        const data = {
          page: page,
          searchQuery: search,
        }; 
        const response = await provider.productDetails(data);
        if (response != null) {
            console.log(response.response.data )
          set({ ProductData: response.response.data ?? [] });
        }
      },
      // Function to set the current page number
     setPage: (page: number) => set(() => ({ page })),
     // Function to set the search query and reset page to 1
      setSearch: (search: string) => set(() => ({ page: 1, search })),
    // Function to reset page and search query to initial values
    reset: () => {
    set({
      page: 1,
      search: "",
    });
  },
}))
export default LandingStore;