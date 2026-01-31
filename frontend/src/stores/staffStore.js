import {create} from "zustand";
import { persist } from "zustand/middleware";
import { userAuthStore } from "./userAuthStore";
import axios from "axios";
import { toast } from "react-toastify";
import { adminStore } from "./adminStore";

export const staffStore=create(persist((set,get)=>({
AddStaff:async(data)=>{
     try {
       const token=userAuthStore.getState().token;
      console.log("Data Printing from the AddStaff",data)

      const response=await axios.post(`${import.meta.env.VITE_API_URL}/staff/create`,data,{
        headers:
        {
          "token":token
        }
      })
      if(response){
        toast.success("New Staff Added");
        const getOtherStaff=adminStore.getState().getOtherStaff;
      getOtherStaff();
      }
     } catch (error) {
        console.log(error);
     }
},
deleteStaff:async(id)=>{
  try {
    const token=userAuthStore.getState().token;
    const response=await axios.delete(`${import.meta.env.VITE_API_URL}/deletes/${id}`,{
      headers:{
        "token":token
      }
    })
    if(response){
      toast.success("Staff Remove From Our System");
      const getOtherStaff=adminStore.getState().getOtherStaff;
      getOtherStaff();
    }

  } catch (error) {
    console.log(error)
  }
},
updateStaffs:async(udata)=>{
  try {
    const token=userAuthStore.getState().token;
    // console.log("data from StaffStore",udata);
     const response=await axios.put(`${import.meta.env.VITE_API_URL}/updates/${udata.id}`,udata,{
      headers:{
        "token":token
      }
     });
     if(response){
      toast.success("Staff Record Updated");
      const getOtherStaff=adminStore.getState().getOtherStaff;
      getOtherStaff();
     }

  } catch (error) {
    console.log("Error",error);
    toast.warning("Try Again Record Not Updated");
  }
}
})));