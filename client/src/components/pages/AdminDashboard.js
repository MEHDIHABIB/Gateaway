// import React from 'react';
// import "./admin.css";

// const AdminDashboard = () => {
//     return (
//         <div className="admin">
//             <h1 style={{color: 'darkmagenta', fontWeight: "600"}}>Admin Dashboard</h1>
//             <div className="adminPost">
//             <span className="category">Post</span><button className="buttonPost">Search</button><button className="buttonPost">Edit</button><button className="buttonPost">Delete</button>
            
//             </div>

//             <div className="adminUser">
//             <span className="category">User</span><button className="buttonPost">Search</button><button className="buttonPost">Edit</button><button className="buttonPost">Delete</button>
            
//             </div>
//         </div>
//     )
// }

// export default AdminDashboard
import React from 'react';
import AdminHeader from "./AdminHeader";
import AdminActionBtns from "./AdminActionBtns" ;

const AdminDashboard = () => {
    return (
        <div>
            <AdminHeader />
            <AdminActionBtns />
        </div>
    )
}

export default AdminDashboard
