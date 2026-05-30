import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TiArrowRightThick } from "react-icons/ti";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose, IoSearch } from "react-icons/io5";
import { TbBrandPowershell } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { FaChevronDown, FaFolderOpen, FaFirefox, FaChrome, FaSpotify, FaSuitcase, FaFile } from "react-icons/fa";
import { VscSplitHorizontal, VscVscode } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { CgMaximize } from "react-icons/cg";
import { ImWindows } from "react-icons/im";
import { SiMcafee } from "react-icons/si";
import { GrHpi } from "react-icons/gr";
import { CiGlobe, CiBatteryFull } from "react-icons/ci";
import { RxSpeakerLoud } from "react-icons/rx";

const PROJECTS = [
  {
    key: "clientportal",
    title: "ClientPortal",
    date: "Apr 2025",
    desc: "Full-stack client management with contracts, digital signatures, and invoicing. Role-based dashboards for admins and clients.",
    tech: "React, Node.js, MongoDB, Express, PDF",
    liveUrl: "https://client-portal-taupe-nu.vercel.app/",
    githubUrl: "https://github.com/Alpha6024/ClientPortal",
    icon: "/favicon.svg",
    img1: "/proj1.png",
    img2: "/proj1.png",
  },
  {
    key: "prithvi",
    title: "Prithvi",
    date: "Mar 2025",
    desc: "Eco-activist social platform with crowdfunding and contributor leaderboards. AI moderation auto-detects scams and bad actors.",
    tech: "React, Node.js, AI Moderation, MongoDB",
    liveUrl: "https://prithvi-orcin.vercel.app/",
    githubUrl: "https://github.com/Alpha6024/prithvi",
    icon: "/favicon.svg",
    img1: "/proj2.png",
    img2: "/proj2.png",
  },
  {
    key: "ruralcare",
    title: "RuralCare",
    date: "Jan 2025",
    desc: "Blockchain-secured doctor registry with fraud-proof smart contracts. AI engine analyzes symptoms and delivers instant health solutions.",
    tech: "Blockchain, Solidity, AI, React, Node.js",
    liveUrl: "https://rural-care-five.vercel.app/",
    githubUrl: "https://github.com/Alpha6024/RuralCare",
    icon: "/favicon.svg",
    img1: "/proj3.png",
    img2: "/proj3.png",
  },
  {
    key: "eventpulse",
    title: "Event-Pulse",
    date: "Sep 2024",
    desc: "Role-based event management for students, organizers, and admins. Auto-generates personalized QR-embedded certificates instantly.",
    tech: "React, Node.js, QR Code, MongoDB, Express",
    liveUrl: "https://event-pulse-two.vercel.app/",
    githubUrl: "https://github.com/Alpha6024/Event-Pulse",
    icon: "/favicon.svg",
    img1: "/proj4.png",
    img2: "/proj4.png",
  },
];

const terminalGroups = [
  ["> whoami", "Name: Pranav Borkar", "Age: 20", "Location: Pune, India", "Status: Open to Opportunities"],
  ["> education",
    "🎓 Diploma in Computer Engineering | 92.63% | Completed: 2025", "JSPM, Pune",
    "🎓 B.Tech in Computer Engineering | SGPA: 8.92 | Pursuing", "AISSMS IOIT, Pune"],
  ["> tech stack", "💻 MERN Stack | Blockchain | DevOps | Web3 | REST APIs | CI/CD"],
  ["> languages", "⌨️ JavaScript | Java | Python | C/C++ | Solidity | CSS"],
  ["> soft skills", "🧠 Leadership | Communication | Team Player | Problem Solver | Fast Learner"],
  ["> community", "👥 Community Service Director — Rotaract Club of Pune Vibrant Elite (2023–2024)"],
  ["> achievements", "🥈 Runner-Up — PEC 2025", "⚡ 6+ Hackathons Competed"],
  ["> motto", '"Every problem is just unwritten code."'],
];

const allLines = terminalGroups.flat();

function MarqueeStrip({ items }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="h-[10vh] w-full bg-black font-anton text-xs sm:text-lg lg:text-2xl text-white overflow-hidden flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "loop" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="px-8">{item}</span>
        ))}
      </motion.div>
    </div>
  );
}

function SplitText({ text, className, stagger = 0.05, delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * stagger, duration: 0.4, ease: "easeOut" }}
          className="inline-block"
          style={{ whiteSpace: ch === " " ? "pre" : undefined }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [openProject, setOpenProject] = useState(null);
  const [time, setTime] = useState(new Date());

  // ── Section refs for smooth scroll ──────────────────────────────
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsScrollRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  // ────────────────────────────────────────────────────────────────

  const terminalRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const projectsRef = useRef(null);

  const terminalInView = useInView(terminalRef, { once: true, margin: "-100px" });
  const projectsInView = useInView(projectsSectionRef, { once: true, margin: "-100px" });
  const started = useRef(false);

  const activeProject = PROJECTS.find(p => p.key === openProject) || null;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!terminalInView || started.current) return;
    started.current = true;
    let lineIndex = 0;
    let charIndex = 0;
    const type = () => {
      if (lineIndex >= allLines.length) return;
      const currentLine = allLines[lineIndex];
      if (charIndex <= currentLine.length) {
        setTypedText(currentLine.slice(0, charIndex));
        charIndex++;
        setTimeout(type, 30);
      } else {
        setDisplayedLines(prev => [...prev, currentLine]);
        setTypedText("");
        lineIndex++;
        charIndex = 0;
        setTimeout(type, currentLine.startsWith(">") ? 300 : 80);
      }
    };
    type();
  }, [terminalInView]);

  return (
    <>
    <div className="overflow-hidden">
      <div className="h-full w-full font-anton bg-white">

        <div className="hidden lg:block bg-[#282D2A] h-[100vh] fixed left-0 top-0 z-10 w-[25vw]"></div>

        <div className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-4 lg:px-0 bg-white/70 lg:bg-white/10 backdrop-blur-md">
          <div className="h-[12vh] w-auto flex items-center justify-center">
            <div
              className="text-black lg:text-white text-center font-anton p-2 text-2xl lg:ml-[3vw] cursor-pointer"
              onClick={() => scrollTo(homeRef)}
            >
              PORTFOLIO
            </div>
          </div>

          <div className="hidden lg:flex h-[12vh] w-[45vw] justify-evenly items-center mr-4">
            <div onClick={() => scrollTo(homeRef)} className="text-black text-center p-2 text-2xl cursor-pointer hover:text-[#FF3D00] transition-colors">HOME</div>
            <div onClick={() => scrollTo(aboutRef)} className="text-black text-center p-2 text-2xl cursor-pointer hover:text-[#FF3D00] transition-colors">ABOUT ME</div>
            <div onClick={() => scrollTo(projectsScrollRef)} className="text-black text-center p-2 text-2xl cursor-pointer hover:text-[#FF3D00] transition-colors">PROJECTS</div>
            <div
              onClick={() => scrollTo(contactRef)}
              className="h-[7vh] w-[13vw] ml-5 rounded-3xl bg-black flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="px-2 text-white text-center text-lg">GET IN TOUCH</div>
              <div className="w-7.5 h-7.5 bg-[#FF3D00] rounded-full flex items-center justify-center">
                <TiArrowRightThick className="text-2xl text-white" />
              </div>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-black">
              {menuOpen ? <IoClose /> : <RxHamburgerMenu />}
            </button>
          </div>
        </div>

        <div className="h-[12vh]"></div>

        {menuOpen && (
          <div className="lg:hidden fixed top-[12vh] left-0 w-full z-50 bg-white flex flex-col items-center gap-4 py-6 shadow-md">
            <div className="text-black text-xl cursor-pointer" onClick={() => scrollTo(homeRef)}>HOME</div>
            <div className="text-black text-xl cursor-pointer" onClick={() => scrollTo(aboutRef)}>ABOUT ME</div>
            <div className="text-black text-xl cursor-pointer" onClick={() => scrollTo(projectsScrollRef)}>PROJECTS</div>
            <div
              className="rounded-3xl bg-black flex justify-center items-center px-4 py-2 cursor-pointer"
              onClick={() => scrollTo(contactRef)}
            >
              <div className="text-white text-lg">GET IN TOUCH</div>
              <div className="ml-2 w-7 h-7 bg-[#FF3D00] rounded-full flex items-center justify-center">
                <TiArrowRightThick className="text-xl text-white" />
              </div>
            </div>
          </div>
        )}

        {/* ── HOME section ── */}
        <div ref={homeRef} className="flex flex-col lg:flex-row lg:justify-end font-anton lg:h-[88vh]">
          <div className="relative z-20 bg-[url('/news.png')] bg-cover bg-center w-full lg:w-[37vw] h-[55vh] lg:h-[60vh] lg:mt-[4%] font-anton text-left pt-[17vh] pl-8 lg:pl-12">
            <div className="text-black text-base lg:text-lg">Hey I'm a</div>
            <div className="text-[#FF3D00] font-bold text-5xl lg:text-6xl leading-tight">FULL-STACK</div>
            <div className="text-[#FF3D00] text-5xl lg:text-6xl leading-tight">DEVELOPER</div>
            <div className="relative mt-2">
              <div className="text-black text-sm lg:text-base">From idea to deployed - end to end</div>
            </div>
          </div>
          <div className="w-full lg:w-[58vw] h-[50vh] lg:h-[85vh] bg-[url('/pranav1.jpeg')] bg-cover bg-center"></div>
        </div>

      </div>

      <div className="w-full bg-white relative z-20">
        <div className="h-[2vh] w-full relative z-20 bg-[#FF3D00]"></div>
        <div className="bg-white z-20 relative">
          <MarqueeStrip items={["WEB3", "DEVOPS", "BLOCKCHAIN", "AI", "AUTOMATED", "CLOUD"]} />
          <div className="h-[2vh] w-full bg-[#FF3D00]"></div>
        </div>

        {/* ── ABOUT ME section ── */}
        <div ref={aboutRef} className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-[35vw] lg:h-[98vh] flex flex-col items-center justify-center py-8 lg:py-0">
            <div className="h-[40vh] w-[70vw] lg:h-[60vh] lg:w-[27vw] bg-[url('/img4.jpg')] bg-cover bg-center"></div>
            <div className=" w-[70vw] lg:w-[26vw] rounded-3xl font-anton bg-black text-white flex flex-col justify-center items-center py-4">
              <div className="w-[50vw] lg:w-[15vw] text-sm lg:text-base">about me</div>
              <div className="text-xl lg:text-2xl w-[50vw] lg:w-[15vw]">Who is <p className="text-[#FF3D00]">PRANAV BORKAR ?</p></div>
            </div>
          </div>
          <div className="w-full lg:w-[65vw] lg:h-[88vh]">
            <section className="min-h-screen w-full flex justify-center items-center px-3 py-10">
              <motion.div
                ref={terminalRef}
                initial={{ opacity: 0, y: 60 }}
                animate={terminalInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-full max-w-[900px] h-[80vh] bg-[#03070f] flex flex-col text-green-400 font-mono rounded-lg shadow-inner border border-gray-800"
                style={{
                  boxShadow: terminalInView
                    ? "0 0 0 1px rgba(74,222,128,0.15), 0 0 40px 4px rgba(74,222,128,0.08)"
                    : undefined,
                }}
              >
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none z-10 overflow-hidden"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  animate={{ boxShadow: ["0 0 0px 0px rgba(74,222,128,0)", "0 0 18px 3px rgba(74,222,128,0.18)", "0 0 0px 0px rgba(74,222,128,0)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="flex flex-wrap justify-between items-center border-b border-gray-700 px-2 sm:px-6 py-2 gap-y-1 text-xs sm:text-sm shrink-0 relative z-20">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-400">
                    {["PROBLEMS", "OUTPUT", "DEBUG"].map(t => (
                      <span key={t} className="hover:text-gray-100 cursor-pointer hidden sm:inline transition-colors">{t}</span>
                    ))}
                    <span className="text-gray-100 border-b-2 border-blue-600 pb-0.5">TERMINAL</span>
                    <span className="hover:text-gray-100 cursor-pointer hidden sm:inline transition-colors">PORTS</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
                    <div className="hidden sm:flex cursor-pointer items-center gap-1 text-xs hover:text-white transition-colors"><TbBrandPowershell /> powershell</div>
                    <div className="flex cursor-pointer items-center gap-1"><FiPlus /><FaChevronDown /></div>
                    <VscSplitHorizontal className="cursor-pointer hidden sm:block" />
                    <RiDeleteBin5Line className="cursor-pointer hover:text-red-400 transition-colors" />
                    <BsThreeDots className="cursor-pointer" />
                    <CgMaximize className="cursor-pointer hidden sm:block" />
                    <IoClose className="cursor-pointer hover:text-red-400 transition-colors" />
                  </div>
                </div>
                <div className="flex-1 bg-[#0C0C0C] p-3 sm:p-6 overflow-y-auto text-xs sm:text-sm md:text-base leading-relaxed relative z-20">
                  <AnimatePresence>
                    {displayedLines.map((line, i) => (
                      <motion.div
                        key={`${line}-${i}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`whitespace-pre-wrap mb-1 ${line.startsWith(">") ? "text-green-300 font-bold" : "text-green-500"}`}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {typedText && (
                    <div className="whitespace-pre-wrap mb-1 text-green-300 font-bold">
                      {typedText}<span className="animate-pulse">_</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>

      {/* ── PROJECTS section ── */}
      <div ref={projectsScrollRef} className="h-[2vh] w-full relative z-20 bg-[#FF3D00]"></div>
      <div className="bg-white z-20 relative">
        <MarqueeStrip items={["SCALABLE", "SECURED", "SHIPPED", "OPEN-SOURCE", "DEPLOYED", "INTEGRATED"]} />
        <div className="h-[2vh] w-full bg-[#FF3D00]"></div>
      </div>

      <div className="bg-white flex items-center relative z-20 w-full py-10" ref={projectsRef}>
        <section className="w-full flex flex-col lg:flex-row justify-center items-center gap-1 lg:gap-10 px-4">

          {/* Laptop / Windows mock */}
          <motion.div
            ref={projectsSectionRef}
            initial={{ opacity: 0, x: -80 }}
            animate={projectsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center w-full lg:w-auto"
          >
            <div
              className="relative rounded-2xl overflow-hidden border-2 border-gray-800 bg-[#1e1e2e] w-full lg:w-[45vw]"
              style={{ height: "60vh", maxWidth: "700px", minWidth: "280px" }}
            >
              <div className="p-4 h-full overflow-hidden">
                <div className="grid grid-cols-2 gap-x-2 gap-y-3 w-fit">
                  {PROJECTS.map((p, i) => (
                    <motion.div
                      key={p.key}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={projectsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.35, type: "spring", stiffness: 200 }}
                      onClick={() => setOpenProject(openProject === p.key ? null : p.key)}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(75,85,99,0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-white h-min w-min p-2 text-sm cursor-pointer rounded ${openProject === p.key ? "bg-gray-600/60" : ""}`}
                    >
                      <FaFile className="text-green-400 mb-1 text-3xl" />
                      <span className="whitespace-nowrap text-xs">{p.title}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Taskbar */}
              <div className="absolute bottom-0 h-10 w-full bg-gray-300 flex items-center">
                <div className="w-[20%]" />
                <div className="flex-1 flex justify-center items-center gap-1.5 text-sm">
                  <ImWindows className="text-blue-600 text-lg" />
                  <div className="flex items-center gap-1 bg-white rounded-full px-2 py-0.5 text-gray-600 text-xs cursor-text"><IoSearch /> Search</div>
                  <FaFolderOpen className="text-amber-300" />
                  <SiMcafee className="text-red-800 hidden lg:block" />
                  <FaSuitcase className="text-blue-900 hidden lg:block" />
                  <GrHpi className="text-blue-600 hidden lg:block" />
                  <FaFirefox className="text-orange-600" />
                  <FaChrome className="text-blue-950" />
                  <FaSpotify className="text-green-500 hidden lg:block" />
                  <VscVscode className="text-blue-500" />
                </div>
                <div className="flex justify-end items-center gap-1.5 w-[20%] pr-2">
                  <div className="flex gap-0.5 text-xs"><CiGlobe /><RxSpeakerLoud /><CiBatteryFull /></div>
                  <div className="flex flex-col items-end font-semibold text-[9px]">
                    <div>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}</div>
                    <div>{time.toLocaleDateString("en-GB")}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-5 w-12 bg-gray-800" />
            <div className="bg-gray-800 h-3 w-20" />
          </motion.div>

          {/* Project detail panel */}
          <AnimatePresence mode="wait">
            {activeProject ? (
              <motion.div
                key={activeProject.key}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-[#111] text-white rounded-2xl border border-gray-700 p-6 w-full lg:w-[35vw] max-w-[500px] flex flex-col gap-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={activeProject.icon} className="h-8 w-8 rounded-full" alt={activeProject.title} />
                    <div>
                      <div className="font-bold text-lg">{activeProject.title}</div>
                      <div className="text-gray-400 text-xs">{activeProject.date}</div>
                    </div>
                  </div>
                  <button onClick={() => setOpenProject(null)} className="text-gray-400 hover:text-red-400 transition-colors">
                    <IoClose className="text-xl" />
                  </button>
                </div>

                <div className="h-28">
                  <img className="object-cover rounded-lg w-full h-full" src={activeProject.img1} alt="ss1" />
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">{activeProject.desc}</p>
                <p className="text-xs text-green-400">🛠 {activeProject.tech}</p>

                <div className="flex gap-3 mt-auto">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 rounded-lg transition-colors"
                    >
                      🔗 Live Demo
                    </a>
                  )}
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-center bg-gray-700 hover:bg-gray-600 text-white text-sm font-bold py-2 rounded-lg transition-colors ${activeProject.liveUrl ? "flex-1" : "w-full"}`}
                  >
                    GitHub ↗
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full lg:w-[35vw] max-w-[500px] min-h-[60vh] flex items-center justify-center"
              >
                <img src="/graffiti.png" alt="graffiti" className="w-full h-full object-contain" />
              </motion.div>
            )}
          </AnimatePresence>

        </section>
      </div>

      <div className="h-[2vh] w-full relative z-20 bg-[#FF3D00]"></div>
<div className="bg-white z-20 relative">
  <MarqueeStrip items={["JAVASCRIPT", "CPP", "PYTHON", "CSS", "JAVA", "SOLIDITY"]} />
  <div className="h-[2vh] w-full bg-[#FF3D00]"></div>
</div>

{/* ── CONTACT section ── */}
<div ref={contactRef} className="min-h-screen relative font-anton z-20 flex flex-col justify-center items-center bg-white w-full">
  <div className="h-[15vh] lg:h-[20vh] w-full flex justify-center items-center text-black text-2xl lg:text-5xl">CONNECT WITH ME</div>

  <div className="grid grid-cols-2 lg:flex lg:flex-row justify-center gap-2 w-full px-2 lg:px-0 pb-4 lg:pb-0 lg:h-[72vh]">

    <a href="mailto:pranavborkar40@gmail.com" className="group h-[40vh] lg:h-full lg:w-[18vw] flex flex-col justify-between py-6 lg:pt-16 lg:pb-0 items-center bg-[#282D2A] cursor-pointer hover:opacity-90 transition-opacity">
      <div className="flex flex-col justify-center items-center px-2 text-center transition-all duration-300 group-hover:-translate-y-4 group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] rounded-xl p-2">
        <div className="text-xl lg:text-5xl text-white">EMAIL</div>
        <span className="text-white italic text-[9px] lg:text-sm mt-1 break-all">pranavborkar40@gmail.com</span>
      </div>
      <div className="shrink-0 text-[#FF3D00] flex justify-center items-end font-extrabold text-5xl lg:text-9xl lg:h-[20vh] pb-4 lg:pb-8">1</div>
    </a>

    <a href="https://linkedin.com/in/pranavborkar" target="_blank" rel="noopener noreferrer" className="group h-[40vh] lg:h-full lg:w-[18vw] flex flex-col justify-between py-6 lg:pt-16 lg:pb-0 items-center bg-[#FF3D00] cursor-pointer hover:opacity-90 transition-opacity">
      <div className="flex flex-col justify-center items-center px-2 text-center transition-all duration-300 group-hover:-translate-y-4 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] rounded-xl p-2">
        <div className="text-xl lg:text-5xl text-white">LINKEDIN</div>
        <span className="text-white italic text-[9px] lg:text-sm mt-1 break-all">linkedin.com/in/pranavborkar</span>
      </div>
      <div className="shrink-0 text-[#282D2A] flex justify-center items-end font-extrabold text-5xl lg:text-9xl lg:h-[20vh] pb-4 lg:pb-8">2</div>
    </a>

    <a href="https://github.com/Alpha6024" target="_blank" rel="noopener noreferrer" className="group h-[40vh] lg:h-full lg:w-[18vw] flex flex-col justify-between py-6 lg:pt-16 lg:pb-0 items-center bg-[#282D2A] cursor-pointer hover:opacity-90 transition-opacity">
      <div className="flex flex-col justify-center items-center px-2 text-center transition-all duration-300 group-hover:-translate-y-4 group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] rounded-xl p-2">
        <div className="text-xl lg:text-5xl text-white">GITHUB</div>
        <span className="text-white italic text-[9px] lg:text-sm mt-1 break-all">github.com/Alpha6024</span>
      </div>
      <div className="shrink-0 text-[#FF3D00] flex justify-center items-end font-extrabold text-5xl lg:text-9xl lg:h-[20vh] pb-4 lg:pb-8">3</div>
    </a>

    <a href="https://x.com/PranavBorkar06" target="_blank" rel="noopener noreferrer" className="group h-[40vh] lg:h-full lg:w-[18vw] flex flex-col justify-between py-6 lg:pt-16 lg:pb-0 items-center bg-[#FF3D00] cursor-pointer hover:opacity-90 transition-opacity">
      <div className="flex flex-col justify-center items-center px-2 text-center transition-all duration-300 group-hover:-translate-y-4 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] rounded-xl p-2">
        <div className="text-xl lg:text-5xl text-white">TWITTER/X</div>
        <span className="text-white italic text-[9px] lg:text-sm mt-1 break-all">x.com/PranavBorkar06</span>
      </div>
      <div className="shrink-0 text-[#282D2A] flex justify-center items-end font-extrabold text-5xl lg:text-9xl lg:h-[20vh] pb-4 lg:pb-8">4</div>
    </a>

  </div>
</div>

<div className="w-full font-anton bg-white relative z-20 overflow-hidden h-[16vh] lg:h-[40vh]">
  <div className="hidden lg:block h-[10vh] bg-white"></div>
  <div className="h-[6vh] flex justify-center items-center text-[#FF3D00] text-2xl lg:text-4xl">SAY HI</div>
  <div className="flex justify-center text-black items-center whitespace-nowrap text-[5rem] sm:text-[7rem] lg:text-[12rem] leading-none">I DON'T BITE</div>
</div>
        </div>
    </>
  );
}