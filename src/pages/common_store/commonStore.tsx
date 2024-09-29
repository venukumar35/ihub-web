import { create } from "zustand";
import objOfCountry from "../../network/commonclient";
import z from "zod";
import provider from "../../network/apiProvider";

const countryResponse = z.object({
  id: z.number(),
  name: z.string(),
  timezoneOffset: z.number(),
  dialCode: z.number(),
});
const countryStateResponse = z.object({
  id: z.number(),
  name: z.string(),
  countryId: z.number(),
});
const transactionResponse = z.object({
  id: z.number(),
  type: z.string(),
})
export type countryResponseSchema = z.infer<typeof countryResponse>;
export type countrySateResponseSchema = z.infer<typeof countryStateResponse>;
export type transActionTypeResponseSchema = z.infer<typeof transactionResponse>;

interface storeType {
  countryData: countryResponseSchema[] | null;
  country: () => void;
  stateData: countrySateResponseSchema[] | null;
  state: () => void;
  countryId: number;
  setCountryId: (countryId: number) => void;
  transactionData : transActionTypeResponseSchema[] | null;
  transaction: () => void;
  transactionDetaialsData:any[]|null;
  transactionDetails : ()=>void;
  userData:any[]|null;
  user:()=>void;
  page:number;
  search:string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  reset:()=>void
}

const CommonStore = create<storeType>((set, get) => ({
countryData: null,
stateData: null,
countryId: 1,
transactionData:null,
page: 0,
search: "",
transactionDetaialsData:null,
userData:null,
  user:async()=>{
    const response = await provider.userDetails();
    if (response != null) {
        console.log(response.response.data )
      set({ userData: response.response.data ?? [] });
    }
  },
transactionDetails: async ()=> {
  const { page, search } = get(); // Destructure page and search from current state
      const data = {
        page: page,
        searchQuery: search,
      }; 
      const response = await provider.transactionuserDetails(data);
      if (response != null) {
          console.log(response.response.data )
        set({ transactionDetaialsData: response.response.data ?? [] });
      }
},
  country: async () => {
    const response = await objOfCountry.getCountry();
    if (response != null) {
      set({ countryData: response });
    }
  },
  state: async () => {
    const { countryId } = get();
    const response = await objOfCountry.getCountryState(countryId);
    if (response != null) {
      set({ stateData: response ?? [] });
    }
  },
  setCountryId: (countryId: number) => set(() => ({ countryId })),
  transaction:async()=>{
    const response = await objOfCountry.getTransaction();
    if (response != null) {
      set({ transactionData: response.data ?? [] });
    }
  },
   setPage: (page: number) => set(() => ({ page })),
    setSearch: (search: string) => set(() => ({ page: 1, search })),
  reset: () => {
  set({
    page: 1,
    search: "",
  });
},
}));
export default CommonStore;
