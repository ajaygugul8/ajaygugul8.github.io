import Stack from './Stack'
import FindMeHere from './FindMeHere'
import { useEffect } from 'react'
import TextType from './TextType'
import TiltedCard from './TiltedCard'

export default function ContactContent() {
  useEffect(() => {
    const magnetButtons = document.querySelectorAll('.magnet-button')
    
    magnetButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
      })
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0px, 0px)'
      })
    })
    
    return () => {
      magnetButtons.forEach(button => {
        button.removeEventListener('mousemove', () => {})
        button.removeEventListener('mouseleave', () => {})
      })
    }
  }, [])
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 lg:py-24"
      aria-labelledby="contact-me-heading"
    >
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
        {/* Hero Section */}
        <div className="flex items-center min-h-[60vh] py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-8 md:px-16 w-full">

            {/* Left — Profile Card */}
            <div className="flex justify-center order-1 md:order-1">
              <div style={{ position: 'relative', width: '280px' }}>
                <TiltedCard
                  imageSrc="/aj.png"
                  altText="Ajay Guguloth"
                  captionText=""
                  containerHeight="320px"
                  containerWidth="280px"
                  imageHeight="320px"
                  imageWidth="280px"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={false}
                />
                {/* Info bar pinned at bottom of card */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90%',
                  padding: '10px 14px',
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  zIndex: 10,
                }}>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '14px', margin: 0 }}>Ajay Guguloth</p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>Software Developer</p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    marginTop: '4px', padding: '2px 10px', borderRadius: '999px',
                    background: 'rgba(74,222,128,0.15)',
                    border: '1px solid rgba(74,222,128,0.3)'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>Available for opportunities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — CTA */}
            <div className="pl-0 md:pl-6 text-center order-2 md:order-2">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-7 h-px bg-blue-400/40" />
                <div className="min-w-[100px]">
                  <TextType 
                    text={["Let's connect"]}
                    typingSpeed={75}
                    pauseDuration={2000}
                    deletingSpeed={50}
                    loop={true}
                    showCursor={false}
                    className="text-[11px] uppercase tracking-widest text-blue-400/60 font-medium"
                  />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#A366FF] dark:text-[#e8a090] drop-shadow-[0_0_24px_rgba(255,140,97,0.25)] leading-tight mb-3">
                Say hello,<br /><em className="text-blue-400/80 drop-shadow-[0_0_24px_rgba(255,140,97,0.25)]">reach out.</em>
              </h2>

              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6 max-w-sm font-light mx-auto">
                I'm always open to interesting conversations, collaborations, or just a good chat about building things.
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
                <div className="relative group">
                  <a
                    href="https://github.com/ajayguguloth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#24292e] text-white hover:bg-[#1a1f24] transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    GitHub
                  </span>
                </div>

                <div className="relative group">
                  <a
                    href="mailto:ajayguguloth@example.com"
                    className="social-icon w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#EA4335] text-white hover:bg-[#d33426] transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </a>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Email
                  </span>
                </div>

                <div className="relative group">
                  <a
                    href="https://twitter.com/ajayguguloth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:bg-[#1a91da] transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Twitter
                  </span>
                </div>

                <div className="relative group">
                  <a
                    href="https://instagram.com/ajayguguloth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                      color: 'white'
                    }}
                  >
                    <img src="/instagram-gradient.svg" alt="Instagram" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Instagram
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://drive.google.com/file/d/1V5gpswxiXsGc-GNPFzTAykGB3JOgU36c/view?usp=sharing"
                  target="_blank"
                  className="magnet-button inline-flex items-center justify-center gap-3 px-5 py-3 sm:px-6 bg-orange-500 hover:bg-orange-600 rounded-2xl text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  Resume
                </a>

                <a
                  href="https://www.linkedin.com/in/ajaygugul8/"
                  target="_blank"
                  className="magnet-button inline-flex items-center justify-center gap-3 px-5 py-3 sm:px-6 bg-orange-500 hover:bg-orange-600 rounded-2xl text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* What People Say About Me Section */}
        <div className="mt-20 text-center">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-neutral-300 dark:text-neutral-600">What People </span>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-orange-400 bg-clip-text text-transparent">
              Say About Me
            </span>
          </h3>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            Don't just take my word for it. Here's what colleagues and clients have to say about working together.
          </p>
          
          <div className="flex justify-center">
            <div style={{ width: 400, height: 300 }}>
              <Stack
                randomRotation={true}
                sensitivity={150}
                sendToBackOnClick={true}
                cards={[
  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-full flex flex-col justify-center">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-violet-600 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">RK</div>
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">S Bharat</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">CTO, Creator Circle</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">
      "Ajay single-handedly built our creator onboarding flow with React and FastAPI. The Razorpay integration and real-time WebSocket notifications he shipped were rock solid in production."
    </p>
    <div className="flex mt-4 gap-0.5">
      {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400">★</span>)}
    </div>
  </div>,

  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-full flex flex-col justify-center">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-blue-600 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">PS</div>
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Prof. P. Sharma</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">IIT Delhi, Mathematics Dept.</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">
      "The Streamlit dashboard Ajay built for our research project was genuinely impressive — clean UI, interactive Plotly charts, and well-structured Flask backend. Strong fundamentals."
    </p>
    <div className="flex mt-4 gap-0.5">
      {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400">★</span>)}
    </div>
  </div>,

  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-full flex flex-col justify-center">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-emerald-600 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">AM</div>
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Aditya M.</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">Frex Technologies</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">
      "Sharp frontend instincts and quick to ramp up. Ajay's eye for UI detail is rare — he thinks in components and ships clean, maintainable React code."
    </p>
    <div className="flex mt-4 gap-0.5">
      {[1,2,3,4,5].map(s => <span key={s} className={s <= 4 ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}>★</span>)}
    </div>
  </div>,

  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-full flex flex-col justify-center">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-pink-600 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">NV</div>
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Neha V.</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">Team Lead, Creator Circle</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">
      "Ajay owned the Google Calendar integration end-to-end. He's proactive, asks the right questions, and always delivers on time. Great team player too."
    </p>
    <div className="flex mt-4 gap-0.5">
      {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400">★</span>)}
    </div>
  </div>,

  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-full flex flex-col justify-center">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-orange-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">SK</div>
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Siddharth K.</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">Batchmate, IIT Delhi</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">
      "Built a fraud detection system from scratch — XGBoost model, FastAPI backend, React frontend, Firebase auth, deployed on Netlify and Render. Ajay just gets things done."
    </p>
    <div className="flex mt-4 gap-0.5">
      {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400">★</span>)}
    </div>
  </div>,

  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-full flex flex-col justify-center">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-cyan-600 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">TR</div>
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Tanvi R.</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">Designer, Creator Circle</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">
      "Loved working with Ajay on UI. He respects the design system, implements Figma specs pixel-perfect, and actually gives good feedback on UX. Rare in a dev."
    </p>
    <div className="flex mt-4 gap-0.5">
      {[1,2,3,4,5].map(s => <span key={s} className={s <= 4 ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}>★</span>)}
    </div>
  </div>,
]}
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
              />
            </div>
          </div>
        </div>

        {/* Find Me Here Section */}
        <div className="mt-20">
          <FindMeHere />
        </div>
      </div>
    </section>
  )
}
