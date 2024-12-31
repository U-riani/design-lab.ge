import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { LocalStorageProvider } from "./context/LocalStorageContext"; // Adjust path as needed
import FooterComponent from "./components/FooterComponent";
import Layout from "./Layout/Layout";
import AboutUsPage from "./pages/AboutUsPage";
import NewsPage from "./pages/NewsPage";
import PartnersPage from "./pages/PartnersPage";
import DesignersPage from "./pages/DesignersPage";
import ContactPage from "./pages/ContactPage";
import ReservationPage from "./pages/ReservationPage";
import SingleNewsPage from "./pages/SingleNewsPage";

//Admin
import ProtectedRoute from "./admin/protectedRoute/ProtectedRoute";
import { AuthProvider } from "./admin/context/AuthContext";
import LoginPage from "./admin/pages/LoginPage";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminLayout from "./admin/layout/Layout";
import AboutUs from "./admin/pages/AboutUs";
import AddAboutUsMainPage from './admin/pages/AddAboutUsMainPage'
import EditAboutUs from "./admin/pages/EditAboutUs";
import EditAboutUsMainPage from './admin/pages/EditAboutUsMainPage'
import AddHero from "./admin/pages/AddHero";
import EditHero from "./admin/pages/EditHero";
import AddPartners from "./admin/pages/AddPartners";
import EditPartners from "./admin/pages/EditPartners";
import AddNews from "./admin/pages/AddNews";
import AllNews from "./admin/pages/AllNews";
import SingleNews from "./admin/pages/SingleNews";
import AdminAddDesigner from "./admin/pages/AddDesigners";
import EditDesigners from "./admin/pages/EditDesigners";
import AllReservations from "./admin/pages/AllReservations";
import Registration from "./pages/Registration";
import ScrollToTop from "./hooks/ScrollToTop";


function App() {
  return (
    <AuthProvider>
      <LocalStorageProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/" element={<AdminLayout />}>
              <Route
                index
                element={<ProtectedRoute element={<AdminDashboard />} />}
              />
              <Route
                path='about-us'
                element={<ProtectedRoute element={<AboutUs />} />}
              />
              <Route
                path='edit-about-us'
                element={<ProtectedRoute element={<EditAboutUs />} />}
              />
              <Route
                path='add-about-us-main-page'
                element={<ProtectedRoute element={<AddAboutUsMainPage />} />}
              />
              <Route
                path='edit-about-us-main-page'
                element={<ProtectedRoute element={<EditAboutUsMainPage />} />}
              />
              <Route
                path='add-hero'
                element={<ProtectedRoute element={<AddHero />} />}
              />
              <Route
                path='edit-hero'
                element={<ProtectedRoute element={<EditHero />} />}
              />
              <Route
                path='add-partner'
                element={<ProtectedRoute element={<AddPartners />} />}
              />
              <Route
                path='edit-partners'
                element={<ProtectedRoute element={<EditPartners />} />}
              />
              <Route
                path='add-news'
                element={<ProtectedRoute element={<AddNews />} />}
              />
              <Route
                path='all-news'
                element={<ProtectedRoute element={<AllNews />} />}
              />
              <Route
                path='all-news/:newsId'
                element={<ProtectedRoute element={<SingleNews />} />}
              />
              <Route
                path='add-designer'
                element={<ProtectedRoute element={<AdminAddDesigner />} />}
              />
              <Route
                path='edit-designers'
                element={<ProtectedRoute element={<EditDesigners />} />}
              />
              <Route
                path='reservations'
                element={<ProtectedRoute element={<AllReservations />} />}
              />
            </Route>
            {/* <div className="App overflow-x-hidden min-h-screen relative">
          <header className="App-header fixed top-0 left-0 z-50">
            <Navbar />
          </header>
          <main className="relative mt-[72px]">
            <Routes>
              <Route path="/" element={<MainPage />} />
            </Routes>
          </main>
          <FooterComponent />
        </div> */}
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="aboutUs" element={<AboutUsPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="news/:newsId" element={<SingleNewsPage />} />
              <Route path="partners" element={<PartnersPage />} />
              <Route path="designers" element={<DesignersPage />} />
              <Route path="registration" element={<Registration />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="reservation" element={<ReservationPage />} />
            </Route>
          </Routes>
        </Router>
      </LocalStorageProvider>
    </AuthProvider>
  );
}

export default App;
