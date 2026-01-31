import {create} from "zustand";
import axios from "axios"
import {toast} from "react-toastify"
import { persist } from "zustand/middleware";


export const userAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token:null,

      login: async (data) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            {
              email: data.email,
              password: data.password,
            }
          );

          set({ user: response.data.authUser });
          set({token:response.data.token})
          console.log(response.data.token)
          toast.success(response.data.message);
        } catch (error) {
          console.log("Error in login:", error.response?.data?.message);
          toast.error(error.response?.data?.message || "Login failed");
        }
      },

    logout:async()=>{
      try {
         set({user:null});
         set({token:null});
         toast.success("Logout Sucessfull");
      } catch (error) {
         console.log(error);
         toast.error("Logout interputed");
      }
    },
    doctors:async()=>{
      try {
         const reponse=await axios.get()
      } catch (error) {
         
      }
      finally{
         set({doctors:null})
      }
    }


    }),
    {
      name: "auth-storage", // ✅ options must be passed separately
    }
  )
);
