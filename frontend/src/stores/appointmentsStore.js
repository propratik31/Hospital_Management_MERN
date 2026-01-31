import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userAuthStore } from "./userAuthStore";
import axios from "axios";
import { toast } from "react-toastify";

export const appointmentStore = create(
  persist((set, get) => ({
    myappointment:[],
    completedAPpointments:[],
    avilableSlot:[],
    doctorsAppointmentsss:[],
    todaysAppointment:[],
    myAppointments: async () => {
      try {
        const token = userAuthStore.getState().token;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/appointments`,
          {
            headers: {
              token: token,
            },
          }
        );
          
        // console.log(response);
        if (response) {
         
          set({myappointment:response.data.data.myAppointment});
          set({completedAPpointments:response.data.data.CompletedAppointments})
        }
      } catch (error) {
        console.log(error);
      }
    },
    doctorAppointment:async()=>{
          try {
            const token=userAuthStore.getState().token;
            const response=await axios.get(`${import.meta.env.VITE_API_URL}/doctor/appointments`,{
              headers:{
                token:token
              }
            })
            if(response){
              set({doctorsAppointmentsss:response.data.data})
              console.log(response.data.data)
              
            }
          } catch (error) {
            console.log(error);
          }
    },
    getAvailableSlots:async(doctor)=>{
      try {
        if(doctor.date && doctor.doctorId){
          const token = userAuthStore.getState().token;
        

        const response=await axios.post(`${import.meta.env.VITE_API_URL}/avilable`,
             {doctorId:doctor.doctorId,date:doctor.date},
             {
             headers: {
              "token": token,
            },} 
        );
        console.log( "response coming ",response)
        if(response){
          set({avilableSlot:response.data.availableSlots});
          
        }
        }
        console.log("I am Holding Time")
        
      } catch (error) {
        console.log("getAVilbale request dismiss",error)
      }
    },
    bookAppointment:async(data)=>{
      console.log(data);
      try {
          const token=userAuthStore.getState().token;
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/appointment/book`,
            {
              doctorId: data.doctorId,
              appointmentDate: data.date,
              appointmentTime: data.time,
            },
          {
            headers:{
              token:token
            }
          });
          // console.log(response);
          if(response){
            toast.success("Your Appointment Booked Successfully");
          }
      } catch (error) {
        console.log("Error In The Book Appointment",error)
      }
    },
    editAppointment:async(data)=>{
      try {
        const token=userAuthStore.getState().token;

        const response=await axios.put(`${import.meta.env.VITE_API_URL}/appointment/${data.id}`,{
          status:data.status,
          notes:data.notes
        },
      {
        headers:{
          token:token
        }
      });
      if(response){
        const doctorAppointment=get().doctorAppointment;
        doctorAppointment();
      }
      } catch (error) {
        console.log("Error Come in the code",error)
      }
    },
    gettodayAppointment:async()=>{
      try {
         const token=userAuthStore.getState().token;
         const response=await axios.get(`${import.meta.env.VITE_API_URL}/appointment/today`,{
          headers:{
            token:token
          }
         })
         if(response){
           set({todaysAppointment:response.data.data})
          //  console.log(response.data.data);
         }
      } catch (error) {
        console.log(error)
      }
    }
  }))
);
