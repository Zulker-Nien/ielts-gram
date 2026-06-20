"use client";

import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Skills from "@/app/components/Skills";
import Services from "@/app/components/Services";
import Pricing from "@/app/components/Pricing";
import Stats from "@/app/components/Stats";
import Timeline from "@/app/components/Timeline";
import Testimonials from "@/app/components/Testimonials";
import BandScoreCalc from "@/app/components/BandScoreCalc";
import Faq from "@/app/components/Faq";
import ContactForm from "@/app/components/ContactForm";
import Footer from "@/app/components/Footer";
import BackToTop from "@/app/components/BackToTop";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-theme-surface transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Pricing />
        <Stats />
        <Timeline />
        <Testimonials />
        <BandScoreCalc />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
