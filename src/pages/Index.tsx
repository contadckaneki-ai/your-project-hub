import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PricingComparison from "@/components/PricingComparison";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Banner />
      <Navbar />
      <Hero />
      <Features />
      <PricingComparison />
      <Footer />
    </div>
  );
};

export default Index;
