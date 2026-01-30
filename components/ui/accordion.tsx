"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { clsx } from "clsx";

interface AccordionProps {
  question: string;
  answer: string;
}

export default function Accordion({ question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className={clsx(
        "glass-card p-0 overflow-hidden cursor-pointer transition-all duration-300 group",
        isOpen ? "border-neon-cyan/50 bg-obsidian-800/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]" : "hover:bg-white/5"
      )}
    >
      {/* Header (Always Visible) */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={clsx(
            "p-2 rounded-lg transition-colors",
            isOpen ? "bg-neon-cyan/20 text-neon-cyan" : "bg-white/5 text-gray-400 group-hover:text-white"
          )}>
            <HelpCircle size={20} />
          </div>
          <h3 className={clsx(
            "font-bold text-lg transition-colors",
            isOpen ? "text-white" : "text-gray-300 group-hover:text-white"
          )}>
            {question}
          </h3>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={clsx(isOpen ? "text-neon-cyan" : "text-gray-500")}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      {/* Body (Collapsible) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-0 pl-[4.5rem]">
              <p className="text-gray-400 leading-relaxed border-l-2 border-white/10 pl-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}