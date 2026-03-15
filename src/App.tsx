import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
        className="relative px-12 py-5 bg-black/80 rounded-full border border-white/20 overflow-hidden flex items-center justify-center gap-4 cursor-pointer focus:outline-none backdrop-blur-xl"
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

const GalleryModal = ({ isOpen, onClose, images }: { isOpen: boolean, onClose: () => void, images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-8 md:p-20 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[110]"
          >
            <X size={40} strokeWidth={1} />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 overflow-y-auto max-h-full no-scrollbar pt-20 pb-10"
          >
            {images.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, type: "spring", damping: 20, stiffness: 300 }}
                className="aspect-square overflow-hidden bg-white/5 group relative cursor-pointer"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`Ξυλουργική κατασκευή Σοφούλης - Δημιουργία ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/10" />
              </motion.div>
            ))}
          </motion.div>

          {/* Light-box for smooth pop-up of single photo */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="fixed inset-0 z-[120] bg-black/98 flex items-center justify-center p-4 md:p-20"
                onClick={() => setSelectedImage(null)}
              >
                <div className="relative max-w-5xl max-h-full">
                  <img
                    src={selectedImage}
                    alt="Enlarged"
                    className="w-full h-full object-contain shadow-[0_0_100px_rgba(255,255,255,0.1)]"
                  />
                  <button className="absolute top-4 right-4 text-white/60 hover:text-white">
                    <X size={32} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32 md:mb-40">
            <FadeIn>
              <div
                className="aspect-[4/5] overflow-hidden bg-[#111] cursor-pointer group relative"
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
            <div className="max-w-md">
              <FadeIn delay={0.2}>
                <span className="text-[10px] tracking-[0.4em] text-white/60 mb-6 block font-bold">01 / Έπιπλα Κουζίνας & Σαλονιού</span>
              </FadeIn>
              <FadeIn delay={0.4}>
                <h3 className="text-4xl font-light mb-8 leading-tight">Σχεδιασμός Κουζίνας & Σαλονιού</h3>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p className="text-white/40 font-light leading-relaxed mb-10 text-xl">
                  Χειροποίητες δημιουργίες από υλικά πρώτης ποιότητας, πάντα όμως ακολουθώντας την τάση της εποχής. Σας υποσχόμαστε ένα εξαιρετικό αποτέλεσμα με διαχρονικό και όμορφο στυλ!
                </p>
              </FadeIn>
              <FadeIn delay={0.8}>
                <div className="flex gap-4 flex-wrap mb-10">
                  <PremiumButton 
                    text="Δείτε τις Κουζίνες"
                    onClick={() => setActiveGallery(IMAGES.gallery)}
                    icon={ArrowUpRight}
                  />
                  <div className="w-full h-px bg-white/5 my-4" />
                  <span className="text-[10px] border border-white/20 px-4 py-2 rounded-full text-white/60">ΈπιπλοΣυνθέσεις</span>
                  <span className="text-[10px] border border-white/20 px-4 py-2 rounded-full text-white/60">Σαλόνια Α' Ποιότητας</span>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center flex-row-reverse">
            <div className="lg:order-2">
              <FadeIn>
                <div 
                  className="aspect-[4/5] overflow-hidden bg-[#111] cursor-pointer group relative"
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
            <div className="max-w-md lg:ml-auto">
              <FadeIn delay={0.2}>
                <span className="text-[10px] tracking-[0.4em] text-white/60 mb-6 block font-bold">02 / Αποθήκευση & Υπνοδωμάτιο</span>
              </FadeIn>
              <FadeIn delay={0.4}>
                <h3 className="text-4xl font-light mb-8 leading-tight">Ντουλάπες Συρόμενες & Έπιπλα Υπνοδωματίου</h3>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p className="text-white/40 font-light leading-relaxed mb-10 text-xl">
                  Για να ξεκουράσουμε το χώρο σας, τον διάδρομο, το ελλειπτικό και το στατικό ποδήλατο. Πρακτικές και κομψές λύσεις εξοικονόμησης χώρου για το υπνοδωμάτιο σας.
                </p>
              </FadeIn>
              <FadeIn delay={0.8}>
                <div className="flex gap-4 flex-wrap mb-10">
                  <PremiumButton 
                    text="Δείτε τις Ντουλάπες"
                    onClick={() => setActiveGallery(IMAGES.wardrobes)}
                    icon={ArrowUpRight}
                  />
                  <div className="w-full h-px bg-white/5 my-4" />
                  <span className="text-[10px] border border-white/20 px-4 py-2 rounded-full text-white/60">Κρεβατοκάμαρες</span>
                  <span className="text-[10px] border border-white/20 px-4 py-2 rounded-full text-white/60">Παιδικά Δωμάτια</span>
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

      {/* Community Section */}
      <section className="py-32 px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h3 className="text-2xl font-light mb-6 tracking-wider">Αγάπη για τον Τόπο μας</h3>
            <p className="text-white/50 font-light leading-relaxed">
              Είμαστε ενεργά μέλη της κοινότητας του Ζευγολατιού. Με δράσεις που καλλωπίζουν το χωριό και με προσωπικές προσφορές του Σοφούλη Γιάννη και άλλων γνωστών συμπολιτών μας, αποδεικνύουμε καθημερινά την αγάπη μας για την έδρα του Δήμου μας.
            </p>
          </FadeIn>
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
