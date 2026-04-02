import { motion } from "motion/react";
import {
  ClipboardList,
  UserCheck,
  TrendingUp,
  Shield,
  Clock,
  BarChart3,
} from "lucide-react";
import { InteractiveCard } from "./ui/interactive-card";

const features = [
  {
    icon: ClipboardList,
    title: "Evidence-Based Protocols",
    description: "Standardized clinical pathways backed by ESC, WHO, and IDAI guidelines for consistent care delivery.",
    tooltip: "Reduce clinical variability by 60% and improve adherence to best practices",
    iconColor: "text-teal-600",
    iconBgColor: "bg-teal-100",
  },
  {
    icon: UserCheck,
    title: "Patient-Centered Care",
    description: "Personalized treatment plans that adapt to individual patient needs and clinical presentations.",
    tooltip: "Increase patient satisfaction scores and improve shared decision-making",
    iconColor: "text-cyan-600",
    iconBgColor: "bg-cyan-100",
  },
  {
    icon: TrendingUp,
    title: "Improved Outcomes",
    description: "Track and optimize patient recovery with real-time monitoring and outcome analytics.",
    tooltip: "Demonstrated 40% reduction in length of stay across major clinical pathways",
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Ensure compliance with healthcare standards and reduce preventable medical errors.",
    tooltip: "Built-in safety checks at every critical decision point in the pathway",
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
  },
  {
    icon: Clock,
    title: "Reduced Length of Stay",
    description: "Streamline care delivery to minimize hospital stays while maintaining quality outcomes.",
    tooltip: "Optimize resource utilization and reduce healthcare costs by up to 30%",
    iconColor: "text-emerald-600",
    iconBgColor: "bg-emerald-100",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description: "Leverage analytics to identify trends and continuously improve care pathways.",
    tooltip: "Real-time dashboards for clinical performance monitoring and benchmarking",
    iconColor: "text-indigo-600",
    iconBgColor: "bg-indigo-100",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm mb-4 border border-teal-200"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            Clinical Decision Support Features
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl text-gray-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Enterprise-Grade Clinical Solutions
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            Trusted by healthcare institutions to deliver consistent, high-quality patient care through evidence-based pathways
          </motion.p>
        </motion.div>

        {/* Interactive Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <InteractiveCard
              key={index}
              icon={feature.icon}
              iconColor={feature.iconColor}
              iconBgColor={feature.iconBgColor}
              title={feature.title}
              description={feature.description}
              tooltip={feature.tooltip}
              delay={index * 0.08}
            />
          ))}
        </div>

        {/* Trust Indicators - Sequential fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <motion.p 
            className="text-center text-sm text-gray-500 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            Based on international clinical guidelines
          </motion.p>
          
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { name: "ESC Guidelines", delay: 0.8 },
              { name: "WHO Protocols", delay: 0.9 },
              { name: "IDAI Standards", delay: 1.0 },
              { name: "ACC/AHA", delay: 1.1 },
            ].map((guideline, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: guideline.delay, ease: [0.4, 0, 0.2, 1] }}
                className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-300"
              >
                {guideline.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
