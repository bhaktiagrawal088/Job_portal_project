
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home/Home'
import Jobs from './components/Jobs/Jobs'
import Browse from './components/Browse/Browse'
import Profile from './components/Profile/Profile'
import JobDescription from './components/Jobs/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/companySetup'
import CompanyJobs from './components/admin/CompanyJobs'
import PostNewJobs from './components/admin/PostNewJobs'
import Applicants from './components/admin/Applicants'
import ProtectRoute from './components/admin/ProtectRoute'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path:'/jobs',
    element: <Jobs/>
  },
  {
    path: '/description/:id',
    element: <JobDescription/>
  },
  {
    path: "/browse",
    element:<Browse/>
  },
  {
    path : "/profile",
    element: <Profile/>
  },
  {
    path : "/admin/companies",
    element :<ProtectRoute><Companies/></ProtectRoute> 
  },
  {
    path: "/admin/companies/create",
    element: <ProtectRoute><CreateCompany/></ProtectRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectRoute><CompanySetup/></ProtectRoute>
  },
  {
    path : "/admin/jobs",
    element : <ProtectRoute><CompanyJobs/></ProtectRoute>
  },
  
  {
    path: "/admin/jobs/create",
    element : <ProtectRoute><PostNewJobs/></ProtectRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectRoute><Applicants/></ProtectRoute>
  }
])
function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
