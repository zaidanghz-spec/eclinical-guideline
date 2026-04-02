import { motion } from "motion/react";
import { ArrowRight, Play, Activity } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 py-20 md:py-32">
      {/* Subtle Animated Background Gradient - Slow 12s */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(120deg, rgba(20, 184, 166, 0.9) 0%, rgba(6, 182, 212, 0.9) 100%)',
            'linear-gradient(240deg, rgba(6, 182, 212, 0.9) 0%, rgba(20, 184, 166, 0.9) 100%)',
            'linear-gradient(120deg, rgba(20, 184, 166, 0.9) 0%, rgba(6, 182, 212, 0.9) 100%)',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge with gentle entrance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.span 
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm mb-6 border border-white/20"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                transition={{ duration: 0.3 }}
              >
                <Activity className="size-4" />
                Evidence-Based Clinical Decision Support
              </motion.span>
            </motion.div>

            {/* Title - Soft slide-up + fade-in */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="text-white text-5xl md:text-6xl mb-6 leading-tight"
            >
              Enterprise Clinical
              <br />
              <span className="text-cyan-100">Pathway System</span>
            </motion.h1>

            {/* Subtitle - Fade in with delay */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="text-teal-50 text-xl mb-8 leading-relaxed max-w-xl"
            >
              Streamline patient care with evidence-based protocols. Reduce variability, improve outcomes, and ensure compliance with international guidelines.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 group shadow-lg hover:shadow-xl transition-all duration-300">
                  Access Pathways
                  <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  <Play className="mr-2 size-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats - Staggered animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
            >
              {[
                { value: "10+", label: "Clinical Pathways" },
                { value: "ESC/WHO", label: "Guideline Based" },
                { value: "30+", label: "Disease Protocols" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="text-white text-3xl mb-1">{stat.value}</div>
                  <div className="text-teal-100 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Logo scales from 95% to 100% */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative hidden md:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Subtle pulsing circles - calm medical feel */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.15, 0.08, 0.15],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-white rounded-full blur-2xl"
              />

              {/* Central medical icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative bg-white rounded-3xl p-16 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Activity className="size-32 text-teal-600" strokeWidth={1.5} />
                  
                  {/* Subtle rotating border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'linear-gradient(45deg, rgba(20, 184, 166, 0.3), rgba(6, 182, 212, 0.3))',
                      filter: 'blur(8px)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
