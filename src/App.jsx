import About from "./Sections/About";
import Clients from "./Sections/Clients";
import Hero from "./Sections/Hero";
import Navbar from "./Sections/Navbar";
import Projects from "./Sections/Projects";

const App = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar/>
      <Hero/>
      <About/>
      <Projects/>
      <Clients/>
    </main>
  );
};

export default App;
