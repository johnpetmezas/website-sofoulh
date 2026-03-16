import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import {
  Menu, X, ChevronRight, ArrowRight,
  Plus, Minus, ArrowUpRight,
  Mail, MapPin, Phone
} from 'lucide-react';

const IMAGES = {
  hero: "/kouzina hero.png",
  kitchen: "/kouz2.png",
  wardrobe: "/doul2.png",
  door: "https://images.unsplash.com/photo-1517646288024-aa24d14bc280?auto=format&fit=crop&q=80&w=1200",
  detail: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200",
  gallery: [
    "/trapez8.png",
    "/kouz2.png",
    "/kouz3.png",
    "/kouz4.png",
    "/kouz5.png",
    "/kouz6.png",
    "/kouz7.png",
  ],
  wardrobes: [
    "/kom2.png",
    "/kom3.png",
    "/kom4.png",
    "/kom5.png",
    "/kom6.png"
  ]
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/80 backdrop-blur-2xl py-6' : 'bg-transparent py-10'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div className="flex items-center gap-12 mr-auto -ml-8">
          <a
            href="tel:697059941"
            className="text-white/40 hover:text-white transition-all duration-300 cursor-pointer p-2 rounded-full hover:bg-white/5 focus-visible:outline-white"
            aria-label="Call us"
          >
            <Phone size={18} strokeWidth={1.5} />
          </a>
          <a href="/" className="text-xl tracking-[0.4em] font-light hover:text-white transition-colors cursor-pointer focus-visible:outline-white">
            Σοφούλης
          </a>
        </div>

        <div className="hidden md:flex gap-12 text-[10px] tracking-[0.3em] font-medium text-white/40 mr-12">
          <a href="#collections" className="hover:text-white transition-colors">Συλλογές</a>
          <a href="#philosophy" className="hover:text-white transition-colors">Φιλοσοφία</a>
          <a href="#contact" className="hover:text-white transition-colors">Επικοινωνία</a>
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
              <a href="#collections" onClick={() => setIsOpen(false)} className="hover:italic transition-all">Συλλογές</a>
              <a href="#philosophy" onClick={() => setIsOpen(false)} className="hover:italic transition-all">Φιλοσοφία</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="hover:italic transition-all">Επικοινωνία</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PremiumButton = ({ text, onClick, href, icon: Icon, className }: any) => {
  const Component = href ? motion.a : motion.button;
  return (
    <div className={`relative group ${className}`}>
      {/* Outer Glow / Ambient Light */}
      <div className="absolute -inset-[2px] bg-white/5 rounded-full blur-[4px] opacity-0 group-hover:opacity-100 transition duration-700" />
      
      <Component
        href={href}
        target={href?.startsWith('http') ? "_blank" : undefined}
        rel={href?.startsWith('http') ? "noreferrer" : undefined}
        onClick={onClick}
        className="relative px-6 py-4 md:px-12 md:py-5 bg-black/80 rounded-full border border-white/20 overflow-hidden flex items-center justify-center gap-4 cursor-pointer focus:outline-none backdrop-blur-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Thick Glass Top Edge highlight */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" />
        
        {/* Internal Gradient / Lens effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
        
        {/* Central Glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-1/2 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors duration-500" />

        {/* Animated Inner Shine */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full opacity-0 pointer-events-none"
            animate={{
              y: [20, -40],
              opacity: [0, 0.4, 0],
              x: i % 2 === 0 ? [0, 15, 0] : [0, -15, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${15 + i * 14}%`,
              bottom: '0%'
            }}
          />
        ))}

        {/* Moving Nebula/Smoke inside */}
        <motion.div
          className="absolute -inset-10 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-2xl pointer-events-none"
          animate={{
            x: [-30, 30, -30],
            y: [-15, 15, -15],
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        <span className="relative z-10 text-lg md:text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,1)] transition-all duration-700 text-center tracking-tight">
          {text}
        </span>
        
        {Icon && (
          <Icon 
            size={20} 
            className="relative z-10 text-white/80 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
          />
        )}
      </Component>
    </div>
  );
};

const BusinessCard = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  function onMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="relative group perspective-[1200px] w-full max-w-[500px] mx-auto">
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full aspect-[1.58/1] rounded-[1.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer"
      >
        {/* Real-time Glossy Light Reflection */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{ transform: "translateZ(100px)" }}
        />

        {/* The Authentic Business Card Image */}
        <div className="absolute inset-0" style={{ transform: "translateZ(50px)" }}>
          <img 
            src="/kartalast2-Photoroom.png" 
            alt="Επαγγελματική Κάρτα Σοφούλης" 
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>

        {/* Backdrop Glow for depth */}
        <div className="absolute -inset-4 bg-white/5 blur-[40px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </motion.div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const GalleryModal = ({ isOpen, onClose, images }: { isOpen: boolean, onClose: () => void, images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-all z-[110] p-2 hover:bg-white/5 rounded-full"
          >
            <X size={32} strokeWidth={1} />
          </button>

          {/* Carousel Container */}
          <div className="relative w-full max-w-7xl h-[45vh] md:h-[55vh] flex items-center justify-center">
            {/* Ambient Background Glow behind center image */}
            <div className="absolute w-[40%] aspect-[3/4] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />
            
            <div className="relative w-full h-full flex items-center justify-center perspective-[2500px]">
              {images.map((src, idx) => {
                const isCenter = idx === currentIndex;
                const isLeft = idx === (currentIndex - 1 + images.length) % images.length;
                const isRight = idx === (currentIndex + 1) % images.length;
                
                if (!isCenter && !isLeft && !isRight) return null;

                return (
                  <motion.div
                    key={idx}
                    initial={false}
                    animate={{
                      x: isCenter ? 0 : isLeft ? '-75%' : '75%',
                      scale: isCenter ? 1 : 0.75,
                      opacity: isCenter ? 1 : 0.4,
                      zIndex: isCenter ? 50 : 20,
                      rotateY: isCenter ? 0 : isLeft ? 15 : -15,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 25,
                      mass: 1
                    }}
                    className={`absolute w-[75%] md:w-[40%] lg:w-[32%] aspect-[3/4] md:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] ${isCenter ? 'shadow-[0_40px_100px_-15px_rgba(255,255,255,0.15)] md:shadow-[0_60px_120px_-20px_rgba(255,255,255,0.1)]' : 'shadow-2xl'}`}
                  >
                    <img
                      src={src}
                      alt={`Gallery work ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {!isCenter && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls - Matching the example photo style */}
          <div className="flex items-center gap-6 mt-16">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all duration-500"
              aria-label="Previous image"
            >
              <ArrowRight size={22} className="rotate-180" />
            </button>
            
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all duration-500"
              aria-label="Next image"
            >
              <ArrowRight size={22} />
            </button>
          </div>

          {/* Subtle Dots indicator */}
          <div className="flex gap-2.5 mt-10">
            {images.map((_, i) => (
              <div 
                key={i}
                className={`w-1 h-1 rounded-full transition-all duration-1000 ${i === currentIndex ? 'bg-white w-4' : 'bg-white/10'}`}
              />
            ))}
          </div>
          {/* Counter Overlay */}
          <div className="absolute bottom-12 text-white/20 text-[10px] tracking-[0.5em] font-medium uppercase">
            {currentIndex + 1} &nbsp; / &nbsp; {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [activeGallery, setActiveGallery] = useState<string[] | null>(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <GalleryModal
        isOpen={!!activeGallery}
        onClose={() => setActiveGallery(null)}
        images={activeGallery || []}
      />

      {/* Hero - Minimalist & Smooth */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Top LED Accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-20 shadow-[0_0_20px_rgba(255,255,255,0.3)]" />

        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={IMAGES.hero}
            alt="Ξυλουργείο Σοφούλης - Χειροποίητες Ξυλουργικές Δημιουργίες στο Ζευγολατιό"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-4 md:px-8">
          <FadeIn>
            <span className="text-[10px] tracking-[0.6em] text-white/40 mb-8 block">
              Ζευγολατιό, Κορινθίας • Από το 1975
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-[8rem] font-serif font-light tracking-tighter leading-none mb-8 md:mb-12">
              Ξυλουργείο <br /><span className="italic font-light">Σοφούλης</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex justify-center flex-col items-center gap-8">
              <p className="max-w-xl text-lg md:text-xl font-light text-white/60 mb-4">
                Εκπληκτική δουλειά για απαιτητικούς πελάτες. Ειδικές κατασκευές για πελάτες με φαντασία και άποψη.
              </p>
              <button className="group flex flex-col items-center gap-4">
                <span className="text-[10px] tracking-[0.4em] text-white/60 group-hover:text-white transition-colors">
                  Ανακαλύψτε
                </span>
                <div className="w-px h-16 bg-white/20 relative overflow-hidden">
                  <motion.div
                    animate={{ y: [0, 64] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full h-8 bg-white"
                  />
                </div>
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Subtle LED Accent */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </section>

      {/* Collections - Clean Split Layout */}
      <section id="collections" className="py-24 md:py-40 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tighter">Οι Συλλογές μας</h2>
              <p className="text-white/40 font-light max-w-2xl mx-auto text-xl">
                Αναλαμβάνουμε να 'ντύσουμε' το σπίτι σας με υλικά Α' ποιότητας.
                Έπιπλα Κουζίνας, Ντουλάπες, Πόρτες Εσωτερικού & Εξωτερικού Χώρου, Πέργολες, Σκεπές και Χαγιάτια.
              </p>
            </FadeIn>
          </div>
          <div className="flex flex-row flex-nowrap items-center gap-[15px] lg:gap-32 mb-32 md:mb-40">
            <div className="w-1/2 relative group">
              {/* Graphic Accent - Dark Gray #A9A9A9 (RGB: 169, 169, 169) */}
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#A9A9A9]/25 -z-10 rounded-[2.5rem]" />
              <FadeIn className="h-full">
                <div
                  className="aspect-[4/5] overflow-hidden bg-[#111] cursor-pointer relative rounded-[2.5rem] shadow-2xl"
                  onClick={() => setActiveGallery(IMAGES.gallery)}
                >
                  <img
                    src={IMAGES.kitchen}
                    alt="Σχεδιασμός και Κατασκευή Κουζίνας - Ξυλουργείο Σοφούλης"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <Plus size={32} strokeWidth={1} className="text-white" />
                      <span className="text-[10px] tracking-[0.4em]">Προβολή Gallery</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className="w-1/2 flex flex-col justify-center">
              <FadeIn delay={0.2}>
                <span className="text-[8px] md:text-[10px] tracking-[0.4em] text-white/60 mb-4 md:mb-6 block font-bold">01 / Έπιπλα Κουζίνας</span>
              </FadeIn>
              <FadeIn delay={0.4}>
                <h3 className="text-xl md:text-4xl font-light mb-4 md:mb-8 leading-tight">Σχεδιασμός Κουζίνας & Σαλονιού</h3>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p className="text-xs md:text-xl text-white/40 font-light leading-relaxed mb-6 md:mb-10 line-clamp-4 md:line-clamp-none">
                  Χειροποίητες δημιουργίες από υλικά πρώτης ποιότητας, πάντα όμως ακολουθώντας την τάση της εποχής.
                </p>
              </FadeIn>
              <FadeIn delay={0.8}>
                <div className="flex gap-2 md:gap-4 flex-wrap">
                  <PremiumButton 
                    text="Δείτε τις Κουζίνες"
                    onClick={() => setActiveGallery(IMAGES.gallery)}
                    icon={ArrowUpRight}
                    className="scale-75 md:scale-100 origin-left"
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="flex flex-row-reverse flex-nowrap items-center gap-[15px] lg:gap-32">
            <div className="w-1/2 relative group">
              {/* Graphic Accent - Dark Gray #A9A9A9 (RGB: 169, 169, 169) */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-[#A9A9A9]/25 -z-10 rounded-[2.5rem]" />
              <FadeIn className="h-full">
                <div 
                  className="aspect-[4/5] overflow-hidden bg-[#111] cursor-pointer relative rounded-[2.5rem] shadow-2xl"
                  onClick={() => setActiveGallery(IMAGES.wardrobes)}
                >
                  <img
                    src={IMAGES.wardrobe}
                    alt="Χειροποίητες Συρόμενες Ντουλάπες και Εσωτερικές Πόρτες - Ξυλουργείο Σοφούλης"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[20%]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <Plus size={32} strokeWidth={1} className="text-white" />
                      <span className="text-[10px] tracking-[0.4em]">Προβολή Gallery</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className="w-1/2 flex flex-col justify-center text-right lg:text-left">
              <FadeIn delay={0.2}>
                <span className="text-[8px] md:text-[10px] tracking-[0.4em] text-white/60 mb-4 md:mb-6 block font-bold">02 / Ντουλάπες</span>
              </FadeIn>
              <FadeIn delay={0.4}>
                <h3 className="text-xl md:text-4xl font-light mb-4 md:mb-8 leading-tight">Ντουλάπες Συρόμενες</h3>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p className="text-xs md:text-xl text-white/40 font-light leading-relaxed mb-6 md:mb-10 line-clamp-4 md:line-clamp-none">
                  Πρακτικές και κομψές λύσεις εξοικονόμησης χώρου για το υπνοδωμάτιο σας.
                </p>
              </FadeIn>
              <FadeIn delay={0.8}>
                <div className="flex gap-2 md:gap-4 flex-wrap justify-end lg:justify-start">
                  <PremiumButton 
                    text="Δείτε τις Ντουλάπες"
                    onClick={() => setActiveGallery(IMAGES.wardrobes)}
                    icon={ArrowUpRight}
                    className="scale-75 md:scale-100 origin-right lg:origin-left"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy - Immersive & Smooth */}
      <section id="philosophy" className="py-24 md:py-40 bg-[#050505] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-7xl font-extralight tracking-tighter mb-12 md:mb-16">
              Ζούμε Για Να <span className="italic">Δημιουργούμε</span>
            </h2>
            <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl mx-auto mb-20 italic">
              "Στόχος μας η ποιότητα και η αντοχή των κατασκευών μας στο χρόνο. <br /> Κύριο μέλημά μας, το χαμόγελό σας!"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: 'Μαζί σας από το', value: '1975' },
                { label: 'Συνδυασμός', value: 'Ποιότητας & Τιμής' },
                { label: 'Κατασκευές', value: 'Ειδικές - Χειροποίητες' }
              ].map((stat, i) => (
                <div key={i} className="border-t border-white/10 pt-8">
                  <div className="text-2xl md:text-3xl font-light mb-2">{stat.value}</div>
                  <div className="text-[10px] tracking-[0.4em] text-white/30">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Decorative Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Professional Identity Section - High-end Split Layout */}
      <section className="py-24 md:py-40 px-6 md:px-8 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            {/* Left Column: Interactive 3D Card UI */}
            <div className="order-1">
              <FadeIn>
                <div className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white mb-4">
                    Η Επαγγελματική μας Κάρτα
                  </h2>
                  <div className="w-20 h-px bg-white/20" />
                </div>
                
                <BusinessCard />
              </FadeIn>
            </div>

            {/* Right Column: Narrative */}
            <div className="order-2 lg:pl-12">
              <FadeIn delay={0.3}>
                <div className="space-y-8">
                  <div className="inline-block px-4 py-1 border border-white/10 rounded-full text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4">
                    Crafting Excellence
                  </div>
                  <p className="text-xl md:text-2xl text-white font-serif font-light leading-relaxed">
                    Η επιχείρησή μας συνδυάζει την <span className="italic">πλούσια παράδοση</span> της ξυλουργικής με τη σύγχρονη αισθητική του design.
                  </p>
                  <div className="w-full h-px bg-white/5" />
                  <p className="text-lg text-white/60 font-sans font-light leading-loose">
                    Με έδρα το Ζευγολατιό, δημιουργούμε εξατομικευμένες κατασκευές που είναι φτιαγμένες για να αντέχουν, 
                    δίνοντας έμφαση στην ακρίβεια, τη δεξιοτεχνία και την προσωπική εξυπηρέτηση. Κάθε κομμάτι που 
                    βγαίνει από το εργαστήριό μας αφηγείται μια ιστορία ποιότητας και φροντίδας.
                  </p>
                  <div className="pt-8">
                    <PremiumButton 
                      href="#contact"
                      text="Συζητήστε το Project σας"
                      icon={ArrowUpRight}
                    />
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* Contact - Clean & Minimal */}
      <section id="contact" className="py-24 md:py-40 px-6 md:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
            <div>
              <FadeIn>
                <h2 className="text-5xl font-light tracking-tighter mb-12">Επικοινωνήστε <br />Μαζί Μας</h2>
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-px h-10 bg-white/40" />
                    <div>
                      <div className="text-[9px] tracking-widest text-white/30 mb-1">Ξυλουργείο</div>
                      <div className="text-sm font-light">Νικ. Πλαστήρα 5, Ζευγολατειό</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-px h-10 bg-white/40" />
                    <div>
                      <div className="text-[9px] tracking-widest text-white/30 mb-1">Πληροφορίες & Προσφορές</div>
                      <div className="text-sm font-light">Σοφούλης Γιάννης • <a href="tel:697059941" className="hover:text-white transition-colors">697059941</a></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-px h-10 bg-white/40" />
                    <div>
                      <div className="text-[9px] tracking-widest text-white/30 mb-1">Social Media</div>
                      <a href="https://www.facebook.com/profile.php?id=100091321404145" target="_blank" rel="noreferrer" className="text-sm font-light hover:underline text-blue-400">
                        Βρείτε μας στο Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="space-y-12">
                <h3 className="text-2xl font-light mb-8">Για Πελάτες με Φαντασία & Άποψη!</h3>
                <p className="text-white/40 font-light leading-relaxed text-xl">
                  Επικοινωνήστε μαζί μας για να συζητήσουμε τις ειδικές κατασκευές σας, είτε για το σπίτι, είτε για την επιχείρησή σας. Οι δημιουργίες μας απευθύνονται σε πελάτες με έντονο ταπεραμέντο και σε ανθρώπους που εκτιμούν την τέχνη του φυσικού ξύλου.
                </p>
                <PremiumButton 
                  href="https://www.facebook.com/profile.php?id=100091321404145"
                  text="Στειλτε μας Μηνυμα"
                  className="mt-8"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[500px] opacity-90 hover:opacity-100 transition-opacity duration-1000">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://maps.google.com/maps?q=%CE%9D%CE%B9%CE%BA.%20%CE%A0%CE%BB%CE%B1%CF%83%CF%84%CE%AE%CF%81%CE%B1%205%2C%20%CE%96%CE%B5%CF%85%CE%B3%CE%BF%CE%BB%CE%B1%CF%84%CE%B5%CE%B9%CF%8C%20200%2001&t=&z=16&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </section>

      {/* Footer - Ultra Minimal */}
      <footer className="py-20 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-sm tracking-[0.3em] font-light">ΣΟΦΟΥΛΗΣ ΓΙΑΝΝΗΣ</span>
            <span className="text-[10px] font-light text-white/30 tracking-wider">ΞΥΛΟΥΡΓΙΚΕΣ ΕΡΓΑΣΙΕΣ ΑΠΟ ΤΟ 1975</span>
          </div>
          <div className="flex gap-12 text-[9px] tracking-[0.3em] text-white/30">
            <a href="https://www.facebook.com/profile.php?id=100091321404145" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
            <span className="text-white/30">Giannis Chepeto</span>
            <span className="text-white/30">Μαρία Κωνσταντίνου Σοφούλη</span>
          </div>
          <span className="text-[9px] tracking-[0.3em] text-white/20">
            © 2026 Όλα τα δικαιώματα διατηρούνται
          </span>
        </div>
      </footer>
    </div>
  );
}
