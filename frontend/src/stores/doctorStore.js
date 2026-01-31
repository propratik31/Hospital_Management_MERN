import { create } from "zustand";
import { persist } from "zustand/middleware";

export const doctorStore=create(persist((set,get)=>({
    doctorAppointment:[]
})))