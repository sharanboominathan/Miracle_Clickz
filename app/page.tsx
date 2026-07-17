import Experience from "@/components/Experience";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Story from "@/components/Story";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Films from "@/components/Films";
import Testimonials from "@/components/Testimonials";
import InstagramSection from "@/components/InstagramSection";
import Process from "@/components/Process";
import Awards from "@/components/Awards";
import Faq from "@/components/Faq";
import BookNow from "@/components/BookNow";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <Experience>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Portfolio />
        <Story />
        <Services />
        <Stats />
        <Films />
        <Testimonials />
        <InstagramSection />
        <Process />
        <Awards />
        <Faq />
        <BookNow />
      </main>
      <Footer />
    </Experience>
  );
}
