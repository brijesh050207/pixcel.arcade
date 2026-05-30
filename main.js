import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X, Zap, Trophy, Shield, HelpCircle, Film } from 'lucide-react';

// --- INITIAL DATA ARCHITECTURE ---
const GAMES_DATA = [
  { id: '1', title: 'Cyber-Pulse 2077', price: 69.99, tag: 'RTX 5090 Enhanced', desc: 'Neural link integration mode.', img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600' },
  { id: '2', title: 'Nebula: Voyager', price: 79.99, tag: 'VR Complete Edition', desc: 'Explore 40,000 procedural algorithmic galaxies.', img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600' },
  { id: '3', title: 'Chrono-Shift', price: 59.99, tag: 'Multiplayer', desc: 'Time manipulation tactics arena physics.', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600' },
  { id: '4', title: 'Ghost Protocol: Neo', price: 49.99, tag: 'Raytracing Overdrive', desc: 'Hyper-kinetic tactical stealth simulation.', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600' },
  { id: '5', title: 'Apex Overdrive', price: 0.00, tag: 'Free To Play', desc: 'Anti-gravity combustion league racing.', img: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600' },
];

const TOURNAMENTS_DATA = [
  { id: 't1', title: 'Cyber-Pulse World Open', prize: '$250,000', date: 'June 15, 2026', format: '5v5 Neo-Scrim', badge: 'Registrations Open', tier: '⚡ Tier 1 Pro', active: true },
  { id: 't2', title: 'Chrono-Shift Master Invitations', prize: '$50,000', date: 'June 28, 2026', format: '1v1 Paradox Duel', badge: 'Registrations Open', tier: '🔮 Community Cup', active: true },
  { id: 't3', title: 'Apex Overdrive Invitational', prize: 'Trophy', date: 'Concluded', format: 'Pod Race', badge: 'Closed', tier: '🏎️ Exhibition', active: false },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const canvasRef = useRef(null);

  // --- BACKGROUND CANVAS ENGINE ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = Math.random() > 0.5 ? 'rgba(0, 255, 204, 0.3)' : 'rgba(112, 0, 255, 0.2)';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < 75; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- INTERACTION LOGIC ---
  const addToCart = (game) => {
    if (cart.find(item => item.id === game.id)) {
      alert(`${game.title} is already inside your Deck compilation module.`);
      return;
    }
    setCart([...cart, game]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your Gaming Deck compilation matrix is empty.");
    alert(`⚡ Core Connection Authorized.\nInitializing Quantum Direct Access download for ${cart.length} titles.`);
    setCart([]);
    setIsCartOpen(false);
  };

  const registerTournament = (title) => {
    alert(`Secure entry pipeline handshake confirmed for:\n[${title}]\nCheck registered Neural Link for access protocols.`);
  };

  return (
    <div className="bg-bg-primary text-white min-h-screen relative font-sans selection:bg-accent-neon selection:text-black">
      {/* Dynamic Ambient Layer */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none" />

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-40 bg-[#050508]/40 backdrop-blur-xl border-b border-white/10">
        <div className="text-2xl font-black tracking-widest bg-gradient-to-r from-accent-neon via-accent-purple to-accent-pink bg-clip-text text-transparent uppercase drop-shadow-[0_0_30px_rgba(112,0,255,0.5)]">
          Pixcel Arcade
        </div>
        <ul className="hidden md:flex gap-8 list-none">
          {['Home', 'Store', 'Tournaments', 'Arcade Pass'].map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="text-sm font-medium tracking-wider text-white hover:text-accent-neon transition-all duration-300 uppercase hover:drop-shadow-[0_0_12px_rgba(0,255,220,0.6)]">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="relative">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-accent-neon/5 border border-accent-neon/40 text-accent-neon px-5 py-2 rounded-full font-semibold text-sm hover:bg-accent-neon hover:text-bg-primary transition-all duration-300 hover:shadow-neon tracking-wider flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            DECK
          </button>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent-pink text-white rounded-full px-2 py-0.5 text-xs font-bold shadow-pink animate-pulse">
              {cart.length}
            </span>
          )}
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen flex items-center px-6 md:px-12 overflow-hidden z-10">
        <video 
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-0 object-cover opacity-45"
          autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-gaming-pc-setup-with-neon-lights-42295-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030306]/95 via-[#030306]/70 to-[#030306]/10 z-10" />
        
        <div className="max-w-2xl z-20 mt-16">
          <p className="text-accent-neon uppercase tracking-[4px] text-xs md:text-sm font-bold mb-3">Welcome to the Next Generation</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-5 uppercase bg-gradient-to-r from-white to-text-muted bg-clip-text text-transparent">
            The Future of Gaming has Arrived
          </h1>
          <p className="text-text-muted text-base md:text-lg leading-relaxed mb-8">
            Experience real-time quantum rendering, cross-metaverse playability, and ultra-high fidelity audio. Secure your entries into upcoming alpha keys and global tier-1 events.
          </p>
          <a href="#store" className="inline-block bg-gradient-to-r from-accent-purple to-accent-pink text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:-translate-y-0.5 transition-all duration-300 shadow-[0_5px_15px_rgba(112,0,255,0.4)] hover:shadow-[0_8px_25px_rgba(255,0,127,0.6)]">
            Explore Universe
          </a>
        </div>
      </section>

      {/* --- STORE GRID --- */}
      <section id="store" className="px-6 md:px-12 py-24 max-w-7xl mx-auto z-10 relative">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-center uppercase mb-16">
          Trending <span className="bg-gradient-to-r from-accent-neon to-accent-pink bg-clip-text text-transparent">Quantum Titles</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {GAMES_DATA.map((game) => (
            <GameCard key={game.id} game={game} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* --- TOURNAMENTS SECTION --- */}
      <section id="tournaments" className="bg-gradient-to-b from-[#09090f] to-bg-primary px-6 md:px-12 py-24 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-center uppercase mb-16">
            Live <span className="bg-gradient-to-r from-accent-neon to-accent-pink bg-clip-text text-transparent">Esports Arenas</span>
          </h2>
          
          <div className="flex flex-col gap-6">
            {TOURNAMENTS_DATA.map((t) => (
              <div 
                key={t.id} 
                className="bg-[#0a0a12]/45 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center backdrop-blur-xl transition-all duration-300 hover:bg-[#141423]/60 hover:border-accent-pink/40 hover:shadow-pink hover:translate-x-1"
              >
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded border ${t.active ? 'bg-accent-pink/10 text-accent-pink border-accent-pink/25' : 'text-text-muted border-white/5'}`}>
                      {t.badge}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: t.id === 't2' ? '#9d4edd' : t.id === 't3' ? 'var(--accent-pink)' : 'var(--accent-neon)' }}>
                      {t.tier}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mt-3 ${!t.active && 'text-text-muted'}`}>{t.title}</h3>
                  <div className="mt-2 text-sm text-text-muted flex gap-5 flex-wrap">
                    <span>Prizepool: <strong className={t.active ? "text-accent-neon" : "text-white"}>{t.prize}</strong></span>
                    <span>Date: <strong>{t.date}</strong></span>
                    <span>Format: <strong>{t.format}</strong></span>
                  </div>
                </div>
                <button 
                  disabled={!t.active}
                  onClick={() => registerTournament(t.title)}
                  className={`mt-5 md:mt-0 px-7 py-3 rounded-xl font-bold uppercase tracking-wider text-sm border backdrop-blur transition-all duration-300 w-full md:w-auto ${
                    t.active 
                    ? 'bg-accent-pink/5 border-accent-pink/40 text-accent-pink hover:bg-accent-pink hover:text-white hover:shadow-pink cursor-pointer' 
                    : 'opacity-30 border-text-muted text-text-muted cursor-not-allowed'
                  }`}
                >
                  {t.active ? 'Register Slot' : 'Closed'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CART SLIDEOUT DRAWER --- */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#06060a]/80 backdrop-blur-2xl shadow-[-15px_0_40px_rgba(0,0,0,0.8)] z-50 border-l border-white/10 p-8 flex flex-col transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
          <h3 className="text-lg font-bold tracking-wider uppercase">Your Gaming Deck</h3>
          <button onClick={() => setIsCartOpen(false)} className="text-text-muted hover:text-accent-pink transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          {cart.length === 0 ? (
            <p className="text-text-muted text-sm text-center pt-10">No modules uploaded to deck registry.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-md">
                <div>
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <span className="text-accent-neon font-bold text-sm">
                    {item.price === 0 ? 'FREE' : `$${item.price}`}
                  </span>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-semibold text-xs uppercase tracking-wider hover:text-red-400">
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-white/10 pt-5 mt-4">
          <div className="flex justify-between font-bold text-lg mb-5">
            <span>Total Amount:</span>
            <span className="text-accent-neon">${calculateTotal()}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-accent-neon to-accent-purple text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-neon hover:brightness-110 transition-all duration-300"
          >
            Initialize Download
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 3D PARALLAX HOVER EFFECT COMPONENT ---
function GameCard({ game, onAddToCart }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth angular tilt physics
    card.style.transform = `rotateX(${-y / 15}deg) rotateY(${x / 15}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="perspective-[1000px]">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-[#0a0a12]/45 border border-white/10 rounded-[20px] overflow-hidden backdrop-blur-3xl transition-all duration-300 ease-out hover:bg-[#141423]/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,255,204,0.15)] hover:border-accent-neon/40 transform-style-3d will-change-transform"
      >
        <div className="relative w-full h-[240px] overflow-hidden translate-z-5">
          <span className="absolute top-4 left-4 bg-[#050508]/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold border border-accent-neon/40 text-accent-neon uppercase tracking-wider z-10">
            {game.tag}
          </span>
          <img 
            src={game.img} 
            alt={game.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-6 translate-z-10">
          <h3 className="text-xl font-bold tracking-wide mb-2">{game.title}</h3>
          <p className="text-text-muted text-xs leading-relaxed mb-5">{game.desc}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-extrabold text-accent-neon">
              {game.price === 0 ? 'FREE' : `$${game.price}`}
            </span>
            <button 
              onClick={() => onAddToCart(game)}
              className="bg-white/5 border border-white/15 text-white px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider backdrop-blur transition-all duration-300 hover:bg-accent-neon hover:text-bg-primary hover:shadow-neon hover:border-accent-neon hover:-translate-y-0.5"
            >
              Add to Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}