import About from "./Sections/About";
import Clients from "./Sections/Clients";
import Contact from "./Sections/Contact";
import Experience from "./Sections/Experience";

import Footer from "./Sections/Footer";
import Hero from "./Sections/Hero";
import Navbar from "./Sections/Navbar";
import Projects from "./Sections/Projects";
import TechStack from "./Sections/TechStack";

const App = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar/>
      <Hero/>
      <About/>
      <TechStack/>
      <Projects/>
      <Clients/>
      <Experience/>
      <Contact/>
      <Footer/>
    </main>
  );
};

export default App;
