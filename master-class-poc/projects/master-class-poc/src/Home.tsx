import { useWallet } from '@txnlab/use-wallet-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { useEffect, useRef, useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import CostComparison from './components/CostComparison'
import ImpactChart from './components/ImpactChart'
import MarketExpansion from './components/MarketExpansion'
import NFTmint from './components/NFTmint'
import Tokenmint from './components/Tokenmint'
import Transact from './components/Transact'

// Icons (using react-icons)
import {
  FiAlertCircle,
  FiRocket,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiSend,
  FiLayers,
  FiBox,
  FiMail,
  FiMenu,
  FiX
} from 'react-icons/fi'
import { SiAlgorand } from 'react-icons/si'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

const Home = () => {
  const { activeAddress } = useWallet()
  const [openWalletModal, setOpenWalletModal] = useState(false)
  const [openTransactModal, setOpenTransactModal] = useState(false)
  const [openNFTmintModal, setOpenNFTmintModal] = useState(false)
  const [openTokenModal, setOpenTokenModal] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const heroRef = useRef(null)
  const heroTitleRef = useRef(null)
  const heroSubtitleRef = useRef(null)
  const heroButtonRef = useRef(null)
  const heroOrbsRef = useRef([])
  const statsRef = useRef(null)
  const problemSolutionRef = useRef(null)
  const demoRef = useRef(null)
  const simulationsRef = useRef(null)
  const footerRef = useRef(null)

  // Create refs for animated elements
  const navRef = useRef(null)
  const statItemsRef = useRef([])
  const problemCardRef = useRef(null)
  const solutionCardRef = useRef(null)
  const demoCardRef = useRef(null)
  const simulationCardsRef = useRef([])

  // Add ref to array function
  const addToRefs = (el) => {
    if (el && !statItemsRef.current.includes(el)) {
      statItemsRef.current.push(el)
    }
  }

  const addSimulationRef = (el) => {
    if (el && !simulationCardsRef.current.includes(el)) {
      simulationCardsRef.current.push(el)
    }
  }

  const addOrbRef = (el) => {
    if (el && !heroOrbsRef.current.includes(el)) {
      heroOrbsRef.current.push(el)
    }
  }

  useEffect(() => {
    // Hero section animations
    const heroTl = gsap.timeline()

    // Animate orbs in background
    heroOrbsRef.current.forEach((orb, i) => {
      gsap.to(orb, {
        duration: 20 + i * 4,
        x: i % 2 === 0 ? '+=150' : '-=150',
        y: i % 2 === 0 ? '-=100' : '+=100',
        rotation: i % 2 === 0 ? '+=360' : '-=360',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })

    // Main hero animation sequence
    heroTl
      .fromTo(navRef.current, { y: -100, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      })
      .fromTo(heroTitleRef.current, { opacity: 0, y: 80 }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'expo.out'
      }, '-=0.5')
      .to(heroTitleRef.current, {
        duration: 2.5,
        text: {
          value: 'RemitX',
          delimiter: '',
        },
        ease: 'power2.inOut',
      })
      .fromTo(heroSubtitleRef.current, { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=1.8')
      .fromTo(heroButtonRef.current, { opacity: 0, scale: 0.8 }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)'
      }, '-=0.7')

    // Stats section animation
    gsap.fromTo(
      statItemsRef.current,
      { opacity: 0, y: 60, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    // Problem/Solution section animation
    const problemSolutionTl = gsap.timeline({
      scrollTrigger: {
        trigger: problemSolutionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    problemSolutionTl
      .fromTo(
        problemCardRef.current,
        { x: -100, opacity: 0, rotationY: -15 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          onComplete: function() {
            gsap.to(problemCardRef.current, {
              y: -10,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            })
          }
        },
      )
      .fromTo(
        solutionCardRef.current,
        { x: 100, opacity: 0, rotationY: 15 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          onComplete: function() {
            gsap.to(solutionCardRef.current, {
              y: -10,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: 0.5
            })
          }
        },
        '-=0.8',
      )

    // Demo section animation
    gsap.fromTo(
      demoCardRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: demoRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        onComplete: function() {
          gsap.to(demoCardRef.current, {
            y: -5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
        }
      },
    )

    // Simulations section animation
    simulationCardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: simulationsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          onComplete: function() {
            gsap.to(card, {
              y: -5,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.2
            })
          }
        },
      )
    })

    // Footer animation
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 font-sans overflow-hidden cursor-default">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={addOrbRef}
            className="absolute rounded-full opacity-30"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(96, 165, 250, 0.3)' : 'rgba(139, 92, 246, 0.3)'})`,
              top: `${20 + i * 10}%`,
              left: `${i * 20}%`,
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <header ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-3xl font-bold text-indigo-600 flex items-center">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">RemitX</span>
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span>
          </a>
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Why RemitX', 'Demo', 'Simulations', 'Contact'].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-indigo-600 transition-colors relative group font-medium"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <button
            className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white/95 px-6 py-4 flex flex-col space-y-4 shadow-lg">
            {['Home', 'Why RemitX', 'Demo', 'Simulations', 'Contact'].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-indigo-600 transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-20 px-6 flex items-center justify-center overflow-hidden min-h-screen">
        <div ref={heroRef} className="relative z-10 text-center max-w-5xl mx-auto">
          <h1
            ref={heroTitleRef}
            className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Revolutionizing Remittances
          </h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl text-gray-600 mb-10 font-medium leading-relaxed max-w-3xl mx-auto">
            Instant cross-border payments powered by Algorand and USDCa with near-zero fees and lightning-fast settlement
          </p>
          <button
            ref={heroButtonRef}
            className="px-10 py-4 rounded-full font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-indigo-400/30 relative overflow-hidden group cursor-pointer"
            onClick={() => setOpenWalletModal(true)}
          >
            <span className="relative z-10 flex items-center justify-center">
              Launch Demo <FiRocket className="ml-2" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-indigo-400/40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float${(i % 3) + 1} ${8 + Math.random() * 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-6 bg-gradient-to-r from-indigo-100/80 to-purple-100/80 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { value: '500+', label: 'Users Served', icon: <FiUsers size={32} /> },
            { value: '$0.001', label: 'Avg. Fee (vs $20 Western Union)', icon: <FiDollarSign size={32} /> },
            { value: '4 sec', label: 'Settlement Time (vs 3 days)', icon: <FiClock size={32} /> },
          ].map((stat, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl border border-indigo-100 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <div className="text-indigo-500 mb-4 flex justify-center">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-indigo-700 mb-2">{stat.value}</h3>
              <p className="text-gray-600 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section id="why-remitx" ref={problemSolutionRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-16 tracking-tight">
            Why <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">RemitX</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div
              ref={problemCardRef}
              className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl border border-rose-100 shadow-lg transform transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiAlertCircle className="text-rose-500" size={28} />
              </div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">The Problem</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Traditional remittances are slow (3-5 days), costly ($15-$30 fees), and rely on multiple intermediaries, reducing trust,
                transparency, and efficiency for migrants sending money home.
              </p>
            </div>
            <div
              ref={solutionCardRef}
              className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl border border-green-100 shadow-lg transform transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiRocket className="text-green-500" size={28} />
              </div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">Our Solution</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                RemitX leverages Algorand and USDCa for near-instant transfers (4 seconds) with fees as low as $0.001, ensuring secure,
                transparent, and scalable transactions directly between users.
              </p>
            </div>
          </div>
          <p className="text-gray-700 mt-12 text-xl font-medium flex items-center justify-center">
            Powered by <SiAlgorand className="text-black mx-2" size={24} />, scalable to millions of transactions with carbon-neutral technology.
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" ref={demoRef} className="py-20 px-6 flex items-center justify-center">
        <div
          ref={demoCardRef}
          className="relative z-10 backdrop-blur-lg bg-white/80 p-10 rounded-3xl shadow-xl w-full max-w-4xl mx-4 text-center border border-indigo-100 cursor-pointer"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8 tracking-tight">
            Try the <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Interactive Demo</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Experience firsthand how RemitX transforms cross-border payments with blockchain technology
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 justify-center">
            <button
              className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg relative overflow-hidden group cursor-pointer flex items-center"
              onClick={() => setOpenWalletModal(true)}
            >
              <span className="relative z-10 flex items-center">
                {activeAddress ? 'Wallet Connected ✅' : 'Connect Wallet'}
                {!activeAddress && <FiSend className="ml-2" />}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            {activeAddress && (
              <>
                <button
                  className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg relative overflow-hidden group cursor-pointer flex items-center"
                  onClick={() => setOpenTransactModal(true)}
                >
                  <span className="relative z-10 flex items-center">
                    Send 1 USDCa Payment <FiSend className="ml-2" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
                <button
                  className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg relative overflow-hidden group cursor-pointer flex items-center"
                  onClick={() => setOpenNFTmintModal(true)}
                >
                  <span className="relative z-10 flex items-center">
                    Mint MasterPass NFT <FiLayers className="ml-2" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
                <button
                  className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg relative overflow-hidden group cursor-pointer flex items-center"
                  onClick={() => setOpenTokenModal(true)}
                >
                  <span className="relative z-10 flex items-center">
                    Create Token (RemitPKR) <FiBox className="ml-2" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Simulations Section */}
      <section id="simulations" ref={simulationsRef} className="py-20 px-6 bg-gradient-to-r from-indigo-100/80 to-purple-100/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-800 mb-12 text-center tracking-tight">
            Investor <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Simulations</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div ref={addSimulationRef} className="cursor-pointer">
              <CostComparison />
            </div>
            <div ref={addSimulationRef} className="cursor-pointer">
              <MarketExpansion />
            </div>
          </div>
          <div className="mt-12" ref={addSimulationRef} className="cursor-pointer">
            <ImpactChart />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" ref={footerRef} className="py-12 px-6 bg-white/90 text-center">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to transform global payments?</h3>
          <p className="text-gray-600 text-lg mb-4 flex items-center justify-center">
            <FiMail className="mr-2" /> Contact us: info@remitx.com
          </p>
          <p className="text-gray-500">&copy; 2025 RemitX. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <ConnectWallet open={openWalletModal} setOpen={setOpenWalletModal} />
      <Transact open={openTransactModal} setOpen={setOpenTransactModal} />
      <NFTmint open={openNFTmintModal} setOpen={setOpenNFTmintModal} />
      <Tokenmint open={openTokenModal} setOpen={setOpenTokenModal} />

      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  )
}

export default Home
