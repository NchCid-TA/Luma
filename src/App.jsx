import { useEffect } from "react";
import { initSmoothScroll, ScrollTrigger } from "./lib/scroll";

import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import IntroSocialExperience from "./components/IntroSocialExperience";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    initSmoothScroll();

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <IntroSocialExperience />
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
