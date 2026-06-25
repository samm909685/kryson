import { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Quality from "./components/Quality";
import Vision from "./components/Vision";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loader */}
      {loading && <Loader />}

      {/* Website */}
      <div className={loading ? "hidden" : "block"}>
        <Navbar />
        <Hero onVideoLoad={() => setLoading(false)} />
        <About />
        <Products />
        <Quality />
        <Vision />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;