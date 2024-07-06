import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AppRouter from "./components/appRouter/AppRouter";
import { CookiesProvider } from "react-cookie";
import "./App.css";
import "./index.css";

function App() {
  return (
    <CookiesProvider
      defaultSetOptions={{
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      }}
    >
      <div className="w-full min-h-screen flex flex-col justify-between font-montserrat">
        <Navbar />
        <div className="grow">
          <AppRouter />
        </div>
        <Footer />
      </div>
    </CookiesProvider>
  );
}

export default App;
