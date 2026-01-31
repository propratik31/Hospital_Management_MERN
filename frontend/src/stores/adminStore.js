import {create} from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios"
import { userAuthStore } from "./userAuthStore"
import { toast } from "react-toastify"


export const adminStore=create(persist((set,get)=>({
    doctors:[],
    patients:[],
    otherStaff:[],
    appointments:[],

getDoctors: async () => {
  try {
    const token = userAuthStore.getState().token;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/doctors`, {
      headers: { "token": token }
    });

    // console.log("data of doctors", response.data.doctors);
    set({ doctors: response.data.doctors || [] });
  } catch (error) {
    console.log("here In Get Doctors", error);
    set({ doctors: [] });
  }
}
,
getPatients:async()=>{
    try {
        const token=userAuthStore.getState().token;
        const response= await axios.get(`${import.meta.env.VITE_API_URL}/patients`,
            {
                headers:{
                    'token':token
                }
            }
        );
        // console.log(response.data.patients);
        if(response){
            // console.log("response")
            set({patients:response.data.patients})
        }
    } catch (error) {
        console.log(error);
        set({patients:[]})
    }

},
getOtherStaff:async()=>{
    try {
        const token=userAuthStore.getState().token;
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/staffs`,{
            headers:{
                "token":token
            }
        });

        // console.log(response.data);
        if(response){
            set({otherStaff:response.data.data});
        }
    } catch (error) {
        console.log("Error in getOtherStaff",error);
        set({otherStaff:[]})
    }
}
,
getAppointments:async()=>{
    try {
        const token=userAuthStore.getState().token;
        const response= await axios.get(`${import.meta.env.VITE_API_URL}/all`,{
            headers:{
                "token":token
            }
        });

        console.log(response.data.data)
        if(response){
            set({appointments:response.data?.data});
        }
    } catch (error) {
        console.log("Error in getAppointments",error);
          set({appointments:[]})
    }
}
,
createDoctor:async(data)=>{
    try {
        const token=userAuthStore.getState().token;
        const createDoctorRes=await axios.post(`${import.meta.env.VITE_API_URL}/doctorc`,data,{
            headers:{
                "token":token
            },
           
        })
        // console.log("response message",createDoctorRes.data.message);
        if(createDoctorRes){
            // console.log("if message");
            toast.success(createDoctorRes.data.message)
            get().getDoctors();
        }
    } catch (error) {
        // console.log( "Printing Error",error);
        // console.log("Printing error message",error.response.data.message)
        toast.error(error.response.data.message);
    }
},

deleteDoctor:async(id)=>{
    try {
        const token=userAuthStore.getState().token;
        const response=await axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`,{
            headers:{
                "token":token
            }
        })
        if(response){
            toast.warning(response.data.message);
            get().getDoctors();
        }
        
    } catch (error) {
        toast.error(error.response.data.message)
    }
},

editDoctor:async(udoctor)=>{
try {
    const token=userAuthStore.getState().token;
    // console.log(udoctor);
    const response=await axios.put(`${import.meta.env.VITE_API_URL}/doctoru/${udoctor.id}`,
        {    name:udoctor.uname,
            contact:udoctor.ucontact,
            specialization:udoctor.uspecialization,
            address:udoctor.uaddress,
            gender:udoctor.ugender   },
        
    {
        headers:{
        "token":token
    }}
    );

    // console.log(response);
    if(response){
        get().getDoctors();
        toast.success("Record Sucessfully Updated")
    }
} catch (error) {
    console.log("Internal error");
    toast.error("Record Not Updated !")
}
}

}))) 

