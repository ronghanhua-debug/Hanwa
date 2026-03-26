/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Box, Cpu, Globe, Zap, Monitor, Sparkles, ChevronDown, Info, Plus } from 'lucide-react';

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

const RecMarker = () => (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] flex items-center gap-2 pointer-events-none opacity-40">
    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
    <span className="micro-label">REC</span>
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
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, transparent 70%)',
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
    transition={{ duration: 0.6, times: [0, 0.1, 0.3, 0.5, 1] }}
    className="fixed inset-0 z-[200] pointer-events-none bg-black/20 backdrop-blur-[2px]"
  >
    {/* Horizontal Glitch Bars */}
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-full bg-poster-accent/40 mix-blend-screen"
        initial={{ top: `${Math.random() * 100}%`, height: `${Math.random() * 40}px`, x: "-100%" }}
        animate={{ 
          x: ["-100%", "100%"],
          opacity: [0, 0.8, 0]
        }}
        transition={{ 
          duration: 0.15, 
          delay: Math.random() * 0.4,
          repeat: 2,
          repeatType: "reverse"
        }}
      />
    ))}
    {/* RGB Split Overlay */}
    <motion.div 
      className="absolute inset-0 bg-red-500/10 mix-blend-screen"
      animate={{ x: [-5, 5, -3, 3, 0], y: [2, -2, 1, -1, 0] }}
      transition={{ duration: 0.1, repeat: 5 }}
    />
    <motion.div 
      className="absolute inset-0 bg-blue-500/10 mix-blend-screen"
      animate={{ x: [5, -5, 3, -3, 0], y: [-2, 2, -1, 1, 0] }}
      transition={{ duration: 0.1, repeat: 5 }}
    />
    {/* Static Noise */}
    <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/noise/400/400')] bg-repeat" />
  </motion.div>
);

// --- Pages ---

const Page1Terminal = ({ onNext }: { onNext: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  
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
      }
    }, 250);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onNext, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onNext]);

  return (
    <div className="h-screen w-screen flex flex-col bg-black p-12 relative overflow-hidden terminal-text">
      <div className="absolute inset-0 noise-overlay opacity-20" />
      <div className="absolute inset-0 technical-lines opacity-30" />
      
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

const Page2BlackHole = ({ frameIndex }: { frameIndex: number }) => {
  const frameUrls = [
    "https://i.postimg.cc/T2NnDqWM/wei-biao-ti-10000.png",
    "https://i.postimg.cc/CMrbqHfp/wei-biao-ti-10001.png",
    "https://i.postimg.cc/WpY0k6JP/wei-biao-ti-10002.png",
    "https://i.postimg.cc/RCpwHQnB/wei-biao-ti-10003.png",
    "https://i.postimg.cc/bYV1tH2N/wei-biao-ti-10004.png",
    "https://i.postimg.cc/MZ31QbjG/wei-biao-ti-10005.png",
    "https://i.postimg.cc/pVcKFYny/wei-biao-ti-10006.png",
    "https://i.postimg.cc/kMYWbFt4/wei-biao-ti-10007.png",
    "https://i.postimg.cc/NGCRH7ry/wei-biao-ti-10008.png",
    "https://i.postimg.cc/3rf2vCDD/wei-biao-ti-10009.png",
    "https://i.postimg.cc/VLSnBrjf/wei-biao-ti-10010.png",
    "https://i.postimg.cc/KcptMrg3/wei-biao-ti-10011.png",
    "https://i.postimg.cc/9F4ZtRG0/wei-biao-ti-10012.png",
    "https://i.postimg.cc/J4yZcDbt/wei-biao-ti-10013.png",
    "https://i.postimg.cc/rFdxC0Sm/wei-biao-ti-10014.png",
    "https://i.postimg.cc/SNXC72WJ/wei-biao-ti-10015.png",
    "https://i.postimg.cc/ncsBYjvm/wei-biao-ti-10016.png",
    "https://i.postimg.cc/5NHLqYwB/wei-biao-ti-10017.png",
    "https://i.postimg.cc/8PFMBJhm/wei-biao-ti-10018.png",
    "https://i.postimg.cc/KvKBrknf/wei-biao-ti-10019.png",
    "https://i.postimg.cc/L6rfy9TB/wei-biao-ti-10020.png",
    "https://i.postimg.cc/WbQr9Nnw/wei-biao-ti-10021.png",
    "https://i.postimg.cc/wTSJWqV2/wei-biao-ti-10022.png",
    "https://i.postimg.cc/VL3M7fRR/wei-biao-ti-10023.png",
    "https://i.postimg.cc/kXk8jJcY/wei-biao-ti-10024.png",
    "https://i.postimg.cc/sDtSnjc0/wei-biao-ti-10025.png",
    "https://i.postimg.cc/Hsf5SY2F/wei-biao-ti-10026.png",
    "https://i.postimg.cc/9FvTxmpK/wei-biao-ti-10027.png",
    "https://i.postimg.cc/TYZmkd9z/wei-biao-ti-10028.png",
    "https://i.postimg.cc/65DRHWcJ/wei-biao-ti-10029.png",
    "https://i.postimg.cc/X7TF2jLb/wei-biao-ti-10030.png",
    "https://i.postimg.cc/Hsf5SYzH/wei-biao-ti-10031.png",
    "https://i.postimg.cc/rFvWhVj8/wei-biao-ti-10032.png",
    "https://i.postimg.cc/KvdL9GfG/wei-biao-ti-10033.png",
    "https://i.postimg.cc/4xVcqD2k/wei-biao-ti-10034.png",
    "https://i.postimg.cc/VkntpxGx/wei-biao-ti-10035.png",
    "https://i.postimg.cc/cLw32pkx/wei-biao-ti-10036.png",
    "https://i.postimg.cc/Z5pN2GsT/wei-biao-ti-10037.png",
    "https://i.postimg.cc/3xmGVsfr/wei-biao-ti-10038.png",
    "https://i.postimg.cc/FH3S8MCs/wei-biao-ti-10039.png",
    "https://i.postimg.cc/Qd17w2YH/wei-biao-ti-10040.png",
    "https://i.postimg.cc/rwx43BZd/wei-biao-ti-10041.png",
    "https://i.postimg.cc/T3gbFzN5/wei-biao-ti-10042.png",
    "https://i.postimg.cc/FH3S8MC3/wei-biao-ti-10043.png",
    "https://i.postimg.cc/8CGvSZxs/wei-biao-ti-10044.png",
    "https://i.postimg.cc/JzZXvfYb/wei-biao-ti-10045.png",
    "https://i.postimg.cc/q7rKT1Wz/wei-biao-ti-10046.png",
    "https://i.postimg.cc/xdQm26Bk/wei-biao-ti-10047.png",
    "https://i.postimg.cc/VNwt8K20/wei-biao-ti-10048.png",
    "https://i.postimg.cc/43GcgWjc/wei-biao-ti-10049.png",
    "https://i.postimg.cc/PqHDjS08/wei-biao-ti-10050.png",
    "https://i.postimg.cc/YS7FHdT6/wei-biao-ti-10051.png",
    "https://i.postimg.cc/43GcgWjv/wei-biao-ti-10052.png",
    "https://i.postimg.cc/yNKRHL2y/wei-biao-ti-10053.png",
    "https://i.postimg.cc/7L4zkKjM/wei-biao-ti-10054.png",
    "https://i.postimg.cc/GpRDCX6X/wei-biao-ti-10055.png",
    "https://i.postimg.cc/xdQm26Bs/wei-biao-ti-10056.png",
    "https://i.postimg.cc/TPxb6tBs/wei-biao-ti-10057.png",
    "https://i.postimg.cc/9f29hLsS/wei-biao-ti-10058.png",
    "https://i.postimg.cc/HLtysQC3/wei-biao-ti-10059.png",
    "https://i.postimg.cc/KY5Mvnyp/wei-biao-ti-10060.png",
    "https://i.postimg.cc/hG0dP9qN/wei-biao-ti-10061.png",
    "https://i.postimg.cc/0NCw2pqF/wei-biao-ti-10062.png",
    "https://i.postimg.cc/LsV16zMc/wei-biao-ti-10063.png",
    "https://i.postimg.cc/rp9rFSk2/wei-biao-ti-10064.png",
    "https://i.postimg.cc/s2JhDpry/wei-biao-ti-10065.png",
    "https://i.postimg.cc/bvRtNQhp/wei-biao-ti-10066.png",
    "https://i.postimg.cc/cJcn4QS1/wei-biao-ti-10067.png",
    "https://i.postimg.cc/g0KZkvW2/wei-biao-ti-10068.png",
    "https://i.postimg.cc/8Cb6PhS5/wei-biao-ti-10069.png",
    "https://i.postimg.cc/k4XtVBJd/wei-biao-ti-10070.png",
    "https://i.postimg.cc/k4XtVBJm/wei-biao-ti-10071.png",
    "https://i.postimg.cc/hjP7JfDn/wei-biao-ti-10072.png"
  ];
  const totalFrames = frameUrls.length;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Sequence - Controlled by Scroll */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative">
          <img 
            src={frameUrls[frameIndex] || frameUrls[0]} 
            alt={`Cosmos Frame ${frameIndex}`} 
            className="w-full h-full object-cover grayscale-[0.2] brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
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
          src="https://i.postimg.cc/KvnqrH79/宇航员_1.png" 
          alt="Astronaut" 
          className="w-64 md:w-80 lg:w-96 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <CornerBrackets />
      <RecMarker />
      
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
    </div>
  );
};

const Page3MultiDimension = () => {
  const cards = [
    { title: "JURASSIC", id: "01", desc: "The dawn of biological dominance." },
    { title: "MAYA", id: "02", desc: "Celestial alignment and ritual." },
    { title: "INDUSTRY", id: "03", desc: "The era of mechanical progress." },
    { title: "FUTURE", id: "04", desc: "Dimensional transcendence." },
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
            className="group relative border border-white/10 p-8 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="font-display text-[60px] font-bold opacity-10 group-hover:opacity-100 group-hover:text-poster-accent transition-all">
              {card.id}
            </span>
            <div>
              <h3 className="text-4xl font-display uppercase mb-4 glow-hover">{card.title}</h3>
              <p className="micro-label opacity-40 group-hover:opacity-100 transition-opacity">{card.desc}</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-poster-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
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
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/space/1920/1080')] bg-cover bg-center grayscale" />
        <div className="absolute inset-0 bg-black/60" />
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
              src="https://picsum.photos/seed/car-future/1200/675" 
              alt="Future Mobility" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-2">
              <span className="micro-label text-poster-accent glow-hover">Product Focus</span>
              <h2 className="text-7xl font-display uppercase glow-hover">XPENG P7+</h2>
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

const Page6FutureCivilization = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <CornerBrackets />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
      
      <div className="z-10 text-center space-y-12 max-w-5xl px-10">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[14vw] poster-title glow-hover"
          >
            THE FUTURE
          </motion.h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-20 bg-white/20" />
            <p className="micro-label glow-hover">Civilization Type I</p>
            <div className="h-[1px] w-20 bg-white/20" />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "white", color: "black" }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-20 py-5 border border-white font-mono text-xs font-bold tracking-[0.8em] uppercase transition-all duration-300"
        >
          Explore More
        </motion.button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const totalFrames = 73;

  // Preload images for Page 2
  useEffect(() => {
    const frameUrls = [
      "https://i.postimg.cc/T2NnDqWM/wei-biao-ti-10000.png",
      "https://i.postimg.cc/CMrbqHfp/wei-biao-ti-10001.png",
      "https://i.postimg.cc/WpY0k6JP/wei-biao-ti-10002.png",
      "https://i.postimg.cc/RCpwHQnB/wei-biao-ti-10003.png",
      "https://i.postimg.cc/bYV1tH2N/wei-biao-ti-10004.png",
      "https://i.postimg.cc/MZ31QbjG/wei-biao-ti-10005.png",
      "https://i.postimg.cc/pVcKFYny/wei-biao-ti-10006.png",
      "https://i.postimg.cc/kMYWbFt4/wei-biao-ti-10007.png",
      "https://i.postimg.cc/NGCRH7ry/wei-biao-ti-10008.png",
      "https://i.postimg.cc/3rf2vCDD/wei-biao-ti-10009.png",
      "https://i.postimg.cc/VLSnBrjf/wei-biao-ti-10010.png",
      "https://i.postimg.cc/KcptMrg3/wei-biao-ti-10011.png",
      "https://i.postimg.cc/9F4ZtRG0/wei-biao-ti-10012.png",
      "https://i.postimg.cc/J4yZcDbt/wei-biao-ti-10013.png",
      "https://i.postimg.cc/rFdxC0Sm/wei-biao-ti-10014.png",
      "https://i.postimg.cc/SNXC72WJ/wei-biao-ti-10015.png",
      "https://i.postimg.cc/ncsBYjvm/wei-biao-ti-10016.png",
      "https://i.postimg.cc/5NHLqYwB/wei-biao-ti-10017.png",
      "https://i.postimg.cc/8PFMBJhm/wei-biao-ti-10018.png",
      "https://i.postimg.cc/vH00gK6k/wei-biao-ti-10019.png",
      "https://i.postimg.cc/0jWvWp64/wei-biao-ti-10020.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10021.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10022.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10023.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10024.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10025.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10026.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10027.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10028.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10029.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10030.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10031.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10032.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10033.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10034.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10035.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10036.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10037.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10038.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10039.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10040.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10041.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10042.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10043.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10044.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10045.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10046.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10047.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10048.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10049.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10050.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10051.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10052.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10053.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10054.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10055.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10056.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10057.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10058.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10059.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10060.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10061.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10062.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10063.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10064.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10065.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10066.png",
      "https://i.postimg.cc/0jTfXfXf/wei-biao-ti-10067.png",
      "https://i.postimg.cc/g0KZkvW2/wei-biao-ti-10068.png",
      "https://i.postimg.cc/8Cb6PhS5/wei-biao-ti-10069.png",
      "https://i.postimg.cc/k4XtVBJd/wei-biao-ti-10070.png",
      "https://i.postimg.cc/k4XtVBJm/wei-biao-ti-10071.png",
      "https://i.postimg.cc/hjP7JfDn/wei-biao-ti-10072.png"
    ];
    frameUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const handleScroll = (e: WheelEvent) => {
    if (isScrolling) return;

    // Page 2 (index 1) has special scroll behavior for frames
    if (currentPage === 1) {
      // Increased sensitivity: map deltaY to frame changes
      // Standard wheel delta is ~100. We want that to be around 2-3 frames for "speed"
      const sensitivity = 40; 
      const frameChange = Math.round(e.deltaY / sensitivity);

      if (frameChange !== 0) {
        setCurrentFrame(prev => {
          const next = prev + frameChange;
          return Math.max(0, Math.min(totalFrames - 1, next));
        });
        
        // Stay on page 2 if we are still within the sequence bounds
        if (e.deltaY > 0 && currentFrame < totalFrames - 1) return;
        if (e.deltaY < 0 && currentFrame > 0) return;
      } else if (Math.abs(e.deltaY) > 0) {
        // For very small deltas (trackpads), ensure at least 1 frame change if significant
        const smallStep = e.deltaY > 0 ? 1 : -1;
        setCurrentFrame(prev => Math.max(0, Math.min(totalFrames - 1, prev + smallStep)));
        if (e.deltaY > 0 && currentFrame < totalFrames - 1) return;
        if (e.deltaY < 0 && currentFrame > 0) return;
      }
    }

    // Normal page transitions
    if (e.deltaY > 50 && currentPage < 5) {
      const next = currentPage + 1;
      setIsScrolling(true);
      
      // Trigger glitch if moving between 1 and 2 (Page 2 and 3)
      if ((currentPage === 1 && next === 2) || (currentPage === 2 && next === 1)) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 800);
      }

      setCurrentPage(next);
      setTimeout(() => setIsScrolling(false), 1200);
    } else if (e.deltaY < -50 && currentPage > 0) {
      const prev = currentPage - 1;
      setIsScrolling(true);

      // Trigger glitch if moving between 1 and 2 (Page 2 and 3)
      if ((currentPage === 2 && prev === 1) || (currentPage === 1 && prev === 2)) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 800);
      }

      setCurrentPage(prev);
      setTimeout(() => setIsScrolling(false), 1200);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentPage, isScrolling]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <MouseGlow />
      <NoiseOverlay />
      <TechnicalLines />
      <GridPattern />
      <RecMarker />
      
      <TechnicalHeader pageNum={currentPage + 1} />
      <TechnicalFooter />

      <AnimatePresence>
        {isGlitching && <GlitchEffect />}
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`group flex items-center gap-4 transition-all duration-500`}
          >
            <span className={`micro-label transition-opacity duration-500 ${currentPage === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
              0{i + 1}
            </span>
            <div className={`w-1 transition-all duration-500 ${
              currentPage === i ? 'bg-poster-accent h-12' : 'bg-white/10 h-4 group-hover:bg-white/30'
            }`} />
          </button>
        ))}
      </div>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          {currentPage === 0 && <Page1Terminal onNext={() => setCurrentPage(1)} />}
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
          animate={{ width: `${((currentPage + 1) / 6) * 100}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
}
