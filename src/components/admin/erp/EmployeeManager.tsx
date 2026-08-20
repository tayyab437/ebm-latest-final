import React from "react";
import { useAdminStore } from "./admin.store";
import { Briefcase, Mail, Building, MoreVertical, Search, Filter, Plus, UserSquare } from "lucide-react";

export function EmployeeManager() {
  const { employees } = useAdminStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Non-Academic Staff</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">HR Records, Administrative Roles & Departments</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 flex items-center gap-2">
          <Plus className="h-4 w-4" /> Hire Employee
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="relative w-full md:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search by name, position..."
               className="w-full pl-9 pr-4 py-2.5 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase tracking-widest"
             />
           </div>
           <div className="flex items-center gap-2 w-full md:w-auto">
             <select className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest focus:outline-none">
               <option>All Departments</option>
               <option>Finance</option>
               <option>IT</option>
               <option>HR</option>
               <option>Operations</option>
             </select>
             <button className="p-2.5 border border-slate-200 bg-white text-slate-500 rounded-xl hover:bg-slate-50 transition-colors">
               <Filter className="h-4 w-4" />
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <th className="px-6 py-5">Employee</th>
                <th className="px-6 py-5">Position</th>
                <th className="px-6 py-5">Department</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 border border-slate-200">
                        <UserSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{emp.name}</div>
                        <div className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1.5 lowercase">
                          <Mail className="h-3 w-3" /> {emp.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{emp.position}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
                      <Building className="h-3.5 w-3.5 text-slate-400" />
                      {emp.department}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      emp.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-rose-100 text-rose-700 border-rose-200"
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
