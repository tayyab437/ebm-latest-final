import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  id?: string;
}

export function AuthCard({ children, title, subtitle, id }: AuthCardProps) {
  return (
    <div
      id={id || "auth-card"}
      className="w-full max-w-md bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.15)] p-8 transition-all duration-300"
    >
      <div className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl text-[#00a3e0] font-serif tracking-wide mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-600 font-serif">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

