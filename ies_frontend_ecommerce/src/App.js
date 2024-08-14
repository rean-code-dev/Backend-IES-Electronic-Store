
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CategoryPageDash from './dashboard_admin/category_page/CategoryPageDash';
import HomePageDash from './dashboard_admin/home_page/HomePageDash';
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
