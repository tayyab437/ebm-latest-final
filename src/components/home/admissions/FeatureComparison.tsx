import React from "react";
import { Check, Minus, Info } from "lucide-react";
import { FEATURE_COMPARISON_DATA } from "./admissions.data";

export const FeatureComparison: React.FC = () => {
  const renderCell = (val: boolean | string) => {
    if (typeof val === "boolean") {
      return val ? (
        <div className="flex justify-center">
          <Check className="w-4 h-4 text-blue-500 dark:text-blue-400" />
        </div>
      ) : (
        <div className="flex justify-center">
          <Minus className="w-4 h-4 text-slate-300 dark:text-slate-700" />
        </div>
      );
    }
    return (
      <span className="text-xs font-mono text-slate-600 dark:text-slate-300 block text-center">
        {val}
      </span>
    );
  };

  // Group features by category for pristine layout separation
  const categories = Array.from(
    new Set(FEATURE_COMPARISON_DATA.map((item) => item.category))
  );

  return (
    <div className="py-12" id="feature-comparison-section">
      <div className="text-center mb-10">
        <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-2 font-semibold">
          Technical Specifications Matrix
        </span>
        <h3 className="text-2xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
          Granular Platform Capability Comparison
        </h3>
      </div>

      {/* Overflow wrapper for desktop scrollability */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 backdrop-blur-md shadow-lg dark:shadow-2xl">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50">
              <th className="p-6 text-xs font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider w-[24%]">
                Feature / Access Scope
              </th>
              <th className="p-6 text-xs font-sans font-semibold text-slate-800 dark:text-slate-200 text-center w-[15%]">
                Starter Scholar
              </th>
              <th className="p-6 text-xs font-sans font-bold text-blue-600 dark:text-blue-300 text-center w-[15%]">
                Accelerated Student
              </th>
              <th className="p-6 text-xs font-sans font-semibold text-indigo-600 dark:text-indigo-300 text-center w-[15%]">
                Socratic Premium
              </th>
              <th className="p-6 text-xs font-sans font-semibold text-purple-600 dark:text-purple-300 text-center w-[15%]">
                Family Suite
              </th>
              <th className="p-6 text-xs font-sans font-semibold text-slate-800 dark:text-slate-200 text-center w-[16%]">
                Institution
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-250 dark:divide-slate-800/40">
            {categories.map((category) => (
              <React.Fragment key={category}>
                {/* Categorical Row Section Separator */}
                <tr className="bg-slate-100/30 dark:bg-slate-900/20">
                  <td
                     colSpan={6}
                     className="p-4 px-6 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-slate-100/70 dark:bg-slate-900/30"
                  >
                    {category}
                  </td>
                </tr>
                {FEATURE_COMPARISON_DATA.filter((item) => item.category === category).map((feature) => (
                  <tr
                    key={feature.id}
                    className="hover:bg-slate-100/40 dark:hover:bg-slate-900/10 transition-colors duration-150"
                  >
                    <td className="p-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-sans text-slate-700 dark:text-slate-300 font-medium">
                          {feature.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">{renderCell(feature.starter)}</td>
                    <td className="p-4 text-center bg-blue-500/5">{renderCell(feature.student)}</td>
                    <td className="p-4 text-center">{renderCell(feature.premium)}</td>
                    <td className="p-4 text-center">{renderCell(feature.family)}</td>
                    <td className="p-4 text-center">{renderCell(feature.institution)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-sans">
        <Info className="w-3.5 h-3.5" />
        <span>All core plans utilize high-speed context layers running securely on server-side architecture.</span>
      </div>
    </div>
  );
};

export default FeatureComparison;
