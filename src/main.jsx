import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  ArrowDown, ArrowLeft, ArrowRight, BadgeCheck, Bike, Box, Building2, CalendarDays,
  Check, CheckCircle2, ChevronDown, ChevronRight, CircleHelp, ClipboardCheck,
  Factory, FileCheck2, Globe2, House, Instagram, LampDesk, Lightbulb, MapPin, Menu, MessageCircle,
  Monitor, PackageCheck, Phone, Plane, Route, Search, ShieldCheck, Ship, ShoppingBasket,
  Sofa, Sparkles, Store, Truck, X
} from 'lucide-react'
import { blogCategories, blogPosts, faqs, products, services, steps, stories } from './data'
import './index.css'

const iconSet = { Search, ClipboardCheck, BadgeCheck, Ship, FileCheck2, House, Monitor, ShoppingBasket, Sofa, Route, Store, Bike, Plane, ShieldCheck, Lightbulb, Calculator: FileCheck2, CarFront: Truck, Cog: PackageCheck, LampDesk, Box, Truck, Building2, Globe2, Factory }
const Icon = ({ name, ...props }) => { const Component = iconSet[name] || PackageCheck; return <Component aria-hidden="true" {...props} /> }
const whatsapp = 'https://wa.me/919989724320'
const quoteHref = '#contact'

function Wordmark({ light = false }) {
  return <a href="/#home" aria-label="ImportNow home" className={`logo ${light ? 'logo-light' : ''}`}>
    IMP<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="currentColor"/><path d="M11 22V10l10 12V10" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 0v4M16 28v4M0 16h4M28 16h4" stroke="currentColor" strokeWidth="2"/></svg>TNOW
  </a>
}

function Nav({ blog = false }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(window.scrollY > 8)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const base = ''
  const links = [
    ['Services', `${base}/#services`], ['How it works', `${base}/#journey`], ['What we import', `${base}/#products`],
    ['China trips', `${base}/#trips`], ['Blog', '/blog.html'], ['Contact', `${base}/#contact`]
  ]
  return <>
    <header className={`nav ${scrolled || blog ? 'solid' : ''}`}>
      <div className="wrap nav-inner"><Wordmark />
        <nav className="nav-links" aria-label="Main navigation">{links.map(([label, href]) => <a key={label} className={blog && label === 'Blog' ? 'active' : ''} href={href}>{label}</a>)}</nav>
        <a href={`${base}/#contact`} className="btn btn-primary nav-cta">Get a free quote</a>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
    <AnimatePresence>{open && <motion.nav className="mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}<ChevronRight size={17} /></a>)}
      <a className="mobile-quote" href={`${base}/#contact`} onClick={() => setOpen(false)}>Get a free quote <ArrowRight size={16} /></a>
    </motion.nav>}</AnimatePresence>
  </>
}

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
}

function WhatsAppFloat() {
  return <a className="wa" href={whatsapp} aria-label="Chat on WhatsApp" target="_blank" rel="noreferrer"><MessageCircle size={28} /><span className="wa-mark">✆</span></a>
}

function SectionHead({ label, title, body, center = false }) {
  return <motion.div className={`section-head ${center ? 'center' : ''}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .7 }}>
    {label && <div className="eyebrow">{label}</div>}<h2>{title}</h2>{body && <p>{body}</p>}
  </motion.div>
}

function Flag({ country }) {
  if (country === 'china') return <svg className="flag" viewBox="0 0 30 20" role="img" aria-label="China"><rect width="30" height="20" fill="#de2910"/><path fill="#ffde00" d="M6 3 7.2 6.8 11 6.8 7.9 9.1 9.1 13 6 10.6 2.9 13 4.1 9.1 1 6.8h3.8z"/></svg>
  if (country === 'india') return <svg className="flag" viewBox="0 0 30 20" role="img" aria-label="India"><rect width="30" height="6.67" fill="#ff9933"/><rect y="6.67" width="30" height="6.66" fill="white"/><rect y="13.33" width="30" height="6.67" fill="#138808"/><circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" strokeWidth=".6"/></svg>
  const flags = { vietnam:'🇻🇳', japan:'🇯🇵', korea:'🇰🇷', uae:'🇦🇪' }
  return <span className="flag-emoji" role="img" aria-label={country}>{flags[country] || '🌐'}</span>
}

function GlobeArt() {
  const prefersReducedMotion = useReducedMotion()
  const moveGlobe = event => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - .5) * 12
    const y = ((event.clientY - rect.top) / rect.height - .5) * 12
    event.currentTarget.querySelector('.globe-svg')?.style.setProperty('translate', `${x}px ${y}px`)
  }
  const resetGlobe = event => event.currentTarget.querySelector('.globe-svg')?.style.setProperty('translate', '0 0')
  return <div className="globe-art" aria-hidden="true" onPointerMove={moveGlobe} onPointerLeave={resetGlobe}>
    <div className="globe-halo" />
    <svg className="globe-svg" viewBox="0 0 680 680" fill="none">
      <defs><radialGradient id="earth" cx="38%" cy="28%"><stop stopColor="#fff"/><stop offset=".55" stopColor="#e7e8eb"/><stop offset="1" stopColor="#d4d6db"/></radialGradient><clipPath id="earthClip"><circle cx="340" cy="340" r="260"/></clipPath></defs>
      <circle cx="340" cy="340" r="275" fill="url(#earth)" stroke="#fff" strokeWidth="2"/>
      <g clipPath="url(#earthClip)" opacity=".8">
        <ellipse cx="340" cy="340" rx="140" ry="260" stroke="#b8bbc2"/><ellipse cx="340" cy="340" rx="225" ry="260" stroke="#c4c6cc"/><path d="M80 340h520M110 245h460M115 435h450M165 165h350M165 515h350" stroke="#c4c6cc"/>
        <path d="m174 235 41-39 39 9 31-13 38 26-2 30-39 14-5 27-32 14-28 36-34-14-18-44-15-19 24-27ZM296 359l24-20 37 8 20 36-13 51-27 32-17-34-14-25-10-48ZM407 222l46-22 43 14 30 42-11 35-35-7-19 23-39-16-25-31 10-38ZM465 376l37-19 37 11 19 39-25 30-50-3-21-25 3-33Z" fill="#c1c4cb" opacity=".75"/>
        <motion.path d="M470 250 Q420 300 392 366" stroke="#e3241b" strokeWidth="2.2" strokeDasharray="5 9" opacity=".8" initial={prefersReducedMotion?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:prefersReducedMotion?0:1.5,ease:'easeOut'}}/>
        <motion.path d="M497 266 Q438 302 392 366" stroke="#e3241b" strokeWidth="1.8" strokeDasharray="5 9" opacity=".55" initial={prefersReducedMotion?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:prefersReducedMotion?0:1.3,delay:prefersReducedMotion?0:.18,ease:'easeOut'}}/>
        <motion.path d="M516 245 Q455 286 392 366" stroke="#e3241b" strokeWidth="1.8" strokeDasharray="5 9" opacity=".42" initial={prefersReducedMotion?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:prefersReducedMotion?0:1.2,delay:prefersReducedMotion?0:.32,ease:'easeOut'}}/>
        <motion.path d="M278 360 Q330 325 392 366" stroke="#e3241b" strokeWidth="1.8" strokeDasharray="5 9" opacity=".42" initial={prefersReducedMotion?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:prefersReducedMotion?0:1.2,delay:prefersReducedMotion?0:.46,ease:'easeOut'}}/>
        <motion.path d="M415 405 Q404 384 392 366" stroke="#e3241b" strokeWidth="1.8" strokeDasharray="5 9" opacity=".42" initial={prefersReducedMotion?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:prefersReducedMotion?0:1.2,delay:prefersReducedMotion?0:.6,ease:'easeOut'}}/>
        <motion.circle cx="470" cy="250" r="6" fill="#e3241b" animate={prefersReducedMotion?{r:6,opacity:1}:{r:[5,8,5],opacity:[1,.5,1]}} transition={{duration:2.4,repeat:prefersReducedMotion?0:Infinity}}/>
        <motion.circle cx="497" cy="266" r="5" fill="#e3241b" animate={prefersReducedMotion?{r:5,opacity:1}:{r:[4,7,4],opacity:[1,.5,1]}} transition={{duration:2.4,delay:.3,repeat:prefersReducedMotion?0:Infinity}}/>
        <motion.circle cx="516" cy="245" r="5" fill="#e3241b" animate={prefersReducedMotion?{r:5,opacity:1}:{r:[4,7,4],opacity:[1,.5,1]}} transition={{duration:2.4,delay:.6,repeat:prefersReducedMotion?0:Infinity}}/>
        <motion.circle cx="278" cy="360" r="5" fill="#e3241b" animate={prefersReducedMotion?{r:5,opacity:1}:{r:[4,7,4],opacity:[1,.5,1]}} transition={{duration:2.4,delay:.9,repeat:prefersReducedMotion?0:Infinity}}/>
        <motion.circle cx="415" cy="405" r="5" fill="#e3241b" animate={prefersReducedMotion?{r:5,opacity:1}:{r:[4,7,4],opacity:[1,.5,1]}} transition={{duration:2.4,delay:1.2,repeat:prefersReducedMotion?0:Infinity}}/>
        <motion.circle cx="392" cy="366" r="8" fill="#e3241b"/><circle cx="392" cy="366" r="15" stroke="#e3241b" strokeOpacity=".25"/>
      </g>
    </svg>
    <div className="globe-orbit orbit-one"/><div className="globe-orbit orbit-two"/>
    <div className="globe-pill gp-one"><span className="flag-cluster" aria-hidden="true">🇨🇳 🇻🇳 🇯🇵</span> +2 <span>origin markets</span></div>
    <div className="globe-pill gp-two"><Flag country="india"/> India <span>Destination</span></div>
    <div className="globe-pill gp-three"><span className="pulse-dot"/> 5 trade lanes</div>
  </div>
}

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  return <section className="hero" id="home">
    <GlobeArt />
    <div className="wrap hero-wrap"><motion.div className="hero-content" initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [.2,.8,.2,1] }}>
      <div className="chip"><Flag country="china"/><span className="arrow">→</span><Flag country="india"/> <span>Trusted by 500+ Indian businesses</span></div>
      <h1><motion.span className="hero-line" initial={prefersReducedMotion ? false : { y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, delay: .12, ease: [.16,1,.3,1] }}>Import directly</motion.span><motion.span className="hero-line" initial={prefersReducedMotion ? false : { y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, delay: .24, ease: [.16,1,.3,1] }}>from China.</motion.span><motion.span className="hero-line grad-text" initial={prefersReducedMotion ? false : { y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, delay: .36, ease: [.16,1,.3,1] }}>Without the</motion.span><motion.span className="hero-line grad-text" initial={prefersReducedMotion ? false : { y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, delay: .48, ease: [.16,1,.3,1] }}>guesswork.</motion.span></h1>
      <p className="lead">Sourcing, factory inspection, shipping and customs, handled end to end by a team with its own company in Shanghai. You choose the product. We bring it to your door.</p>
      <div className="hero-btns"><a className="btn btn-primary" href={quoteHref}>Get a free sourcing quote <ArrowRight size={16}/></a><a className="btn btn-ghost" href="#journey">See how it works</a></div>
      <div className="hero-stats"><div className="stat"><b><AnimatedNumber to={500} suffix="+"/></b><span>Businesses<br/>served</span></div><div className="stat"><b><AnimatedNumber to={83} suffix="K+"/></b><span>Community on<br/>Instagram</span></div><div className="stat"><b>1 pc</b><span>MOQ on many<br/>products</span></div><div className="stat"><b>Shanghai</b><span>Own registered<br/>company</span></div></div>
    </motion.div></div>
    <div className="scroll-cue"><span>Scroll to explore</span><i/></div>
  </section>
}

function AnimatedNumber({ to, suffix = '' }) {
  const [value, setValue] = useState(to)
  const ref = useRef(null)
  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let started = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return
      started = true
      const start = performance.now()
      const duration = 1400
      const tick = now => {
        const progress = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - progress, 4)
        setValue(Math.round(to * eased))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: .65 })
    observer.observe(node)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [to])
  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>
}

function Marquee() {
  const items = ['Sourcing from China', 'Factory inspections', 'Quality control', 'Sea & air freight', 'Customs clearance', 'Delivered to your door']
  return <div className="marquee" aria-label="Our services"><div className="marquee-track">{[...items, ...items].map((x,i)=><span key={i}><em>✳</em>{x}</span>)}</div></div>
}

function Services() {
  return <section className="section" id="services"><div className="wrap"><SectionHead label="End-to-end imports" title={<>One team from the factory floor<br className="desktop-only"/> to your front door.</>} body="Anyone can say they import from China. What you actually need is a smooth process, clear communication and a shipment that arrives safely." />
    <div className="grid-3">{services.map(([title, description, icon], i)=><motion.article className="card service-card" key={title} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} whileHover={{y:-5,rotateX:1.2,rotateY:-.8,scale:1.01}} whileTap={{scale:.99}} viewport={{once:true,amount:.15}} transition={{duration:.5,delay:(i%3)*.08}}>
      <span className="num">0{i+1}</span><div className="icon"><Icon name={icon}/></div><h3>{title}</h3><p>{description}</p>
    </motion.article>)}</div>
  </div></section>
}

function JourneyArt({ progress, origin }) {
  const boatX = `${Math.min(100, Math.max(0, progress*100))}%`
  const originInfo = originMarkets.find(country=>country.id===origin) || originMarkets[0]
  const routeShapes = {
    china:'M145 378 C300 220 380 458 550 328 S800 270 1005 190',
    vietnam:'M290 425 C390 340 448 438 565 350 S820 250 1005 190',
    japan:'M430 235 C480 230 518 276 590 304 S835 236 1005 190',
    korea:'M475 265 C520 245 548 292 615 312 S850 235 1005 190',
    uae:'M185 285 C330 235 388 315 530 305 S820 200 1005 190'
  }
  const routePath = routeShapes[origin] || routeShapes.china
  const originCity = originInfo.hub.split(' · ')[0]
  return <div className="sea-art" aria-hidden="true">
    <div className="sea-sun"/><div className="sea-map-lines"/>
    <svg className="sea-route" viewBox="0 0 1200 600" preserveAspectRatio="none"><path d={routePath} stroke="#fff" strokeWidth="3" strokeDasharray="7 12" fill="none" opacity=".7"/><path d={routePath} stroke="#e3241b" strokeWidth="2" fill="none" strokeDasharray={`${progress*1000} 1200`}/><circle cx="1005" cy="190" r="11" fill="#e3241b"/></svg>
    <div className="port-label origin"><span className="pin">●</span><b>{originCity}</b><small>{originInfo.name.toUpperCase()} · ORIGIN</small></div><div className="port-label destination"><span className="pin">●</span><b>Chennai</b><small>INDIA · DESTINATION</small></div>
    <motion.div className="ship-illustration" style={{left:boatX}}><Ship size={30}/><span>ImportNow</span></motion.div>
    <div className="sea-cargo cargo-a"/><div className="sea-cargo cargo-b"/><div className="sea-cargo cargo-c"/>
  </div>
}

function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end end'] })
  const [active, setActive] = useState(0)
  const [origin, setOrigin] = useState(()=>sessionStorage.getItem('importnow-origin') || 'china')
  const selectedOrigin = originMarkets.find(country=>country.id===origin) || originMarkets[0]
  React.useEffect(() => scrollYProgress.on('change', v => setActive(Math.min(5, Math.floor(v * 6.15)))), [scrollYProgress])
  React.useEffect(()=>{
    const updateOrigin = event => setOrigin(event.detail.origin)
    window.addEventListener('importnow-origin-change',updateOrigin)
    window.addEventListener('importnow-plan',updateOrigin)
    return ()=>{window.removeEventListener('importnow-origin-change',updateOrigin);window.removeEventListener('importnow-plan',updateOrigin)}
  },[])
  const progress = useTransform(scrollYProgress, [0,1], [0,1])
  return <section className="journey" id="journey" ref={ref}>
    <div className="journey-sticky"><JourneyArt progress={active/5} origin={origin}/><div className="j-shade"/><div className="j-ui"><div className="wrap">
      <div className="j-head"><div className="eyebrow">How it works</div><h2>Watch your order travel<br/>from {selectedOrigin.name} to India.</h2></div>
      <ol className="j-steps">{steps.map(([title, body],i)=><li className={`j-step ${active===i?'on':i<active?'done':''}`} key={title}><span className="n">{i<active?<Check size={15}/>:i+1}</span><div><h3>{title}</h3><AnimatePresence initial={false}>{active===i&&<motion.p initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}>{body}</motion.p>}</AnimatePresence></div></li>)}</ol>
    </div><div className="wrap"><div className="j-route"><div className="j-port"><Flag country={origin}/><span className="pname">{selectedOrigin.hub.split(' · ')[0]}</span><small>Origin market</small></div><div className="j-track"><motion.div className="j-fill" style={{scaleX:progress}}/><motion.div className="j-boat" style={{left:progress}}><Ship size={17}/></motion.div></div><div className="j-port"><Flag country="india"/><span className="pname">Chennai</span><small>Destination</small></div><span className="j-day">Step {active+1} / 6</span></div></div>
    </div><div className="j-badge"><i/> Live shipment view</div></div>
  </section>
}

function Products() {
  return <section className="section" id="products"><div className="wrap"><SectionHead label="What we import" title={<>China has a market for every<br className="desktop-only"/> industry. We know each one.</>} body="Each industry has its own manufacturing hub. We take you straight to the source." />
    <div className="products">{products.map(([hub,title,items,tag,icon],i)=><motion.article key={title} className="card prod" initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} whileHover={{y:-5,rotateX:1,rotateY:-.8,scale:1.01}} viewport={{once:true,amount:.12}} transition={{duration:.55,delay:(i%3)*.07}}>
      <div className="prod-art"><Icon name={icon}/></div><div className="hub"><MapPin size={14}/>{hub}</div><h3>{title}</h3><ul>{items.map(it=><li key={it}>{it}</li>)}</ul><span className="tag">{tag}</span>
    </motion.article>)}</div>
  </div></section>
}

const marketMatches = [
  { category:'Furniture & interiors', icon:'Sofa' },
  { category:'Electronics & tech', icon:'Monitor' },
  { category:'EV & automotive', icon:'CarFront' },
  { category:'Lighting', icon:'LampDesk' },
  { category:'Supermarket & general goods', icon:'ShoppingBasket' },
  { category:'Machinery & automation', icon:'Cog' }
]

const originMarkets = [
  { id:'china', name:'China', flag:'🇨🇳', hub:'Shenzhen · Foshan · Yiwu', focus:'A broad factory network with specialized sourcing cities.' },
  { id:'vietnam', name:'Vietnam', flag:'🇻🇳', hub:'Ho Chi Minh City', focus:'A market to explore for apparel, footwear, furniture and home goods.' },
  { id:'japan', name:'Japan', flag:'🇯🇵', hub:'Osaka · Tokyo', focus:'A market to explore for precision equipment, automotive and electronics.' },
  { id:'korea', name:'South Korea', flag:'🇰🇷', hub:'Seoul · Busan', focus:'A market to explore for beauty, electronics and automotive products.' },
  { id:'uae', name:'UAE', flag:'🇦🇪', hub:'Dubai', focus:'A regional trade hub to explore for general goods and re-export sourcing.' }
]

function MarketFinder() {
  const [category,setCategory] = useState('')
  const [origin,setOrigin] = useState(()=>sessionStorage.getItem('importnow-origin') || 'china')
  const [orderSize,setOrderSize] = useState('Small batch')
  const [showResult,setShowResult] = useState(false)
  const selected = marketMatches.find(item=>item.category===category)
  const selectedOrigin = originMarkets.find(item=>item.id===origin) || originMarkets[0]
  const sizeTips = {
    'Samples':'Compare sample cost, air freight and minimum order quantities.',
    'Small batch':'Compare air freight with consolidated sea cargo.',
    'Bulk order':'Request full-container and shared-container sea-freight quotes.'
  }
  const chooseCategory = value => { setCategory(value); setShowResult(false) }
  const chooseOrigin = value => {
    setOrigin(value)
    setShowResult(false)
    sessionStorage.setItem('importnow-origin',value)
    window.dispatchEvent(new CustomEvent('importnow-origin-change',{detail:{origin:value}}))
  }
  const savePlan = () => {
    sessionStorage.setItem('importnow-category',category)
    sessionStorage.setItem('importnow-origin',selectedOrigin.id)
    window.dispatchEvent(new CustomEvent('importnow-plan', { detail:{ category, origin:selectedOrigin.id } }))
  }
  return <section className="finder section" id="market-finder" aria-labelledby="finder-title">
    <div className="wrap">
      <motion.div className="finder-heading" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}}>
        <div className="eyebrow">One plan · five origin markets</div>
        <h2 id="finder-title">Build your import route.</h2>
        <p>Compare sourcing origins, choose what you want to import, and get a practical first shipping conversation for your route to India.</p>
      </motion.div>
      <div className="finder-layout">
        <div className="finder-panel">
          <div className="finder-step"><span>01</span><div><h3>Choose an origin country</h3><p>Compare five sourcing markets.</p></div></div>
          <div className="country-options" role="group" aria-label="Origin country">
            {originMarkets.map(country=><motion.button type="button" key={country.id} className={`country-option ${origin===country.id?'selected':''}`} onClick={()=>chooseOrigin(country.id)} aria-pressed={origin===country.id} whileHover={{y:-2}} whileTap={{scale:.98}} transition={{duration:.18}}>
              <span className="country-flag" aria-hidden="true">{country.flag}</span><span>{country.name}</span>
            </motion.button>)}
          </div>
          <div className="finder-step second-step"><span>02</span><div><h3>What are you looking to import?</h3><p>Choose the closest match.</p></div></div>
          <div className="finder-options" role="group" aria-label="Product category">
            {marketMatches.map(item=><motion.button type="button" key={item.category} className={`finder-option ${category===item.category?'selected':''}`} onClick={()=>chooseCategory(item.category)} aria-pressed={category===item.category} whileHover={{y:-2}} whileTap={{scale:.98}} transition={{duration:.18}}>
              <span className="finder-option-icon"><Icon name={item.icon}/></span><span>{item.category}</span><ChevronRight size={16} className="option-arrow"/>
            </motion.button>)}
          </div>
          <div className="finder-step second-step"><span>03</span><div><h3>How big is your first order?</h3><p>This helps shape the freight options to compare.</p></div></div>
          <div className="size-options" role="group" aria-label="Order size">
            {Object.keys(sizeTips).map(size=><button type="button" key={size} className={`size-option ${orderSize===size?'selected':''}`} onClick={()=>setOrderSize(size)} aria-pressed={orderSize===size}>{size}</button>)}
          </div>
          <button type="button" className="btn btn-primary finder-submit" disabled={!selected} onClick={()=>setShowResult(true)}>Build my route <ArrowRight size={16}/></button>
        </div>
        <div className="finder-preview" aria-live="polite">
          <AnimatePresence mode="wait">
            {showResult&&selected ? <motion.div className="finder-result" key={`${selected.category}-${selectedOrigin.id}-${orderSize}`} initial={{opacity:0,y:16,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-10,scale:.98}} transition={{duration:.35}}>
              <div className="result-top"><span className="result-icon"><Factory size={20}/></span><span className="result-label">Your sourcing route</span><span className="result-spark"><Sparkles size={17}/></span></div>
              <h3>{selectedOrigin.hub}<span>, {selectedOrigin.name}</span></h3>
              <p>{selectedOrigin.focus} Start by checking whether the supplier handles {selected.category.toLowerCase()} and can meet your quality requirements.</p>
              <div className="result-tip"><span className="result-tip-label">Freight conversation</span><b>{sizeTips[orderSize]}</b></div>
              <a className="btn btn-light" href="#contact" onClick={savePlan}>Discuss this route <ArrowRight size={16}/></a>
              <small>Planning suggestion only. Confirm product fit, supplier credentials, duties and freight quotes before ordering.</small>
            </motion.div> : <motion.div className="finder-empty" key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <motion.div className="empty-orbit"><Globe2/><span/><i/></motion.div><p>Your sourcing route will appear here</p><span>Choose a country and product to begin</span>
            </motion.div>}
          </AnimatePresence>
          <div className="finder-route"><span><span className="route-flag" aria-hidden="true">{selectedOrigin.flag}</span> {selectedOrigin.name}</span><i/><span><Flag country="india"/> India</span></div>
        </div>
      </div>
    </div>
  </section>
}

function LicenseCard() {
  return <motion.div className="license-stage" initial={{opacity:0,rotateY:8,y:25}} whileInView={{opacity:1,rotateY:0,y:0}} viewport={{once:true,amount:.3}} transition={{duration:.8}}>
    <div className="license"><div className="lt">营业执照</div><div className="ls">BUSINESS LICENCE</div><div className="emblem"/><dl><dt>Company</dt><dd>Shanghai Shengqiao Chain Trading Co., Ltd.</dd><dt>Location</dt><dd>Shanghai, People's Republic of China</dd><dt>Scope</dt><dd>Supply chain, sourcing & international trade</dd><dt>Serving</dt><dd>Importers across India</dd></dl><div className="qr"/><div className="stamp"><span>SHANGHAI<br/>SHENGQIAO<br/>TRADING</span></div></div>
  </motion.div>
}

function Shanghai() {
  const checks = [<>Registered business licence <b>issued in Shanghai, China</b></>, <>Chinese company bank account, <b>so payments to factories are safe and traceable</b></>, <><b>Team on the ground</b> for factory visits, quality checks and market trips</>, <><b>Indian founder on both sides</b>: talk to us in Telugu, Hindi or English</>]
  return <section className="section shanghai" id="shanghai"><div className="wrap sh-grid"><div><SectionHead label="Officially in China" title={<>Many claim an office in China.<br/>We have the licence.</>} body={<>ImportNow operates through its own registered company in Shanghai, <b>Shanghai Shengqiao Chain Trading Co., Ltd.</b> That means we can sign contracts with factories, pay suppliers locally and stand behind every order.</>} />
      <ul className="checks">{checks.map((c,i)=><li key={i}><span className="tick"><Check size={14}/></span><span>{c}</span></li>)}</ul></div><LicenseCard/></div></section>
}

function Skyline() {
  return <svg className="skyline" viewBox="0 0 900 260" preserveAspectRatio="none" aria-hidden="true"><path fill="#111113" d="M0 220h60v-62h31v-48h42v110h28V86h42v134h31v-62h34V50h42v170h30v-96h43v96h24V31h44v189h31v-75h42v75h31V90h36v130h35v-44h34v44h28V67h42v153h28v-92h42v92h67v40H0z"/><path d="M315 51h42M455 34h42M705 70h42" stroke="#e3241b" strokeWidth="3" opacity=".7"/></svg>
}

function Trips() {
  const inclusions = ['Visa guidance & invitation letter','Hotels close to the fair','Indian food daily, veg & non-veg','Guides & translators','Factory visits you choose','Sightseeing between markets']
  return <section className="section" id="trips"><div className="wrap"><SectionHead label="Business trips to China" title={<>Your business trip doesn't have<br className="desktop-only"/> to feel like work.</>} body="Guided trips to the Canton Fair, wholesale markets and factories you choose. Our clients often tell us it felt like a personal trip, not a business tour." />
    <div className="trips-grid"><motion.article className="card trip-hero" initial={{opacity:0,scale:.98}} whileInView={{opacity:1,scale:1}} viewport={{once:true,amount:.2}}><Skyline/><div className="trip-copy"><div className="eyebrow">Canton Fair · Guangzhou</div><h3>Meet factories face to face.<br/>We handle everything else.</h3><p>Walk the world's biggest trade fair with a guide who speaks the language, then visit the factories you shortlist.</p><div className="pill-row">{['Guangzhou','Shenzhen','Yiwu','Foshan','Macau','Glass bridge'].map(v=><span className="pill" key={v}>{v}</span>)}</div></div></motion.article>
      <article className="card trip-side"><h3>What's included</h3><div className="inc">{inclusions.map(x=><div key={x}><CheckCircle2 size={19}/>{x}</div>)}</div></article>
      <article className="card trip-side departures"><h3>Next departures</h3><div className="dates"><div className="date"><b>Spring</b><span>Canton Fair · April–May</span></div><div className="date"><b>Autumn</b><span>Canton Fair · October–November</span></div></div><a className="text-link" href="#contact">Join the next trip <ArrowRight size={15}/></a></article>
    </div>
  </div></section>
}

const workCards = [
  {route:'Foshan → Villa',title:'Complete villa furniture',text:'Sofas, dining sets, office furniture and pergolas, all in one container delivered to a luxury villa.',tags:['Full container','Door delivery'],icon:'Sofa',cls:'ph1'},
  {route:'Yiwu → Adilabad',title:'Sagar Supermarket',text:"Complete supermarket stock sourced from Yiwu over video calls and delivered to the client's warehouse.",tags:['Retail','Video sourcing'],icon:'ShoppingBasket',cls:'ph2'},
  {route:'China → Convention',title:'Sreeman Convention Centre',text:'Cots, beds, dining sets and office furniture for a convention venue, with better finish for the same budget.',tags:['Hospitality','Bulk order'],icon:'Building2',cls:'ph3'},
  {route:'China → Hyderabad',title:'Smart office desks',text:'Motorised height-adjustable L-shaped desks, imported even as a single piece.',tags:['MOQ 1','~30 days'],icon:'Monitor',cls:'ph4'}
]

function Work() {
  return <section className="section" id="work"><div className="wrap"><SectionHead label="Recently delivered" title={<>Another container unloaded,<br className="desktop-only"/> another happy client.</>} />
    <div className="work-grid">{workCards.map((x,i)=><motion.article className="card work" key={x.title} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} whileHover={{y:-5,rotateX:1,rotateY:-.7,scale:1.01}} viewport={{once:true,amount:.15}} transition={{duration:.5,delay:i*.06}}><div className={`ph ${x.cls}`}><Icon name={x.icon}/><span className="route-chip">{x.route}</span></div><div className="bd"><h3>{x.title}</h3><p>{x.text}</p><div className="meta">{x.tags.map(t=><span key={t}>{t}</span>)}</div></div></motion.article>)}</div>
  </div></section>
}

function Stories() {
  return <section className="section stories" id="stories"><div className="wrap"><SectionHead label="Client stories" title={<>Heard from the people who<br className="desktop-only"/> made the trip.</>} />
    <div className="grid-3">{stories.map(([name,role,quote],i)=><motion.article className="card quote" key={name} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.55,delay:i*.08}}><p className="q">{quote}</p><div className="who"><div className={`avatar av${i+1}`}>{name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div><b>{name}</b><span>{role}</span></div></div></motion.article>)}</div>
  </div></section>
}

function PostCover({ post }) {
  const C = iconSet[post.icon] || Route
  return <a href={`/post.html?p=${post.slug}`} className="cover" aria-label={post.cardTitle || post.title} tabIndex="-1"><span className={`cover-in ${post.cover}`}><C className="cv-ic"/><span className="cv-cat">{post.category}</span><span className="cv-flags"><Flag country="china"/> → <Flag country="india"/></span><span className="cv-title">{post.cardTitle || post.title}</span></span></a>
}

function PostCard({ post, index }) {
  return <motion.article className="post-card" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.48,delay:(index%3)*.06}}>
    <PostCover post={post}/><div className="bd"><h3><a href={`/post.html?p=${post.slug}`}>{post.title}</a></h3><div className="post-meta"><span>{post.date}</span><span className="dot"/><span>{post.minutes} min read</span></div><p>{post.summary}</p><a href={`/post.html?p=${post.slug}`} className="read-more">Read more <ArrowRight size={15}/></a></div>
  </motion.article>
}

function Guides() {
  return <section className="section" id="guides"><div className="wrap"><div className="guides-head"><SectionHead label="Import guides" title={<>Learn before you import.</>} body="Practical guides on sourcing, shipping, customs and business ideas from China."/><a href="/blog.html" className="text-link view-all">View all articles <ArrowRight size={16}/></a></div><div className="post-grid three">{blogPosts.slice(0,3).map((p,i)=><PostCard key={p.slug} post={p} index={i}/>)}</div></div></section>
}

function FAQ() {
  return <section className="section" id="faq"><div className="wrap faq-wrap"><SectionHead label="Questions" title="Before you import"/><div className="faq">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span className="faq-plus"/></summary><p>{a}</p></details>)}</div></div></section>
}

function Contact() {
  const [form, setForm] = useState(()=>({name:'',city:'',category:sessionStorage.getItem('importnow-category') || 'Furniture & interiors',origin:sessionStorage.getItem('importnow-origin') || 'china',quantity:'',budget:'Under ₹1 lakh',details:''}))
  useEffect(()=>{
    const applyPlan = event => setForm(current=>({...current,category:event.detail.category,origin:event.detail.origin}))
    window.addEventListener('importnow-plan',applyPlan)
    return ()=>window.removeEventListener('importnow-plan',applyPlan)
  },[])
  const change = e => setForm(f=>({...f,[e.target.name]:e.target.value}))
  const submit = e => {
    e.preventDefault()
    const originName = originMarkets.find(country=>country.id===form.origin)?.name || 'China'
    const message = `Hi ImportNow, I would like a free sourcing quote.\nName: ${form.name}\nCity: ${form.city}\nProduct: ${form.category}\nPreferred origin: ${originName}\nApprox. quantity: ${form.quantity}\nBudget: ${form.budget}\nDetails: ${form.details}`
    window.open(`${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }
  const lines = [
    [Phone,'Call / WhatsApp','+91 99897 24320','tel:+919989724320'],[MapPin,'Offices','Hyderabad, India · Shanghai, China',null],[Instagram,'Instagram','@importnow.in','https://instagram.com/importnow.in/']
  ]
  return <section className="section contact" id="contact"><div className="wrap ct-grid"><div><SectionHead label="Start importing" title={<>Tell us what you want to<br className="desktop-only"/> import. We'll take it from there.</>} body="Share the product and quantity. You'll get supplier options, landed cost and timelines, free of charge."/>
    <div className="ct-lines">{lines.map(([I,label,value,href])=><a className="ct-line" key={label} href={href || '#contact'}><I/><span><small>{label}</small><b>{value}</b></span></a>)}</div></div>
    <form className="quote-form" onSubmit={submit}><h3>Get a free sourcing quote</h3>
      <div className="field"><label htmlFor="f-name">Your name</label><input id="f-name" name="name" value={form.name} onChange={change} placeholder="Name" required autoComplete="name"/></div>
      <div className="row2"><div className="field"><label htmlFor="f-city">City</label><input id="f-city" name="city" value={form.city} onChange={change} placeholder="Your city" required autoComplete="address-level2"/></div><div className="field"><label htmlFor="f-cat">What do you want to import?</label><select id="f-cat" name="category" value={form.category} onChange={change}>{['Furniture & interiors','Electronics & tech','EV & automotive','Lighting','Supermarket & general goods','Machinery & automation','Apparel & footwear','Beauty & cosmetics','China business trip / Canton Fair','Something else'].map(x=><option key={x}>{x}</option>)}</select></div></div>
      <div className="field"><label htmlFor="f-origin">Preferred sourcing country</label><select id="f-origin" name="origin" value={form.origin} onChange={change}>{originMarkets.map(country=><option key={country.id} value={country.id}>{country.name}</option>)}</select></div>
      <div className="row2"><div className="field"><label htmlFor="f-qty">Approx. quantity</label><input id="f-qty" name="quantity" value={form.quantity} onChange={change} placeholder="e.g. 100 pieces" required/></div><div className="field"><label htmlFor="f-budget">Budget</label><select id="f-budget" name="budget" value={form.budget} onChange={change}>{['Under ₹1 lakh','₹1–5 lakh','₹5–25 lakh','₹25 lakh+'].map(x=><option key={x}>{x}</option>)}</select></div></div>
      <div className="field"><label htmlFor="f-msg">Details</label><textarea id="f-msg" name="details" value={form.details} onChange={change} placeholder="Tell us a little more about your requirements"/></div>
      <button className="btn btn-primary form-submit" type="submit">Send on WhatsApp <ArrowRight size={16}/></button><p className="form-note">Opens WhatsApp with your details filled in. We usually reply within a few hours.</p>
    </form>
  </div></section>
}

function Footer({ blog=false }) {
  const prefix = ''
  const serviceLinks = ['Product sourcing','Factory inspection','Quality control','Shipping & logistics','Customs clearance','Doorstep delivery']
  const productLinks = ['Furniture & interiors','Electronics & tech','EV & automotive','Lighting','Supermarket goods','Canton Fair trips']
  return <footer className="footer"><div className="wrap"><div className="ft-top"><div className="ft-brand"><Wordmark light/><p>End-to-end imports from China to India: sourcing, factory inspection, shipping and customs. Save time. Reduce costs.</p><div className="ft-social"><a href="https://instagram.com/importnow.in/" aria-label="Instagram"><Instagram/></a><a href={whatsapp} aria-label="WhatsApp"><MessageCircle/></a><a href="tel:+919989724320" aria-label="Call"><Phone/></a></div></div>
      <div><h4>Our services</h4><ul>{serviceLinks.map(x=><li key={x}><a href={`${prefix}/#services`}>{x}</a></li>)}</ul></div>
      <div><h4>What we import</h4><ul>{productLinks.map((x,i)=><li key={x}><a href={`${prefix}/#${i===5?'trips':'products'}`}>{x}</a></li>)}</ul></div>
      <div><h4>Import guides</h4><ul>{blogPosts.slice(0,5).map(p=><li key={p.slug}><a href={`/post.html?p=${p.slug}`}>{p.title}</a></li>)}<li><a href="/blog.html">All articles →</a></li></ul></div>
      <div><h4>Get in touch</h4><ul className="ft-contact"><li><b>Call / WhatsApp</b><br/><a href="tel:+919989724320">+91 99897 24320</a></li><li><b>India</b><br/>Hyderabad, Telangana</li><li><b>China</b><br/>Shanghai Shengqiao Chain Trading Co., Ltd., Shanghai</li><li><b>Instagram</b><br/><a href="https://instagram.com/importnow.in/">@importnow.in</a></li></ul></div>
    </div><div className="ft-bottom"><span>© 2026 ImportNow.in · All rights reserved.</span><span className="concept">Concept design · preview prepared for ImportNow</span></div></div></footer>
}

function HomePage() {
  return <><ProgressBar/><Nav/><main><Hero/><Marquee/><Services/><Journey/><Products/><MarketFinder/><Shanghai/><Trips/><Work/><Stories/><Guides/><FAQ/><Contact/></main><Footer/><WhatsAppFloat/></>
}

function BlogPage() {
  const [category,setCategory] = useState('All')
  const [query,setQuery] = useState('')
  const [page,setPage] = useState(1)
  const filtered = useMemo(()=>blogPosts.filter(p=>(category==='All'||p.category===category) && `${p.title} ${p.summary} ${p.category}`.toLowerCase().includes(query.toLowerCase())),[category,query])
  const totalPages = Math.ceil(filtered.length / 6)
  const visible = filtered.slice((page-1)*6,page*6)
  const selectCategory = c => {setCategory(c);setPage(1)}
  const search = e => {setQuery(e.target.value);setPage(1)}
  return <><ProgressBar/><Nav blog/><main><section className="page-hero"><div className="wrap"><div className="crumbs"><a href="/">Home</a><span>/</span><span>Blog</span></div><h1>Import Guides <span className="grad-text">&amp; Blogs</span></h1><p>Everything we've learned from hundreds of shipments: sourcing in China, choosing markets, shipping, customs and business ideas for India.</p></div></section>
    <section className="blog-section"><div className="wrap"><div className="blog-tools"><div className="cats" role="group" aria-label="Filter articles by category">{blogCategories.map(c=><button key={c} className={`cat-btn ${category===c?'on':''}`} aria-pressed={category===c} onClick={()=>selectCategory(c)}>{c}</button>)}</div><label className="search"><Search/><span className="sr-only">Search articles</span><input type="search" value={query} onChange={search} placeholder="Search articles"/></label></div>
      {visible.length?<div className="post-grid">{visible.map((post,i)=><PostCard key={post.slug} post={post} index={i}/>)}</div>:<div className="empty"><Search/><h2>No articles found</h2><p>Try another search term or category.</p><button className="btn btn-ghost" onClick={()=>{setQuery('');selectCategory('All')}}>Clear filters</button></div>}
      {totalPages>1&&<div className="pager" aria-label="Blog pagination">{Array.from({length:totalPages},(_,i)=><button key={i} className={page===i+1?'on':''} aria-current={page===i+1?'page':undefined} onClick={()=>setPage(i+1)}>{i+1}</button>)}</div>}
    </div></section></main><Footer blog/><WhatsAppFloat/></>
}

function ArticlePage({ post }) {
  const related=blogPosts.filter(p=>p.slug!==post.slug).slice(0,3)
  return <><ProgressBar/><Nav blog/><main><div className="wrap article-wrap"><article className="article"><div className="crumbs"><a href="/">Home</a><span>/</span><a href="/blog.html">Blog</a><span>/</span><span>{post.category}</span></div><span className="eyebrow">{post.category}</span><h1>{post.title}</h1><div className="post-meta"><span>{post.date}</span><span className="dot"/><span>{post.minutes} min read</span></div><PostCover post={post}/><div className="prose"><p className="article-intro">{post.summary}</p><p>Importing from China can be straightforward when you understand each step before placing an order. A clear plan helps you choose a reliable supplier, estimate your full landed cost and keep your shipment moving.</p><div className="toc"><b>In this guide</b><ol><li><a href="#plan">Plan your order</a></li><li><a href="#check">Check suppliers and samples</a></li><li><a href="#shipping">Plan shipping and delivery</a></li></ol></div><h2 id="plan">Plan your order</h2><p>Start by defining the product specifications, expected quantity and target budget. The right sourcing market depends on the product category: Yiwu is known for small goods, while Foshan and Guangzhou serve furniture and manufacturing clusters.</p><p>Request a detailed quote before confirming. Include product price, packing, shipping, insurance, customs duty, GST and delivery to your final location.</p><h2 id="check">Check suppliers and samples</h2><p>Confirm the supplier's business registration and manufacturing capability. Ask for current product photos, specifications, sample options and production lead time. A factory visit and pre-shipment quality check add another level of confidence.</p><div className="callout"><b>Tip:</b> Keep product requirements and approvals in writing. It makes inspection and final quality checks much easier.</div><h2 id="shipping">Plan shipping and delivery</h2><p>Choose full-container or shared-container shipping based on order size and timing. Before the goods ship, make sure the commercial invoice, packing list and import documentation are ready for customs clearance in India.</p><p>With a verified supplier, agreed product checks and a transparent landed-cost estimate, you can plan your first order with confidence.</p><div className="share"><span>Share this guide</span><a href={`https://wa.me/?text=${encodeURIComponent(post.title+' https://importnow.in')}`} target="_blank" rel="noreferrer">WhatsApp</a><a href="/blog.html">More guides</a></div></div></article>
      <aside className="sidebar"><div className="side-box"><h3>Popular guides</h3>{related.map(p=><a className="pop" href={`/post.html?p=${p.slug}`} key={p.slug}><PostCover post={p}/><span><b>{p.title}</b><span>{p.minutes} min read</span></span></a>)}</div><div className="side-cta"><h3>Ready to import?</h3><p>Tell us what you need. We'll help you find the right factory and work out the landed cost.</p><a href="/#contact" className="btn">Get a free quote <ArrowRight size={15}/></a></div></aside>
    </div><section className="related"><div className="wrap"><SectionHead label="Keep reading" title="More import guides"/><div className="post-grid three">{related.map((p,i)=><PostCard key={p.slug} post={p} index={i}/>)}</div></div></section></main><Footer blog/><WhatsAppFloat/></>
}

function App() {
  const pathname = window.location.pathname
  const postSlug = new URLSearchParams(window.location.search).get('p')
  if (pathname.includes('post') && postSlug) return <ArticlePage post={blogPosts.find(p=>p.slug===postSlug) || blogPosts[0]}/>
  if (pathname.includes('blog')) return <BlogPage/>
  return <HomePage/>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
