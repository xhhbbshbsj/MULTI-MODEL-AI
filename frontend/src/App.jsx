import React, { useState } from 'react';
import axios from 'axios';
import { Send, Cpu, Image as ImageIcon, Terminal, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

function App() {
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => "session_" + Date.now());
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([{ role: "system", content: "Engine v4.0 Active. Awaiting text or visual input." }]);

  // --- NEW: Handle Image Selection ---
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setLogs(prev => [...prev, { role: "system", content: `Visual data loaded: ${file.name}` }]);
    }
  };

  // --- NEW: The Core Logic Router ---
  const handleRun = async () => {
    if (!input && !selectedImage) return;

    setIsLoading(true);
    const userMessage = input || "Processing visual data...";
    setLogs(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    try {
      const formData = new FormData();
      if (input) formData.append('prompt', input);
      if (selectedImage) formData.append('file', selectedImage);
      formData.append('mode', 'advanced');

      // 🔥 The crucial Session ID for memory!
      formData.append('sessionId', sessionId);

      // 🔥 Switched to the LIVE Render Cloud server
      const response = await axios.post('https://multi-model-ai-uiw4.onrender.com/api/v1/engine/process', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Handle the JSON response from the Memory Controller
      const results = response.data.results;
      if (results && results.length > 0) {
        results.forEach(res => {
          setLogs(prev => [...prev, { role: "engine", content: res.data.text }]);
        });
      } else {
        setLogs(prev => [...prev, { role: "system", content: "Engine processed request, but returned no readable data." }]);
      }

    } catch (error) {
      console.error("Engine failure:", error);
      setLogs(prev => [...prev, { role: "error", content: "Connection to Core failed. Is the Node.js server running?" }]);
    } finally {
      setIsLoading(false);
      setSelectedImage(null);
    }
  };

  return (
    <ParallaxProvider>
      <div className="bg-[#0f172a] min-h-screen text-slate-300 p-4 md:p-10 font-sans relative overflow-hidden">

        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-[0.02]">
          <Parallax speed={-15}>
            <Cpu size={800} className="text-indigo-500 rotate-12" />
          </Parallax>
        </div>

        <div className="max-w-5xl mx-auto space-y-6 relative z-10">

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="border-b border-slate-800 pb-6 flex justify-between items-end"
          >
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                <Cpu className="text-indigo-500" /> CORE <span className="text-indigo-500">ENGINE</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1">Autonomous Multi-Modal Problem Solver</p>
            </div>
          </motion.header>

          {/* Engine Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1e293b] rounded-xl border border-slate-700 shadow-[0_0_40px_-10px_rgba(99,102,241,0.15)] overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-slate-800/80 p-3 border-b border-slate-700 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
              </div>
              {isLoading && <span className="text-xs text-indigo-400 animate-pulse">Processing...</span>}
            </div>

            {/* Log Output */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 font-mono text-sm text-left">
              {logs.map((log, i) => (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className="flex gap-3">
                  <span className={`shrink-0 ${log.role === 'system' ? 'text-emerald-500' :
                    log.role === 'error' ? 'text-red-500' :
                      log.role === 'engine' ? 'text-indigo-400' : 'text-slate-500'
                    }`}>
                    [{log.role.toUpperCase()}]
                  </span>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{log.content}</p>
                </motion.div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-slate-900/50 border-t border-slate-700 flex gap-3 items-center">

              {/* Image & Document Upload Button */}
              <label className={`cursor-pointer transition-colors ${selectedImage ? 'text-emerald-400' : 'text-slate-400 hover:text-indigo-400'}`}>
                <ImageIcon size={22} />
                <input
                  type="file"
                  className="hidden"
                  // 🔥 NEW: Unlock to allow text, csv, and code files!
                  accept="image/*, text/*, .js, .json, .csv"
                  onChange={handleImageSelect}
                  disabled={isLoading}
                />
              </label>

              <input
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-600 text-lg"
                placeholder={selectedImage ? "Add context to your image..." : "Describe a real-life problem..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRun()}
                disabled={isLoading}
              />

              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handleRun}
                disabled={isLoading || (!input && !selectedImage)}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white px-5 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> RUN</>}
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </ParallaxProvider>
  );
}

export default App;