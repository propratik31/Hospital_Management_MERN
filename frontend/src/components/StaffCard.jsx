
import { FaUser, FaMapMarkerAlt, FaPhone, FaVenusMars, FaUserShield } from "react-icons/fa";
import { staffStore } from "../stores/staffStore";


export default function StaffCard({staff,setUform,setValueOnUpdate}) {
  const deleteStaff=staffStore((state)=>state.deleteStaff)
  return (
<div className='card d-flex flex-column shadow-lg glass-effect rounded-4' style={{width:"25rem"}} key={staff.id}>
 

  <div className="dropdown position-absolute top-0 end-0 m-2" >
             <button
               className="btn btn-light btn-sm border-0 fw-bold" style={{fontSize:"25px"}}
               type="button" 
               data-bs-toggle="dropdown"
               aria-expanded="false"
             >
               ⁝
             </button>
             <ul className="dropdown-menu dropdown-menu-end shadow-sm">
               <li>
                 <button className="dropdown-item text-warning" onClick={()=>{setUform(true); setValueOnUpdate(staff)}}> Update</button>
               </li>
               <li>
                 <button className="dropdown-item text-danger"onClick={()=>deleteStaff(staff.id)} >🗑️ Delete</button>
               </li>
             </ul>
           </div>
 
  <p className='mb-2 mt-4 fw-bold'><FaUser className="me-2 text-primary"/>{staff.name}</p> 
  <p className='mb-2 opacity-75'><FaMapMarkerAlt className="me-2 text-danger"/> {staff.address}</p>
  <p className='mb-2'><FaPhone className="me-2" style={{color:"red"}}/>{staff.contact}</p>
  <p className='mb-2'><FaVenusMars className="me-2 text-primary"/> {staff.gender}</p>
  <p className='mb-4'><FaUserShield className="me-2 text-primary"/> {staff.age}</p>
</div>
  )
}
