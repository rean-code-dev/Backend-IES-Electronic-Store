import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryPageDash from './dashboard_admin/category_page/CategoryPageDash';
import HomePageDash from './dashboard_admin/home_page/HomePageDash';
import EmployeePageDash from './dashboard_admin/employee_page/EmployeePageDash';
import CustomerPageDash from './dashboard_admin/customer_page/CustomerPageDash';
import RouteNoteFound from './dashboard_admin/route_not_found/RouteNotFound';
import LoginDashboard from './dashboard_admin/login_page/LoginPageDash';
import LayoutDashboardLogin from './components/layout/LayoutDashboardLogin';
import LayoutDashboard from './components/layout/LayoutDashboard';


function App() {
  return (

    
    <BrowserRouter> 
    <Routes>
      {/* Backend */}
        <Route path="/dashboard" element ={<LayoutDashboard/>}>
        <Route path="" element={<HomePageDash/>} />
          <Route path="category" element={<CategoryPageDash/>} />
          <Route path="employee" element={<EmployeePageDash/>} />
          <Route path="customer" element={<CustomerPageDash/>} />
          <Route path="*" element={<RouteNoteFound/>} />
          
        
        </Route>
      {/* backend login register */}
        <Route path="/dashboard/" element ={<LayoutDashboardLogin/>}>
        <Route path="login" element={<LoginDashboard/>} />
      
        </Route>
      
    </Routes>   
    </BrowserRouter>
    
  );

}

export default App;

// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import CategoryPageDash from './dashboard_admin/category_page/CategoryPageDash';
// import HomePageDash from './dashboard_admin/home_page/HomePageDash';
// // import RouteNoteFound from './dashboard_admin/route_not_found/RouteNotFound';
// import EmployeePageDash from './dashboard_admin/employee_page/EmployeePageDash';  
// import CustomerPageDash from './dashboard_admin/customer_page/CustomerPageDash';
// import LoginDashboard from './dashboard_admin/login_page/LoginPageDash';
// import LayoutDashboardLogin from './components/layout/LayoutDashboardLogin';
// import LayoutDashboard from './components/layout/LayoutDashboard';
// function App() {
//   return (
//     <BrowserRouter> 

//     <Routes>
    

//       {/* Backend */}
//         <Route path="/dashboard" element ={<LayoutDashboard/>}>
//         <Route path="" element={<HomePageDash/>} />
//           <Route path="category" element={<CategoryPageDash/>} />
//           <Route path="employee" element={<EmployeePageDash/>} />
//           <Route path="customer" element={<CustomerPageDash/>} />
        
//         </Route>
//       {/* backend login register */}
//         <Route path="/dashboard/" element ={<LayoutDashboardLogin/>}>
//         <Route path="login" element={<LoginDashboard/>} />
      
//         </Route>
      
//     </Routes>   
//     </BrowserRouter>
    
//   );

// }

// export default App;