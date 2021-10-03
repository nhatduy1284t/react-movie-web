import './App.css';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { HomeTemplate } from './Templates/HomeTemplate/HomeTemplate';
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import News from './Pages/News/News';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Detail from './Pages/Detail/Detail';
import CheckoutTemplate from './Templates/CheckoutTemplate/CheckoutTemplate';
import { UserTemplate } from "./Templates/UserTemplate/UserTemplate";
import Checkout from './Pages/Checkout/Checkout';
import { lazy, Suspense } from "react"
import Loading from './components/Loading/Loading';
import Profile from './Pages/Profile/Profile';
import AdminTemplate from './Templates/AdminTemplate/AdminTemplate';
import DashBoard from './Pages/Admin/DashBoard/DashBoard';
import Films from './Pages/Admin/Films/Films'
import ShowTime from './Pages/Admin/ShowTime/ShowTime'
import AddNew from './Pages/Admin/Films/AddNew/AddNew';
import Edit from './Pages/Admin/Films/Edit/Edit';

const CheckoutTemplateLazy = lazy(() => import('./Templates/CheckoutTemplate/CheckoutTemplate'))
export const history = createBrowserHistory();

function App() {
  console.log(window.innerHeight)
  return (
    <Router history={history}>
      <Loading/>
      <Switch>
        <HomeTemplate path='/' exact Component={Home} />
        <HomeTemplate path='/home' exact Component={Home} />
        <HomeTemplate path='/contact' exact Component={Contact} />
        <HomeTemplate path='/news' exact Component={News} />
        <HomeTemplate path='/detail/:id' exact Component={Detail} />
 

        <UserTemplate path='/login' exact Component={Login} />
        <UserTemplate path='/register' exact Component={Register} />
        <UserTemplate path='/profile' exact Component={Profile} />

        <AdminTemplate path="/admin" exact Component={DashBoard} />
        <AdminTemplate path="/admin/dashboard" exact Component={DashBoard} />
        
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/films/showtime/:id/:tenPhim" exact Component={ShowTime} />
        <AdminTemplate path="/admin/dashboard" exact Component={DashBoard} />
        
        
        <Suspense fallback={<h1>LOADING...</h1>}>
          <CheckoutTemplateLazy path="/checkout/:id" exact Component={Checkout} />
        </Suspense>

      </Switch>
    </Router>

  );
}

export default App;
