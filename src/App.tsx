/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Box, Cpu, Globe, Zap, Monitor, Sparkles, ChevronDown, Info, Plus, Volume2, VolumeX } from 'lucide-react';

const OTHER_IMAGES = [
  "https://i.postimg.cc/6px5twdH/yu-hang-yuan-shou-bu-xiu-fu.png",
  "https://i.postimg.cc/hj634JTF/06eb6e065b528abd1782c93b211ef2b4.jpg",
  "https://i.postimg.cc/5NMCcxTF/7a375afe9e227fb2896167232638af07.jpg",
  "https://i.postimg.cc/L88k79g0/4d0c46aa1a979b43964b8035a6658164.jpg",
  "https://i.postimg.cc/G2wycdtM/a9261c4ba6dcf3ffb7b17a39acd972d4.jpg",
  "https://i.postimg.cc/qMTgg1kz/aizhen161-two-astronauts-a2f0fd6d-ad7c-4e79-8b46-bdae8319629d-(1).png",
  "https://i.postimg.cc/L5RX6Dpv/b14570979542819f1b88de18df83d19b.jpg",
  "https://i.postimg.cc/xjhfYZh7/a62120044315970ca7decb8633dabd4384764b321234a-9BYNpb-fw658webp.webp",
  "https://i.postimg.cc/SKHBHng5/jimeng-2026-03-27-1429-gai-cheng-heng44ban-zhong-jian-liu-chu-kong-jian-tu-pian1.jpg"
];

// --- Components ---

const NoiseOverlay = () => <div className="noise-overlay" />;
const TechnicalLines = () => <div className="technical-lines" />;
const GridPattern = () => <div className="grid-pattern" />;

const CornerBrackets = () => (
  <div className="absolute inset-20 pointer-events-none opacity-20">
    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
  </div>
);

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[800px] h-[800px] pointer-events-none z-[150] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(0, 255, 0, 0.12) 0%, transparent 70%)',
        mixBlendMode: 'screen',
      }}
      animate={{
        x: mousePos.x - 400,
        y: mousePos.y - 400,
      }}
      transition={{ type: 'spring', damping: 50, stiffness: 300, mass: 0.5 }}
    />
  );
};

const TechnicalHeader = ({ pageNum }: { pageNum: number }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed top-0 left-0 w-full p-10 z-[100] flex justify-between items-start pointer-events-none"
  >
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        <span className="micro-label">26.Mar.2026</span>
        <div className="w-8 h-[1px] bg-white/20" />
        <span className="micro-label">Design By Shader</span>
      </div>
    </div>
    
    <div className="flex flex-col items-end gap-1">
      <div className="micro-label">"COSMOS"</div>
      <div className="px-2 py-0.5 bg-poster-accent text-black font-mono text-[10px] font-bold mt-1">NUM / 0{pageNum} /</div>
    </div>
  </motion.div>
);

const TechnicalFooter = () => (
  <div className="fixed bottom-0 left-0 w-full p-10 z-[100] flex justify-between items-end pointer-events-none">
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="h-[1px] w-full bg-white/10" />
      <p className="font-mono text-[8px] leading-relaxed opacity-30">
        Humanity moved to the stars after Earth became nearly uninhabitable. The Cosmic Era began with massive colonies taking over the lunar surface.
      </p>
    </div>
    <div className="flex items-center gap-4">
      <span className="micro-label">Prolog</span>
      <div className="w-8 h-[1px] bg-white/20" />
      <span className="micro-label">Prolog</span>
    </div>
  </div>
);

const GlitchEffect = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0.8, 1, 0] }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, times: [0, 0.2, 0.4, 0.6, 1] }}
    className="fixed inset-0 z-[200] pointer-events-none bg-black/10 backdrop-blur-[1px]"
  >
    {/* Horizontal Glitch Bars - Reduced count and simplified */}
    {Array.from({ length: 6 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-full bg-poster-accent/30 mix-blend-screen"
        initial={{ top: `${Math.random() * 100}%`, height: `${Math.random() * 20}px`, x: "-100%" }}
        animate={{ 
          x: ["-100%", "100%"],
          opacity: [0, 0.6, 0]
        }}
        transition={{ 
          duration: 0.1, 
          delay: Math.random() * 0.2,
          repeat: 1
        }}
      />
    ))}
    {/* RGB Split Overlay */}
    <motion.div 
      className="absolute inset-0 bg-red-500/5 mix-blend-screen"
      animate={{ x: [-2, 2, 0], y: [1, -1, 0] }}
      transition={{ duration: 0.1, repeat: 3 }}
    />
    <motion.div 
      className="absolute inset-0 bg-green-500/5 mix-blend-screen"
      animate={{ x: [2, -2, 0], y: [-1, 1, 0] }}
      transition={{ duration: 0.1, repeat: 3 }}
    />
  </motion.div>
);

const RippleEffect = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 1, 0] }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2, times: [0, 0.2, 0.8, 1] }}
    className="fixed inset-0 z-[200] pointer-events-none"
  >
    <svg className="absolute inset-0 w-full h-full">
      <filter id="rippleFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="3" result="noise">
          <animate attributeName="baseFrequency" values="0.01 0.05; 0.05 0.1; 0.01 0.05" dur="1.2s" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="150" />
      </filter>
    </svg>
    <div 
      className="absolute inset-0 bg-white/5 backdrop-blur-[10px]" 
      style={{ filter: 'url(#rippleFilter)' }} 
    />
    {/* Additional overlay to enhance the "liquid" feel */}
    <motion.div 
      className="absolute inset-0 bg-poster-accent/5 mix-blend-overlay"
      animate={{ opacity: [0, 0.3, 0] }}
      transition={{ duration: 1.2 }}
    />
  </motion.div>
);

// --- Pages ---

const Page1Terminal = ({ progress, onNext }: { progress: number, onNext: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [logsFinished, setLogsFinished] = useState(false);
  
  const bootLogs = [
    "BIOS Version 1.0.4 - Cosmic Exploration Unit",
    "系统硬件初始化中...",
    "CPU: Quantum Core X1 - OK",
    "Memory: 128TB Photonic RAM - OK",
    "Storage: Singularity Drive - OK",
    "Network: Deep Space Relay - CONNECTED",
    "正在加载操作系统: INTERSTELLAR v2.5...",
    "检查导航系统完整性...",
    "建立与 GARGANTUA 的安全连接...",
    "系统就绪。启动发射序列...",
    "未知信号已连接",
    "正在开启宇宙入口"
  ];

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        setLogsFinished(true);
      }
    }, 150);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && logsFinished) {
      const t = setTimeout(onNext, 800);
      return () => clearTimeout(t);
    }
  }, [progress, logsFinished, onNext]);

  return (
    <div className="h-screen w-screen flex flex-col bg-black p-12 relative overflow-hidden terminal-text">
      <div className="absolute inset-0 noise-overlay opacity-20" />
      <div className="absolute inset-0 technical-lines opacity-30" />
      <GridPattern />
      
      <div className="z-10 flex flex-col h-full max-w-4xl mx-auto w-full">
        <div className="flex-grow space-y-1 overflow-hidden pt-10">
          {logs.map((log, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
              {`> ${log}`}
            </div>
          ))}
          {progress < 100 && (
            <div className="w-2 h-5 bg-[#00ff00] animate-pulse inline-block align-middle ml-1" />
          )}
        </div>

        <div className="mt-auto space-y-6 pb-10">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <div className="text-xs opacity-60 tracking-widest">SYSTEM LOADING / 系统加载中</div>
              <div className="text-4xl font-bold font-mono">{Math.floor(progress)}%</div>
            </div>
            <div className="text-right text-xs opacity-60 font-mono">
              ESTABLISHING LINK...<br />
              SIGNAL STRENGTH: 98%
            </div>
          </div>

          <div className="h-6 w-full border border-[#00ff00]/30 p-1 relative overflow-hidden">
            <motion.div 
              className="h-full bg-[#00ff00]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
            {/* Grid overlay on progress bar */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="flex-1 border-r border-black/20" />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between text-[10px] opacity-40 font-mono">
            <span>SECTOR: 7G-ALPHA</span>
            <span>COORDINATES: 14.22.90.11</span>
            <span>TIME: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FRAME_URLS = [
  "https://i.postimg.cc/vTYGK7x9/wei-biao-ti-10000.webp",
  "https://i.postimg.cc/yx17Gh3R/wei-biao-ti-10001.webp",
  "https://i.postimg.cc/0jk94GKp/wei-biao-ti-10002.webp",
  "https://i.postimg.cc/mkLTn31C/wei-biao-ti-10003.webp",
  "https://i.postimg.cc/0jk94GKC/wei-biao-ti-10004.webp",
  "https://i.postimg.cc/90mckPwY/wei-biao-ti-10005.webp",
  "https://i.postimg.cc/zvzqQwHj/wei-biao-ti-10006.webp",
  "https://i.postimg.cc/8cpTYdfw/wei-biao-ti-10007.webp",
  "https://i.postimg.cc/BbSJz5PV/wei-biao-ti-10008.webp",
  "https://i.postimg.cc/WzNsymq9/wei-biao-ti-10009.webp",
  "https://i.postimg.cc/cCxdz7tz/wei-biao-ti-10010.webp",
  "https://i.postimg.cc/bryq50SM/wei-biao-ti-10011.webp",
  "https://i.postimg.cc/90mckPws/wei-biao-ti-10012.webp",
  "https://i.postimg.cc/7hHqR1Jp/wei-biao-ti-10013.webp",
  "https://i.postimg.cc/gjgGbw3g/wei-biao-ti-10014.webp",
  "https://i.postimg.cc/zvxqYLT9/wei-biao-ti-10016.webp",
  "https://i.postimg.cc/yxL7CJ0t/wei-biao-ti-10017.webp",
  "https://i.postimg.cc/vT0Gw15C/wei-biao-ti-10018.webp",
  "https://i.postimg.cc/7hKqrCgv/wei-biao-ti-10019.webp",
  "https://i.postimg.cc/NFdQvy1Y/wei-biao-ti-10020.webp",
  "https://i.postimg.cc/PJSdnLmd/wei-biao-ti-10022.webp",
  "https://i.postimg.cc/GtXbnBkH/wei-biao-ti-10023.webp",
  "https://i.postimg.cc/tRkqxc8h/wei-biao-ti-10024.webp",
  "https://i.postimg.cc/ryjVrH7G/wei-biao-ti-10025.webp",
  "https://i.postimg.cc/v8hYVKCX/wei-biao-ti-10026.webp",
  "https://i.postimg.cc/44Pf90jB/wei-biao-ti-10028.webp",
  "https://i.postimg.cc/qBwJ3FW1/wei-biao-ti-10029.webp",
  "https://i.postimg.cc/1RBmqdbY/wei-biao-ti-10030.webp",
  "https://i.postimg.cc/Df6vXNRM/wei-biao-ti-10031.webp",
  "https://i.postimg.cc/nV2FDWNN/wei-biao-ti-10032.webp",
  "https://i.postimg.cc/dQ6syfgp/wei-biao-ti-10033.webp",
  "https://i.postimg.cc/CM7hq293/wei-biao-ti-10034.webp",
  "https://i.postimg.cc/mZjLHn04/wei-biao-ti-10035.webp",
  "https://i.postimg.cc/wx2qmrSp/wei-biao-ti-10036.webp",
  "https://i.postimg.cc/jqcx71GK/wei-biao-ti-10037.webp",
  "https://i.postimg.cc/BZpSKzdJ/wei-biao-ti-10038.webp",
  "https://i.postimg.cc/dt0qmBYM/wei-biao-ti-10040.webp",
  "https://i.postimg.cc/285zFwDD/wei-biao-ti-10041.webp",
  "https://i.postimg.cc/MKGWbDSq/wei-biao-ti-10042.webp",
  "https://i.postimg.cc/TYPRq96R/wei-biao-ti-10043.webp",
  "https://i.postimg.cc/8PC1BHSP/wei-biao-ti-10044.webp",
  "https://i.postimg.cc/9FfWtphM/wei-biao-ti-10046.webp",
  "https://i.postimg.cc/4N3Jb5gm/wei-biao-ti-10047.webp",
  "https://i.postimg.cc/Prqtz4jp/wei-biao-ti-10048.webp",
  "https://i.postimg.cc/fTbwjKNS/wei-biao-ti-10049.webp",
  "https://i.postimg.cc/vHmQLzsV/wei-biao-ti-10050.webp",
  "https://i.postimg.cc/zXfJSjrW/wei-biao-ti-10052.webp",
  "https://i.postimg.cc/5Ntxq3VL/wei-biao-ti-10053.webp",
  "https://i.postimg.cc/SNtmZMSK/wei-biao-ti-10054.webp",
  "https://i.postimg.cc/DyY7CXv0/wei-biao-ti-10055.webp",
  "https://i.postimg.cc/GhSbMyLT/wei-biao-ti-10056.webp",
  "https://i.postimg.cc/DyY7CXvb/wei-biao-ti-10057.webp",
  "https://i.postimg.cc/651BHvWv/wei-biao-ti-10058.webp",
  "https://i.postimg.cc/DyY7CXv1/wei-biao-ti-10059.webp",
  "https://i.postimg.cc/YqytXWrx/wei-biao-ti-10060.webp",
  "https://i.postimg.cc/651BHvWc/wei-biao-ti-10061.webp",
  "https://i.postimg.cc/rFYqhrVG/wei-biao-ti-10062.webp",
  "https://i.postimg.cc/hP3KCdD3/wei-biao-ti-10064.webp",
  "https://i.postimg.cc/zXPqdgzQ/wei-biao-ti-10065.webp",
  "https://i.postimg.cc/JzDMSz05/wei-biao-ti-10066.webp",
  "https://i.postimg.cc/cLg0PLCm/wei-biao-ti-10067.webp",
  "https://i.postimg.cc/mgzBKgkp/wei-biao-ti-10069.webp",
  "https://i.postimg.cc/rw0M7wsP/wei-biao-ti-10070.webp",
  "https://i.postimg.cc/YCGMTC0Z/wei-biao-ti-10071.webp",
  "https://i.postimg.cc/Vkrm2k5y/wei-biao-ti-10072.webp"
];

const Page2BlackHole = ({ frameIndex }: { frameIndex: number }) => {
  const totalFrames = FRAME_URLS.length;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Sequence - Controlled by Scroll */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative">
          {FRAME_URLS.map((url, i) => (
            <img 
              key={url}
              src={url} 
              alt={`Cosmos Frame ${i}`} 
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-[0.7]"
              style={{ 
                opacity: i === frameIndex ? 1 : 0,
                visibility: i === frameIndex ? 'visible' : 'hidden'
              }}
              referrerPolicy="no-referrer"
            />
          ))}
          {/* Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)]" />
        </div>
      </div>

      {/* Astronaut Overlay - Always visible on Page 2 */}
      <motion.div 
        className="absolute z-[5] pointer-events-none flex items-center justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: [0, -20, 0],
          opacity: 1
        }}
        transition={{ 
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          },
          opacity: { duration: 1.5 }
        }}
      >
        <img 
          src="https://i.postimg.cc/6px5twdH/yu-hang-yuan-shou-bu-xiu-fu.png" 
          alt="Astronaut" 
          className="w-64 md:w-80 lg:w-96 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <CornerBrackets />
      
      <div className="z-10 w-full max-w-7xl px-12 flex flex-col items-start">
        <AnimatePresence>
          {frameIndex === totalFrames - 1 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="micro-label text-poster-accent px-2 py-1 border border-poster-accent/30">SECTOR 05-G</span>
                <span className="micro-label opacity-40 tracking-[0.3em]">SINGULARITY DETECTED</span>
              </div>

              <h2 className="text-[12vw] poster-title glow-hover leading-[0.8] tracking-tighter mb-12">
                GARGAN<br />TUA
              </h2>

              <div className="space-y-8">
                <p className="text-lg font-light tracking-[0.2em] uppercase leading-relaxed max-w-xl opacity-80">
                  "We've always defined ourselves by the ability to overcome the impossible."
                </p>
                
                <div className="flex gap-12 pt-8 border-t border-white/10">
                  <div className="space-y-1">
                    <p className="micro-label opacity-40">Time Dilation</p>
                    <p className="font-mono text-sm text-poster-accent">1 HR = 7 YRS</p>
                  </div>
                  <div className="space-y-1">
                    <p className="micro-label opacity-40">Accretion Disk</p>
                    <p className="font-mono text-sm text-poster-accent">STABLE</p>
                  </div>
                  <div className="space-y-1">
                    <p className="micro-label opacity-40">Coordinates</p>
                    <p className="font-mono text-sm text-poster-accent">41.24.09 / 02.11.88</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Side Technical Data */}
      <AnimatePresence>
        {frameIndex === totalFrames - 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-20"
          >
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-end gap-2">
                  <div className={`h-[2px] bg-white ${i === 2 ? 'w-12' : 'w-6'}`} />
                  <span className="text-[8px] font-mono">{100 - i * 15}%</span>
                </div>
              ))}
            </div>
            <div className="writing-mode-vertical text-[10px] font-mono tracking-[1em] uppercase">
              Gravitational / Variance / Data
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Frame Progress Indicator */}
      <div className="absolute bottom-24 left-12 flex items-center gap-4 opacity-40">
        <span className="micro-label">Timeline</span>
        <div className="w-48 h-[1px] bg-white/20 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-poster-accent"
            animate={{ width: `${(frameIndex / (totalFrames - 1)) * 100}%` }}
          />
        </div>
        <span className="font-mono text-[10px]">{String(frameIndex).padStart(2, '0')} / {totalFrames - 1}</span>
      </div>

      {/* Scroll to Continue Hint */}
      <AnimatePresence>
        {frameIndex === totalFrames - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="micro-label opacity-40 tracking-[0.5em] text-[10px]">SCROLL TO CONTINUE</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-8 bg-poster-accent/50"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Page3MultiDimension = () => {
  const cards = [
    { 
      title: "JURASSIC", 
      id: "01", 
      desc: "The dawn of biological dominance.",
      image: "https://i.postimg.cc/hj634JTF/06eb6e065b528abd1782c93b211ef2b4.jpg"
    },
    { 
      title: "MAYA", 
      id: "02", 
      desc: "Celestial alignment and ritual.",
      image: "https://i.postimg.cc/5NMCcxTF/7a375afe9e227fb2896167232638af07.jpg"
    },
    { 
      title: "INDUSTRY", 
      id: "03", 
      desc: "The era of mechanical progress.",
      image: "https://i.postimg.cc/L88k79g0/4d0c46aa1a979b43964b8035a6658164.jpg"
    },
    { 
      title: "FUTURE", 
      id: "04", 
      desc: "Dimensional transcendence.",
      image: "https://i.postimg.cc/G2wycdtM/a9261c4ba6dcf3ffb7b17a39acd972d4.jpg"
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col bg-black p-20 relative overflow-hidden">
      <CornerBrackets />
      <div className="mb-20">
        <h2 className="text-[10vw] poster-title glow-hover mb-4">DIMENSIONS</h2>
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-24 bg-white/20" />
          <p className="micro-label glow-hover">Folded Civilizations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow z-10">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative border border-white/10 p-8 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer overflow-hidden"
          >
            {card.image && (
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            )}
            <span className="font-display text-[60px] font-bold opacity-10 group-hover:opacity-100 group-hover:text-poster-accent transition-all z-10">
              {card.id}
            </span>
            <div className="z-10">
              <h3 className="text-4xl font-display uppercase mb-4 glow-hover">{card.title}</h3>
              <p className="micro-label opacity-40 group-hover:opacity-100 transition-opacity">{card.desc}</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-poster-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-10" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Page4WorldEntry = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black relative overflow-hidden">
      <CornerBrackets />
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[url('https://i.postimg.cc/qMTgg1kz/aizhen161-two-astronauts-a2f0fd6d-ad7c-4e79-8b46-bdae8319629d-(1).png')] bg-cover bg-center grayscale" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-20 max-w-7xl px-10">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border border-poster-accent flex items-center justify-center">
              <div className="w-2 h-2 bg-poster-accent rounded-full" />
            </div>
            <span className="micro-label text-poster-accent glow-hover">Core Analysis</span>
          </div>
          <h2 className="text-[12vw] poster-title glow-hover">EVOLUTION</h2>
          <p className="text-sm tracking-[0.2em] uppercase opacity-40 leading-loose glow-hover">
            From the primitive tools of the past to the intelligent machines of tomorrow.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-full aspect-square border border-white/10 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[80%] border border-white/5 rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Box className="w-32 h-32 text-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page5RealCar = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-black relative overflow-hidden">
      <CornerBrackets />
      <div className="flex-grow flex items-center justify-center p-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl">
          <div className="col-span-2 relative aspect-video border border-white/10 overflow-hidden group">
            <img 
              src="https://i.postimg.cc/L5RX6Dpv/b14570979542819f1b88de18df83d19b.jpg" 
              alt="Future Mobility" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-2">
              <span className="micro-label text-poster-accent glow-hover">Product Focus</span>
              <h2 className="text-7xl font-display uppercase glow-hover">Future Humans</h2>
            </div>
            <p className="text-xs tracking-[0.2em] uppercase opacity-40 leading-relaxed glow-hover">
              The manifestation of future intelligence.
            </p>
            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="micro-label glow-hover">AI Integration</span>
                <span className="font-mono text-[10px]">99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EndPageOverlay = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[201] flex flex-col items-center justify-center text-white bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: 'url("https://i.postimg.cc/SKHBHng5/jimeng-2026-03-27-1429-gai-cheng-heng44ban-zhong-jian-liu-chu-kong-jian-tu-pian1.jpg")' }}
    >
      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Mouse Glow */}
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none z-[1] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: mousePos.x - 400,
          y: mousePos.y - 400,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 300, mass: 0.5 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="text-[12vw] poster-title glow-hover mb-12"
        >
          THANKS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 2.5, ease: "easeOut" }}
          className="text-lg md:text-2xl font-sans tracking-widest text-white/70 glow-hover"
        >
          特别鸣谢指导老师 — 颜宇骁（VIK）
        </motion.p>
      </div>
    </motion.div>
  );
};

const Page6FutureCivilization = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [showEndText, setShowEndText] = useState(false);

  const handleTitleClick = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setShowEndText(true);
    }, 1200); // Wait for eyelids to close
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <CornerBrackets />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[url('https://i.postimg.cc/xjhfYZh7/a62120044315970ca7decb8633dabd4384764b321234a-9BYNpb-fw658webp.webp')] bg-cover bg-center grayscale" />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="z-10 text-center space-y-12 max-w-5xl px-10">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[14vw] poster-title glow-hover cursor-pointer hover:text-white/80 transition-colors"
            onClick={handleTitleClick}
            title="Click to close eyes"
          >
            THE FUTURE
          </motion.h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-20 bg-white/20" />
            <p className="micro-label glow-hover">XPENG GEP DESIGN</p>
            <div className="h-[1px] w-20 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Eye Closing Overlay */}
      <AnimatePresence>
        {isClosing && (
          <div className="fixed inset-0 z-[200] pointer-events-none flex flex-col justify-between">
            {/* Top Eyelid */}
            <motion.div 
              initial={{ height: "0%", borderBottomLeftRadius: "50% 20%", borderBottomRightRadius: "50% 20%" }}
              animate={{ height: "51%", borderBottomLeftRadius: "0%", borderBottomRightRadius: "0%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-black origin-top"
            />
            {/* Bottom Eyelid */}
            <motion.div 
              initial={{ height: "0%", borderTopLeftRadius: "50% 20%", borderTopRightRadius: "50% 20%" }}
              animate={{ height: "51%", borderTopLeftRadius: "0%", borderTopRightRadius: "0%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-black origin-bottom"
            />
          </div>
        )}
      </AnimatePresence>

      {/* The End Text */}
      <AnimatePresence>
        {showEndText && <EndPageOverlay />}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isRippling, setIsRippling] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const totalFrames = FRAME_URLS.length;

  // Handle first interaction for audio autoplay
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {
          // Suppress autoplay console error as it's expected behavior
        });
      }
      // Remove listeners after first interaction attempt
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('wheel', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
    };
  }, [isPlaying]);

  // Sync audio state with isPlaying
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // This might fail if no user interaction yet, handled by handleFirstInteraction
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  // Preload all images
  useEffect(() => {
    const allImages = [...FRAME_URLS, ...OTHER_IMAGES];
    let loaded = 0;

    if (allImages.length === 0) {
      setLoadingProgress(100);
      return;
    }

    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        setLoadingProgress((loaded / allImages.length) * 100);
      };
    });
  }, []);

  const stateRef = useRef({ currentPage, isScrolling, currentFrame });
  const scrollAccumulator = useRef(0);
  
  useEffect(() => {
    stateRef.current = { currentPage, isScrolling, currentFrame };
  }, [currentPage, isScrolling, currentFrame]);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const { currentPage, isScrolling, currentFrame } = stateRef.current;
      if (isScrolling) return;

      let nextFrame = currentFrame;

      // Page 2 (index 1) has special scroll behavior for frames
      if (currentPage === 1) {
        const sensitivity = 40; // Adjust sensitivity for smoother scroll
        const endBuffer = 200; // Buffer at the end of sequence
        const startBuffer = -200; // Buffer at the beginning of sequence
        
        scrollAccumulator.current += e.deltaY;
        
        nextFrame = Math.floor(scrollAccumulator.current / sensitivity);

        // Clamp nextFrame and accumulator
        if (nextFrame < 0) {
          nextFrame = 0;
          if (scrollAccumulator.current < startBuffer) {
            scrollAccumulator.current = startBuffer;
          }
        } else if (nextFrame >= totalFrames - 1) {
          nextFrame = totalFrames - 1;
          if (scrollAccumulator.current > (totalFrames - 1) * sensitivity + endBuffer) {
            scrollAccumulator.current = (totalFrames - 1) * sensitivity + endBuffer;
          }
        }

        if (nextFrame !== currentFrame) {
          setCurrentFrame(nextFrame);
          stateRef.current.currentFrame = nextFrame;
        }
        
        // Stay on page 2 if we are still within the sequence bounds or buffer
        if (e.deltaY > 0 && scrollAccumulator.current < (totalFrames - 1) * sensitivity + endBuffer) return;
        if (e.deltaY < 0 && scrollAccumulator.current > startBuffer) return;
      }

      // Normal page transitions
      const scrollThreshold = (currentPage === 1 && nextFrame === totalFrames - 1) ? 40 : 50;
      const backScrollThreshold = (currentPage === 1 && nextFrame === 0) ? -40 : -50;
      
      if (e.deltaY > scrollThreshold && currentPage < 5) {
        const next = currentPage + 1;
        setIsScrolling(true);
        stateRef.current.isScrolling = true;
        
        // Trigger glitch if moving between 0 and 1 (Page 1 and 2) or 1 and 2 (Page 2 and 3)
        if ((currentPage === 0 && next === 1) || (currentPage === 1 && next === 0) || (currentPage === 1 && next === 2) || (currentPage === 2 && next === 1)) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 500);
        }

        // Trigger ripple if moving between 2 and 3 (Page 3 and 4)
        if ((currentPage === 2 && next === 3) || (currentPage === 3 && next === 2)) {
          setIsRippling(true);
          setTimeout(() => setIsRippling(false), 800);
        }

        setCurrentPage(next);
        if (next === 1) {
          scrollAccumulator.current = 50; // Set slightly into the sequence to avoid immediate jump back
          setCurrentFrame(0);
          stateRef.current.currentFrame = 0;
        }
        setTimeout(() => {
          setIsScrolling(false);
          stateRef.current.isScrolling = false;
        }, 800);
      } else if (e.deltaY < backScrollThreshold && currentPage > 0) {
        const prev = currentPage - 1;
        setIsScrolling(true);
        stateRef.current.isScrolling = true;

        // Trigger glitch if moving between 0 and 1 (Page 1 and 2) or 1 and 2 (Page 2 and 3)
        if ((currentPage === 1 && prev === 0) || (currentPage === 0 && prev === 1) || (currentPage === 2 && prev === 1) || (currentPage === 1 && prev === 2)) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 500);
        }

        // Trigger ripple if moving between 2 and 3 (Page 3 and 4)
        if ((currentPage === 3 && prev === 2) || (currentPage === 2 && prev === 3)) {
          setIsRippling(true);
          setTimeout(() => setIsRippling(false), 800);
        }

        setCurrentPage(prev);
        if (prev === 1) {
          const sensitivity = 40;
          const endBuffer = 200;
          scrollAccumulator.current = (totalFrames - 1) * sensitivity + endBuffer - 20; // Set near the end of the buffer
          setCurrentFrame(totalFrames - 1);
          stateRef.current.currentFrame = totalFrames - 1;
        }
        setTimeout(() => {
          setIsScrolling(false);
          stateRef.current.isScrolling = false;
        }, 800);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Background Music */}
      <audio 
        ref={audioRef} 
        src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/Event%20Horizon%20Caravan.mp3" 
        loop 
        preload="auto"
      />

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-8 right-32 z-[100] p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-md group cursor-pointer"
        title="Toggle Music"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-poster-accent group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-5 h-5 text-white/50 group-hover:scale-110 transition-transform" />
        )}
      </button>

      <MouseGlow />
      <NoiseOverlay />
      <TechnicalLines />
      
      <TechnicalHeader pageNum={currentPage === 0 ? 1 : currentPage} />
      <TechnicalFooter />

      <AnimatePresence>
        {isGlitching && <GlitchEffect />}
        {isRippling && <RippleEffect />}
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, idx) => {
          const i = idx + 1;
          return (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i);
                if (i === 1) {
                  scrollAccumulator.current = 0;
                  setCurrentFrame(0);
                  stateRef.current.currentFrame = 0;
                }
              }}
              className={`group flex items-center gap-4 transition-all duration-500`}
            >
              <span className={`micro-label transition-opacity duration-500 ${currentPage === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
                0{i}
              </span>
              <div className={`w-1 transition-all duration-500 ${
                currentPage === i ? 'bg-poster-accent h-12' : 'bg-white/10 h-4 group-hover:bg-white/30'
              }`} />
            </button>
          );
        })}
      </div>

      {/* Page Content */}
      <AnimatePresence>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {currentPage === 0 && <Page1Terminal progress={loadingProgress} onNext={() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 500);
            setCurrentPage(1);
            scrollAccumulator.current = 0;
            setCurrentFrame(0);
            stateRef.current.currentFrame = 0;
          }} />}
          {currentPage === 1 && <Page2BlackHole frameIndex={currentFrame} />}
          {currentPage === 2 && <Page3MultiDimension />}
          {currentPage === 3 && <Page4WorldEntry />}
          {currentPage === 4 && <Page5RealCar />}
          {currentPage === 5 && <Page6FutureCivilization />}
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar (Bottom) */}
      <div className="fixed bottom-0 left-0 w-full h-1 z-[101] bg-white/5">
        <motion.div 
          className="h-full bg-poster-accent"
          initial={{ width: "0%" }}
          animate={{ width: `${currentPage === 0 ? 0 : (currentPage / 5) * 100}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
}
