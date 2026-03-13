/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, ArrowRight, 
  Plus, Minus, ArrowUpRight, 
  Mail, MapPin, Phone 
} from 'lucide-react';

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=2000", 
  kitchen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
  wardrobe: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200",
  door: "https://images.unsplash.com/photo-1517646288024-aa24d14bc280?auto=format&fit=crop&q=80&w=1200",
  detail: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/60 backdrop-blur-2xl py-6' : 'bg-transparent py-10'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <a href="/" className="text-xl tracking-[0.4em] font-light uppercase">
          ZEVGO
        </a>
        
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.3em] font-medium text-white/40">
          <a href="#collections" className="hover:text-white transition-colors">Collections</a>
          <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <button className="text-white/60 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={20} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-12"
          >
            <button className="absolute top-10 right-10 text-white/40 hover:text-white" onClick={() => setIsOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 text-4xl font-light tracking-tighter">
              <a href="#collections" onClick={() => setIsOpen(false)} className="hover:italic transition-all">Collections</a>
              <a href="#philosophy" onClick={() => setIsOpen(false)} className="hover:italic transition-all">Philosophy</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="hover:italic transition-all">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero - Minimalist & Smooth */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Top LED Accent - Matching user image */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-20 shadow-[0_0_20px_rgba(0,180,255,0.3)]" />

        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={IMAGES.hero} 
            alt="Minimalist Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-8">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-8 block">
              Precision Woodworking
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-7xl md:text-[10rem] font-extralight tracking-tighter leading-none mb-12">
              Pure <span className="italic font-light">Form</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex justify-center">
              <button className="group flex flex-col items-center gap-4">
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors">
                  Discover
                </span>
                <div className="w-px h-16 bg-white/20 relative overflow-hidden">
                  <motion.div 
                    animate={{ y: [0, 64] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full h-8 bg-accent"
                  />
                </div>
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Subtle LED Accent */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </section>

      {/* Collections - Clean Split Layout */}
      <section id="collections" className="py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-40">
            <FadeIn>
              <div className="aspect-[4/5] overflow-hidden bg-[#111]">
                <img 
                  src={IMAGES.kitchen} 
                  alt="Kitchen" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
            <div className="max-w-md">
              <FadeIn delay={0.2}>
                <span className="text-[9px] uppercase tracking-[0.4em] text-accent mb-6 block font-bold">01 / Kitchen Systems</span>
                <h2 className="text-5xl font-light mb-8 leading-tight">High Gloss <br />Architectural Surfaces</h2>
                <p className="text-white/40 font-light leading-relaxed mb-10">
                  Mirror-finish cabinetry engineered with sub-millimeter precision. Integrated lighting channels create a seamless transition between light and structure.
                </p>
                <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold group">
                  View Details <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center flex-row-reverse">
            <div className="lg:order-2">
              <FadeIn>
                <div className="aspect-[4/5] overflow-hidden bg-[#111]">
                  <img 
                    src={IMAGES.wardrobe} 
                    alt="Wardrobe" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
            </div>
            <div className="max-w-md lg:ml-auto">
              <FadeIn delay={0.2}>
                <span className="text-[9px] uppercase tracking-[0.4em] text-accent mb-6 block font-bold">02 / Storage Systems</span>
                <h2 className="text-5xl font-light mb-8 leading-tight">Minimalist <br />Wardrobe Solutions</h2>
                <p className="text-white/40 font-light leading-relaxed mb-10">
                  Intelligent storage that disappears into the architecture. Soft-close mechanisms and hidden hinges ensure a silent, fluid experience.
                </p>
                <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold group">
                  View Details <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy - Immersive & Smooth */}
      <section id="philosophy" className="py-40 bg-[#050505] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-6xl md:text-8xl font-extralight tracking-tighter mb-16">
              The Science of <span className="italic">Silence</span>
            </h2>
            <p className="text-xl text-white/50 font-light leading-relaxed max-w-2xl mx-auto mb-20">
              We believe that true luxury is felt, not heard. Our engineering focus is on the fluid motion of every component, creating a home environment that breathes with you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: 'Precision', value: '0.01mm' },
                { label: 'Reflectivity', value: '98%' },
                { label: 'Durability', value: 'Lifetime' }
              ].map((stat, i) => (
                <div key={i} className="border-t border-white/10 pt-8">
                  <div className="text-3xl font-light mb-2">{stat.value}</div>
                  <div className="text-[9px] uppercase tracking-[0.4em] text-white/30">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
        
        {/* Decorative Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Contact - Clean & Minimal */}
      <section id="contact" className="py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <FadeIn>
                <h2 className="text-6xl font-light tracking-tighter mb-12">Initiate <br />Conversation</h2>
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-px h-10 bg-accent" />
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Studio</div>
                      <div className="text-sm font-light">Zevgolatio, Corinthia, Greece</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-px h-10 bg-accent" />
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Inquiries</div>
                      <div className="text-sm font-light">studio@zevgo.design</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <form className="space-y-12">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/30">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-colors font-light" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/30">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-colors font-light" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/30">Project Vision</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-colors resize-none font-light" />
                </div>
                <button className="text-[10px] uppercase tracking-[0.5em] font-bold border border-white/20 px-12 py-5 hover:bg-white hover:text-black transition-all">
                  Send Message
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer - Ultra Minimal */}
      <footer className="py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <span className="text-sm tracking-[0.5em] font-light">ZEVGO</span>
          <div className="flex gap-12 text-[9px] uppercase tracking-[0.3em] text-white/30">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">
            © 2026 Zevgo Design Studio
          </span>
        </div>
      </footer>
    </div>
  );
}
