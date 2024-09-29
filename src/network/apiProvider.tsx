import {
    UserCreationRequest,
    loginRequestinput,
  } from "../models/login_request";
import notification from "../utils/notification";
  import apiClient from "./apiclient";
  
  class ApiProvider {
    async AddUser(input: UserCreationRequest) {
      try {
        const response = await apiClient.post("/user", input);
        if (response.status == 200 || response.status == 201) {
          notification.showAlertNotification(response.data.message, true);
          return { status: true };
        } else {
          notification.showAlertNotification(response.data.message, false);
          return { status: false };
        }
      } catch (error) {
        notification.showAxiosErrorAlert(error);
        return { status: false };
      }
    }
    async Login(input: loginRequestinput) {
      try {
        const response = await apiClient.post("/auth/login", input);
        const message = response.data?.message ?? "Something went wrong";
        if (response.status == 200 || response.status == 201) {
          notification.showAlertNotification(response.data.message, true);
          return { status: response.status, response };
        } else {
          notification.showAlertNotification(message, false);
          return null;
        }
      } catch (error) {
        notification.showAxiosErrorAlert(error);
        return null;
      }
    }
  
    async productDetails(input:any){
      try {
        const response = await apiClient.get("/product", {
          params: input,
        });
  
        const message = response.data?.message ?? "Something went wrong";
        if (response.status == 200 || response.status == 201) {
          return { status: response.status, response };
        } else {
          notification.showAlertNotification(message, false);
          return null;
        }
      } catch (error) {
        notification.showAxiosErrorAlert(error);
        return null;
      }
    }
   async buyProduct(input:any){
    try {
      const response = await apiClient.post("/transaction",input);

      const message = response.data?.message ?? "Something went wrong";
      if (response.status == 200 || response.status == 201) {
        notification.showAlertNotification(response.data.message, true);
        return { status: response.status, response };
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    } 
   }
   async addCart(input:any){
    try {
      const response = await apiClient.post("/cart/add",input);
      const message = response.data?.message ?? "Something went wrong";
      if (response.status == 200 || response.status == 201) {
        notification.showAlertNotification(response.data.message, true);
        return { status: response.status, response };
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    } 
   }
   async cartDetails(input:any){
    try {
      const response = await apiClient.get("/cart", {
        params: input,
      });

      const message = response.data?.message ?? "Something went wrong";
      if (response.status == 200 || response.status == 201) {
        return { status: response.status, response };
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
   }
   async checkOutCart(input:any){
    try {
      const response = await apiClient.patch(`/cart/remove/${input.toString()}`);

      const message = response.data?.message ?? "Something went wrong";
      if (response.status == 200 || response.status == 201) {
        return { status: response.status, response };
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
   }
   async transactionuserDetails(input:any){
    try {
      const response = await apiClient.get(`/transaction`, {
        params: input,
      });

      const message = response.data?.message ?? "Something went wrong";
      if (response.status == 200 || response.status == 201) {
        return { status: response.status, response };
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
   }
   async userDetails(){
    try {
      const response = await apiClient.get(`/user`);

      const message = response.data?.message ?? "Something went wrong";
      if (response.status == 200 || response.status == 201) {
        return { status: response.status, response };
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
   }
   async logoutUser(){
    try {
      const response = await apiClient.post("/transaction/logout");

      const message = response.data?.message ?? "Something went wrong";
      if (response.status == 200 || response.status == 201) {
        return { status: response.status, response };
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
   }
  }
  
  const provider = new ApiProvider();
  
  export default provider;
  