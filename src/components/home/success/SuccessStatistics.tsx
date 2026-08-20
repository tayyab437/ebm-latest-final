import React from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Clock, 
  Award, 
  BrainCircuit, 
  CheckCircle, 
  HeartHandshake, 
  HelpCircle 
} from "lucide-react";
import { STATISTICS_DATA } from "./success.data";
import { StatisticsCounter } from "./StatisticsCounter";
import { containerVariants, itemVariants } from "./animations";

const getIcon = (name: string, className = "h-5 w-5") => {
  switch (name) {
    case "Users":
      return <Users className={className} />;
    case "Clock":
      return <Clock className={className} />;
    case "Award":
      return <Award className={className} />;
    case "BrainCircuit":
      return <BrainCircuit className={className} />;
    case "CheckCircle":
      return <CheckCircle className={className} />;
    case "HeartHandshake":
      return <HeartHandshake className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};

export const SuccessStatistics: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Measurable Academic Outcomes
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          We track every active student connection, diagnostic evaluation, and curriculum progress indicator to optimize accelerated scholastic growth.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {STATISTICS_DATA.map((stat) => (
          <motion.div key={stat.id} variants={itemVariants}>
            <StatisticsCounter
              valueString={stat.value}
              label={stat.label}
              description={stat.description}
              icon={getIcon(stat.iconName)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
