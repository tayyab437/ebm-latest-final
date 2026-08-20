import React from "react";
import { UserRole } from "../../types";
import { GraduationCap, Users, ShieldAlert } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

export function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
  const options = [
    {
      role: UserRole.STUDENT,
      title: "Student",
      description: "Access my courses, fast-track planners, and chat with AI tutor.",
      icon: GraduationCap,
      color: "bg-indigo-600",
      borderColor: "border-indigo-500",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50/50",
    },
    {
      role: UserRole.PARENT,
      title: "Parent",
      description: "Monitor child's academic acceleration milestones & study feedback.",
      icon: Users,
      color: "bg-blue-500",
      borderColor: "border-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50/50",
    },
    {
      role: UserRole.TEACHER,
      title: "Teacher",
      description: "Manage classes, assignments, and curriculum tracking pipelines.",
      icon: ShieldAlert,
      color: "bg-emerald-500",
      borderColor: "border-emerald-500",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50/50",
    },
  ];

  return (
    <div id="auth-role-selector" className="space-y-3">
      <label className="text-xs font-semibold text-slate-500 font-mono tracking-wider uppercase">
        Select Your Role
      </label>
      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => {
          const IconComponent = option.icon;
          const isSelected = selectedRole === option.role;

          return (
            <button
              key={option.role}
              id={`role-btn-${option.role.toLowerCase()}`}
              type="button"
              onClick={() => onChange(option.role)}
              className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? `${option.borderColor} ${option.bgColor} shadow-md shadow-slate-100/40`
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg shrink-0 flex items-center justify-center text-white ${
                  isSelected ? option.color : "bg-slate-100 text-slate-500"
                }`}
              >
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h4
                  className={`text-sm font-bold ${
                    isSelected ? option.textColor : "text-slate-800"
                  }`}
                >
                  {option.title}
                </h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
