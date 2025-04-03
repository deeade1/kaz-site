import React from "react"; 
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Faq from './pages/faq';
import About from './pages/about';
import Feature from './pages/features';
import CategoryList from "./pages/e-commerce/categories-list";
import Invoice from "./pages/e-commerce/invoice";
import OrderProcess from "./pages/e-commerce/order-process";
import ProductDetail from './pages/e-commerce/product-detail';
import ShopMain from "./pages/e-commerce/shop-main";
import Blog from './pages/blogs/blog';
import BlogDetail from './pages/blogs/blog-detail';
import ContactUs from './pages/contact-us';
import Error404 from './pages/error404';
// auth
import ConfirmMail from './pages/auth/confirm-mail'
import LockScreen from './pages/auth/lock-screen'
import Recoverpw from './pages/auth/recoverpw'
import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up'
import UserProfile from "./pages/auth/user-profile";
import UpdateUser from "./pages/auth/update-user";
import UserList from "./pages/auth/user-list";
 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root  />,
    errorElement: <Error404 />,
    children: [
      { path: '', element: <Home /> },
      { path: 'faq', element: <Faq /> },
      { path: 'about', element: <About /> },
      { path: 'features', element: <Feature /> },
      { path: 'blog/blog', element: <Blog /> },
      { path: 'blog/blog-detail/:id', element: <BlogDetail /> },
      { path: 'contact-us', element: <ContactUs /> },
     
      { path: 'products/shop', element: <ShopMain />},
      { path: 'products/product-detail/:id', element: <ProductDetail /> },
      { path: 'auth/user-list', element: <UserList /> },
      { path: 'auth/user-profile', element: <UserProfile /> },
      { path: 'auth/update-user', element: <UpdateUser /> }

    ],
  },
  { path: 'auth/sign-in', element: <SignIn /> },
  { path: 'auth/sign-up', element: <SignUp /> },
  { path: 'auth/confirm-mail', element: <ConfirmMail /> },
  { path: 'auth/lock-screen', element: <LockScreen /> },
  { path: 'auth/recoverpw', element: <Recoverpw /> }
  
]);

export default router;
