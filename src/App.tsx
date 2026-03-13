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
  wardrobe: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200",
  door: "https://images.unsplash.com/photo-1517646288024-aa24d14bc280?auto=format&fit=crop&q=80&w=1200",
  detail: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200",
  gallery: [
    "/kouz1.png",
    "/kouz2.png",
    "/kouz3.png",
    "/kouz4.png",
    "/kouz5.png",
    "/kouz6.png",
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
        <a href="/" className="text-xl tracking-[0.4em] font-light uppercase mr-auto">
          ΣΟΦΟΥΛΗΣ
        </a>
        
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mr-12">
          <a href="#collections" className="hover:text-white transition-colors">Συλλογες</a>
          <a href="#philosophy" className="hover:text-white transition-colors">Φιλοσοφια</a>
          <a href="#contact" className="hover:text-white transition-colors">Επικοινωνια</a>
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
                  alt={`Gallery Image ${idx + 1}`} 
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <GalleryModal 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
        images={IMAGES.gallery} 
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
            alt="Interior Woodworking" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-8">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-8 block">
              Ζευγολατιο, Κορινθιας • Απο το 1975
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-[8rem] font-serif font-light tracking-tighter leading-none mb-12 uppercase">
              Ξυλουργικες <br /><span className="italic font-light normal-case">Δημιουργίες</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex justify-center flex-col items-center gap-8">
              <p className="max-w-xl text-sm md:text-base font-light text-white/60 mb-4">
                Εκπληκτική δουλειά για απαιτητικούς πελάτες. Ειδικές κατασκευές για πελάτες με φαντασία και άποψη.
              </p>
              <button className="group flex flex-col items-center gap-4">
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors">
                  Ανακαλυψτε
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
      <section id="collections" className="py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tighter">Οι Συλλογές μας</h2>
              <p className="text-white/40 font-light max-w-2xl mx-auto">
                Αναλαμβάνουμε να 'ντύσουμε' το σπίτι σας με υλικά Α' ποιότητας. 
                Έπιπλα Κουζίνας, Ντουλάπες, Πόρτες Εσωτερικού & Εξωτερικού Χώρου, Πέργολες, Σκεπές και Χαγιάτια.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-40">
            <FadeIn>
              <div 
                className="aspect-[4/5] overflow-hidden bg-[#111] cursor-pointer group relative"
                onClick={() => setIsGalleryOpen(true)}
              >
                <img 
                  src={IMAGES.kitchen} 
                  alt="Σύνθεση Κουζίνας" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="flex flex-col items-center gap-4">
                      <Plus size={32} strokeWidth={1} className="text-white" />
                      <span className="text-[10px] uppercase tracking-[0.4em]">Προβολη Gallery</span>
                   </div>
                </div>
              </div>
            </FadeIn>
            <div className="max-w-md">
              <FadeIn delay={0.2}>
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/60 mb-6 block font-bold">01 / ΕΠΙΠΛΑ ΚΟΥΖΙΝΑΣ & ΣΑΛΟΝΙΟΥ</span>
                <h2 className="text-4xl font-light mb-8 leading-tight">Συνδυασμός <br />Ποιότητας & Τιμής</h2>
                <p className="text-white/40 font-light leading-relaxed mb-10">
                  Χειροποίητες δημιουργίες από υλικά πρώτης ποιότητας, πάντα όμως ακολουθώντας την τάση της εποχής. Σας υποσχόμαστε ένα εξαιρετικό αποτέλεσμα με διαχρονικό και όμορφο, φυσικό δρυ!
                </p>
                <div className="flex gap-4 flex-wrap mb-10">
                   <button 
                     onClick={() => setIsGalleryOpen(true)}
                     className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold group border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
                   >
                     Δειτε τις Κουζινες <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </button>
                   <div className="w-full h-px bg-white/5 my-4" />
                   <span className="text-[10px] uppercase border border-white/20 px-4 py-2 rounded-full text-white/60">ΈπιπλοΣυνθέσεις</span>
                   <span className="text-[10px] uppercase border border-white/20 px-4 py-2 rounded-full text-white/60">Σαλόνια Α' Ποιότητας</span>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center flex-row-reverse">
            <div className="lg:order-2">
              <FadeIn>
                <div className="aspect-[4/5] overflow-hidden bg-[#111]">
                  <img 
                    src={IMAGES.wardrobe} 
                    alt="Συρόμενες Ντουλάπες" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 grayscale-[20%]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
            </div>
            <div className="max-w-md lg:ml-auto">
              <FadeIn delay={0.2}>
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/60 mb-6 block font-bold">02 / ΑΠΟΘΗΚΕΥΣΗ & ΥΠΝΟΔΩΜΑΤΙΟ</span>
                <h2 className="text-4xl font-light mb-8 leading-tight">Ντουλάπες <br />Συρόμενες</h2>
                <p className="text-white/40 font-light leading-relaxed mb-10">
                  Για να ξεκουράσουμε το χώρο σας, τον διάδρομο, το ελλειπτικό και το στατικό ποδήλατο. Πρακτικές και κομψές λύσεις εξοικονόμησης χώρου για το υπνοδωμάτιο σας.
                </p>
                <div className="flex gap-4 flex-wrap mb-10">
                   <span className="text-[10px] uppercase border border-white/20 px-4 py-2 rounded-full text-white/60">Κρεβατοκάμαρες</span>
                   <span className="text-[10px] uppercase border border-white/20 px-4 py-2 rounded-full text-white/60">Παιδικά Δωμάτια</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy - Immersive & Smooth */}
      <section id="philosophy" className="py-40 bg-[#050505] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-7xl font-extralight tracking-tighter mb-16 uppercase">
              Ζουμε για να <span className="italic normal-case">Δημιουργούμε</span>
            </h2>
            <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl mx-auto mb-20 italic">
              "Στόχος μας η ποιότητα και η αντοχή των κατασκευών μας στο χρόνο. <br/> Κύριο μέλημά μας, το χαμόγελό σας!"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: 'Μαζί σας από το', value: '1975' },
                { label: 'Συνδυασμός', value: 'Ποιότητας & Τιμής' },
                { label: 'Κατασκευές', value: 'Ειδικές - Χειροποίητες' }
              ].map((stat, i) => (
                <div key={i} className="border-t border-white/10 pt-8">
                  <div className="text-2xl md:text-3xl font-light mb-2">{stat.value}</div>
                  <div className="text-[9px] uppercase tracking-[0.4em] text-white/30">{stat.label}</div>
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
      <section id="contact" className="py-40 px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <FadeIn>
                <h2 className="text-5xl font-light tracking-tighter mb-12 uppercase">Επικοινωνηστε <br />Μαζί Μας</h2>
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-px h-10 bg-white/40" />
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Ξυλουργειο</div>
                      <div className="text-sm font-light">Ζευγολατιό Κορινθίας</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-px h-10 bg-white/40" />
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Πληροφοριες & Προσφορες</div>
                      <div className="text-sm font-light">Σοφούλης Γιάννης</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-px h-10 bg-white/40" />
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Social Media</div>
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
                 <p className="text-white/40 font-light leading-relaxed">
                    Επικοινωνήστε μαζί μας για να συζητήσουμε τις ειδικές κατασκευές σας, είτε για το σπίτι, είτε για την επιχείρησή σας. Οι δημιουργίες μας απευθύνονται σε πελάτισσες με έντονο ταπεραμέντο και σε ανθρώπους που εκτιμούν την τέχνη του φυσικού ξύλου.
                 </p>
                <a href="https://www.facebook.com/profile.php?id=100091321404145" target="_blank" rel="noreferrer"  className="inline-block text-[10px] uppercase tracking-[0.5em] font-bold border border-white/20 px-12 py-5 hover:bg-white hover:text-black transition-all mt-8">
                  Στειλτε μας Μηνυμα
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer - Ultra Minimal */}
      <footer className="py-20 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-sm tracking-[0.3em] font-light">ΣΟΦΟΥΛΗΣ ΓΙΑΝΝΗΣ</span>
            <span className="text-[10px] font-light text-white/30 tracking-wider">ΞΥΛΟΥΡΓΙΚΕΣ ΕΡΓΑΣΙΕΣ ΑΠΟ ΤΟ 1975</span>
          </div>
          <div className="flex gap-12 text-[9px] uppercase tracking-[0.3em] text-white/30">
            <a href="https://www.facebook.com/profile.php?id=100091321404145" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
            <span className="text-white/30">Giannis Chepeto</span>
            <span className="text-white/30">Μαρία Κωνσταντίνου Σοφούλη</span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">
            © 2026 Ολα τα δικαιωματα διατηρουνται
          </span>
        </div>
      </footer>
    </div>
  );
}
