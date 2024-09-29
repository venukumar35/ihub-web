import {
  countryResponseSchema,
  countrySateResponseSchema,
 
} from "../pages/common_store/commonStore";
import apiClient from "./apiclient";
import notification from "../utils/notification";

class CountryApiProvider {
  async getCountry() {
    try {
      console.log("data");
      const response = await apiClient.get<countryResponseSchema[]>("/country");
      if (response.status == 200 || response.status == 201) {
        return response.data;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async getCountryState(id: number) {
    try {
      const response = await apiClient.get<countrySateResponseSchema[]>(
        "/country/get",
        {
          params: { id: Number(id) },
        }
      );
      if (response.status == 200 || response.status == 201) {
        return response.data;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
 async getTransaction(){
  try {
    const response = await apiClient.get(
      "/country/trans",
    );
    if (response.status == 200 || response.status == 201) {
      return response.data;
    }
  } catch (error) {
    notification.showAxiosErrorAlert(error);
    return null;
  }
 }
}
const objOfCountry = new CountryApiProvider();
export default objOfCountry;
