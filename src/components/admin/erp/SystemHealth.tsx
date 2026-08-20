import React from "react";
import { Activity, ShieldCheck, Database, Globe, Cpu, Zap, HardDrive, Server, RefreshCw, AlertCircle } from "lucide-react";

export function SystemHealth() {
  const services = [
    { name: "Cloud SQL (MySQL 8.x)", status: "HEALTHY", latency: "12ms", uptime: "99.99%", icon: Database },
    { name: "Cloudflare R2 Storage", status: "HEALTHY", latency: "45ms", uptime: "100%", icon: HardDrive },
    { name: "Gemini API Gateway", status: "HEALTHY", latency: "850ms", uptime: "99.9%", icon: Zap },
    { name: "Authentication Service", status: "HEALTHY", latency: "8ms", uptime: "100%", icon: ShieldCheck },
    { name: "Audit Logging Engine", status: "HEALTHY", latency: "5ms", uptime: "100%", icon: Activity },
    { name: "Static Asset Delivery", status: "HEALTHY", latency: "15ms", uptime: "100%", icon: Globe },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Infrastructure Monitoring</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Real-time Service Status, Latency & Health Checks</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center gap-2">
          <RefreshCw className="h-4 w-4" /> Trigger Global Health Check
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                 <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-600" />
                    Service Health Matrix
                 </h3>
              </div>
              <div className="divide-y divide-slate-100">
                 {services.map((service, i) => (
                   <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                      <div className="flex items-center gap-5">
                         <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <service.icon className="h-6 w-6" />
                         </div>
                         <div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{service.name}</h4>
                            <div className="flex items-center gap-3 mt-1.5">
                               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Latency: {service.latency}</span>
                               <span className="text-slate-300">•</span>
                               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Uptime: {service.uptime}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-[9px] font-black uppercase tracking-widest">
                            {service.status}
                         </span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#0F172A] rounded-3xl p-8 text-white relative overflow-hidden">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 text-blue-400">Compute Resources</h3>
              <div className="space-y-6">
                 {[
                   { label: "CPU Utilization", value: "14%", icon: Cpu },
                   { label: "Memory Usage", value: "32%", icon: Activity },
                   { label: "Disk I/O", value: "2.4 MB/s", icon: HardDrive },
                 ].map((res, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                         <span className="flex items-center gap-2"><res.icon className="h-3 w-3" /> {res.label}</span>
                         <span className="text-white">{res.value}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                         <div className={`h-full bg-blue-500 rounded-full w-[${res.value}] shadow-[0_0_8px_rgba(59,130,246,0.5)]`} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Security Incident Log</h3>
              <div className="space-y-3">
                 {[
                   { event: "Brute Force Detected", time: "10 min ago", severity: "LOW" },
                   { event: "Rate Limit Tripped", time: "2 hours ago", severity: "LOW" },
                   { event: "Unauthorized API Call", time: "1 day ago", severity: "MED" },
                 ].map((log, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                         <AlertCircle className={`h-3.5 w-3.5 ${log.severity === "MED" ? "text-amber-500" : "text-slate-400"}`} />
                         <div>
                            <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{log.event}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{log.time}</p>
                         </div>
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-widest ${log.severity === "MED" ? "text-amber-600" : "text-slate-400"}`}>
                        {log.severity}
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
