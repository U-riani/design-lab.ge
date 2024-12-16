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

function App() {
  return (
    <LocalStorageProvider>
      <Router>
        <Routes>
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
            <Route path='aboutUs' element={<AboutUsPage />} />
            <Route path='news' element={<NewsPage />} />
            <Route path='partners' element={<PartnersPage />} />
            <Route path='designers' element={<DesignersPage />} />
            <Route path='contact' element={<ContactPage />} />
            <Route path='reservation' element={<ReservationPage />} />
          </Route>
        </Routes>
      </Router>
    </LocalStorageProvider>
  );
}

export default App;
