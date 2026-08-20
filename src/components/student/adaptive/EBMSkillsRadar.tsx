import React from "react";
import { useAdaptiveStore } from "./adaptive.store";
import { 
  Zap, 
  Brain, 
  Sparkles, 
  Activity, 
  ArrowRight,
  Star,
  Users,
  Shield,
  Lightbulb,
  Target
} from "lucide-react";
import clsx from "clsx";

export function EBMSkillsRadar() {
  const { skills } = useAdaptiveStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">EBM Skills Radar</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Holistic Competency Tracking & Character Development</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
             <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Total Mastery Points: 2,850</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-10 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent opacity-50" />
           
           {/* Visual Mock of Radar Chart */}
           <div className="relative w-80 h-80 flex items-center justify-center">
              {[0, 1, 2, 3, 4].map(i => (
                <div 
                  key={i} 
                  className="absolute inset-0 border border-white/5 rounded-full" 
                  style={{ transform: `scale(${0.2 + i * 0.2})` }}
                />
              ))}
              
              {/* Radar Axes */}
              {skills.map((s, i) => (
                <div 
                  key={i} 
                  className="absolute w-px h-full bg-white/5" 
                  style={{ transform: `rotate(${i * (360 / skills.length)}deg)` }}
                />
              ))}

              {/* Data Shape Overlay Mock */}
              <svg className="absolute inset-0 w-full h-full text-indigo-500/30" viewBox="0 0 100 100">
                <polygon 
                  points="50,15 85,35 80,75 25,80 15,40" 
                  className="fill-indigo-500/20 stroke-indigo-500 stroke-[0.5]" 
                />
                {skills.map((s, i) => {
                   const angle = (i * (360 / skills.length)) * (Math.PI / 180);
                   const x = 50 + (s.score / 2.5) * Math.sin(angle);
                   const y = 50 - (s.score / 2.5) * Math.cos(angle);
                   return <circle key={i} cx={x} cy={y} r="1.5" className="fill-indigo-400 shadow-xl" />;
                })}
              </svg>

              {/* Labels */}
              {skills.map((s, i) => {
                 const angle = (i * (360 / skills.length)) * (Math.PI / 180);
                 const x = 50 + 45 * Math.sin(angle);
                 const y = 50 - 45 * Math.cos(angle);
                 return (
                    <div 
                       key={i} 
                       className="absolute text-[8px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap"
                       style={{ 
                          left: `${x}%`, 
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)'
                       }}
                    >
                       {s.skill}
                    </div>
                 );
              })}
           </div>
        </div>

        <div className="space-y-6">
           {skills.map((skill, i) => (
             <div key={i} className="bg-[#0A1120] rounded-3xl border border-white/5 p-6 hover:border-indigo-500/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                         <Target className="h-6 w-6" />
                      </div>
                      <div>
                         <h4 className="text-base font-black text-white tracking-tight">{skill.skill}</h4>
                         <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest px-2 py-0.5 bg-indigo-500/10 rounded-md">
                            {skill.level}
                         </span>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-xl font-black text-white tracking-tighter">{skill.score}%</p>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Mastery</p>
                   </div>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${skill.score}%` }} />
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Leadership", score: 85, icon: Users, color: "blue" },
           { label: "Ethics", score: 92, icon: Shield, color: "emerald" },
           { label: "Creativity", score: 78, icon: Lightbulb, color: "amber" },
           { label: "Digital Literacy", score: 88, icon: Zap, color: "purple" },
         ].map((stat, i) => (
           <div key={i} className="bg-[#0A1120] p-6 rounded-3xl border border-white/5 flex items-center gap-4 group hover:bg-white/[0.04] transition-all">
              <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                 <stat.icon className="h-6 w-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-lg font-black text-white tracking-tight mt-0.5">{stat.score}%</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
