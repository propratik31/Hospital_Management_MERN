import {create} from "zustand"
import { persist } from "zustand/middleware"
import { userAuthStore } from "./userAuthStore"
import axios from "axios";
import { toast } from "react-toastify";
import { adminStore } from "./adminStore";

export const patientStore=create(persist((set,get)=>({
     
    deletePatient:async(id)=>{
        try {
            const token=userAuthStore.getState().token;
            const response=await axios.delete(`${import.meta.env.VITE_API_URL}/deletep/${id}`,{headers:{
                "token":token
            }});

            if(response){
                toast.warning("Patient Delete Sucessfully");
                const getPatients=adminStore.getState().getPatients;
                getPatients();
            }

            // console.log(response);
        } catch (error) {
            console.log(error)
        }
    },
    editPatient:async(patient)=>{
        try {
            // console.log(patient);
            const token=userAuthStore.getState().token;
            const response=await axios.put(`${import.meta.env.VITE_API_URL}/update/${patient.id}`,
                {name:patient.name,age:patient.age,gender:patient.gender,contact:patient.contact,address:patient.address},
                {
                    headers:{
                        "token":token
                    }
                }
            );

            // console.log(response);
            if(response){
                toast.success("Patient Sucessfully Updated");
                 const getPatients=adminStore.getState().getPatients;
                getPatients();
                
            }
        } catch (error) {
            console.log("error Occur in editPatient funtion",error)
        }
    }

})))