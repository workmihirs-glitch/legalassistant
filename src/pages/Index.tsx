import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Mission />
      <Services />
      <WhyChooseUs />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
