import React from "react";
import * as Icons from "lucide-react";
import { ComparisonItemData } from "./why-ebm.types";

interface ComparisonTableProps {
  items: ComparisonItemData[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ items }) => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Comparing Architectures</span>
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Traditional Learning vs EBM Learning</h3>
        <p className="text-xs text-slate-600 mt-2">
          Discover why traditional rote classrooms fall behind the adaptive, high-density Ejaz Bukhari Method.
        </p>
      </div>

      <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm">
        
        {/* Table Header Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600 py-4 px-6 gap-4 font-mono">
          <div className="md:col-span-1 text-slate-500">Academic Dimension</div>
          <div className="text-red-600 flex items-center gap-1.5">
            <Icons.XCircle className="w-4 h-4 text-red-500" />
            Traditional Methods
          </div>
          <div className="text-blue-600 flex items-center gap-1.5">
            <Icons.CheckCircle className="w-4 h-4 text-blue-500" />
            The EBM Protocol
          </div>
        </div>

        {/* Table Body Rows */}
        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-3 py-4 md:py-5 px-6 gap-3 md:gap-4 hover:bg-slate-50/70 transition-colors"
            >
              {/* Dimension Name */}
              <div className="text-xs font-bold text-slate-800 md:col-span-1 font-mono md:flex md:items-center">
                {item.featureName}
              </div>

              {/* Traditional Column info */}
              <div className="text-xs text-slate-600 font-sans md:flex md:items-center gap-2">
                <span className="md:hidden text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Traditional</span>
                <p>{item.traditionalValue}</p>
              </div>

              {/* EBM Column info */}
              <div className="text-xs text-slate-800 font-semibold font-sans md:flex md:items-center gap-2 bg-blue-50/30 md:bg-transparent p-2.5 md:p-0 rounded-lg border border-blue-100/50 md:border-transparent">
                <span className="md:hidden text-[10px] uppercase font-bold text-blue-600 block mb-1">EBM Advantage</span>
                <p className="flex items-start gap-1.5 text-slate-800">
                  <span className="text-blue-500 text-sm leading-none mt-0.5">&bull;</span>
                  {item.ebmValue}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
