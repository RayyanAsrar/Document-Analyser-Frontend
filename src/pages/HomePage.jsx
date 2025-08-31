import CTA from "../components/CTA";
import Features from "../components/Features";
import Flow from "../components/Flow";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { Navbar } from "../components/Navbar";
import Problem from "../components/Problem";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <Hero />
        <Problem />
        <Features />
        <Flow />
        <CTA />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
