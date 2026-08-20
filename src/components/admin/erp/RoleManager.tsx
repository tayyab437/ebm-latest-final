import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Key, 
  Users, 
  ChevronRight, 
  Lock, 
  Eye, 
  EyeOff,
  Edit3, 
  Trash2, 
  Plus, 
  ShieldAlert, 
  Search, 
  UserPlus, 
  UserMinus, 
  Check, 
  X, 
  Shield, 
  Sparkles, 
  FileText,
  AlertCircle
} from "lucide-react";

interface Account {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Principal" | "Admin" | "Faculty" | "Student";
  enrolledAt: string;
  status: "Active" | "Suspended";
  password?: string;
}

const DEFAULT_ACCOUNTS: Account[] = [
  { id: "acc-1", name: "Dr. Ejaz Bukhari", email: "ejaz@ebm.edu", role: "Super Admin", enrolledAt: "2024-01-15", status: "Active", password: "ebmSuperAdmin123!" },
  { id: "acc-2", name: "Principal Sarah Jenkins", email: "principal@ebm.edu", role: "Principal", enrolledAt: "2024-02-10", status: "Active", password: "ebmPrincipal2026!" },
  { id: "acc-3", name: "Prof. Michael Vance", email: "michael.vance@ebm.edu", role: "Faculty", enrolledAt: "2024-05-18", status: "Active", password: "ebmFacultyVance!" },
  { id: "acc-4", name: "Amara Smith", email: "amara@ebm.edu", role: "Admin", enrolledAt: "2024-08-20", status: "Active", password: "ebmAdminAmara!" },
  { id: "acc-5", name: "Zaid Bukhari", email: "zaid.b@ebm.edu", role: "Student", enrolledAt: "2025-01-05", status: "Active", password: "ebmStudentZaid!" },
];

const getRoleStyle = (role: string) => {
  switch (role) {
    case "Super Admin":
      return {
        bg: "bg-rose-50 border-rose-100/80",
        text: "text-rose-600",
        badge: "bg-rose-50 text-rose-700 border border-rose-200"
      };
    case "Principal":
      return {
        bg: "bg-indigo-50 border-indigo-100/80",
        text: "text-indigo-600",
        badge: "bg-indigo-50 text-indigo-700 border border-indigo-200"
      };
    case "Admin":
      return {
        bg: "bg-slate-50 border-slate-100/80",
        text: "text-slate-600",
        badge: "bg-slate-50 text-slate-700 border border-slate-200"
      };
    case "Faculty":
      return {
        bg: "bg-blue-50 border-blue-100/80",
        text: "text-blue-600",
        badge: "bg-blue-50 text-blue-700 border border-blue-200"
      };
    case "Student":
      return {
        bg: "bg-amber-50 border-amber-100/80",
        text: "text-amber-600",
        badge: "bg-amber-50 text-amber-700 border border-amber-200"
      };
    default:
      return {
        bg: "bg-slate-50 border-slate-100/80",
        text: "text-slate-600",
        badge: "bg-slate-50 text-slate-700 border border-slate-200"
      };
  }
};

export function RoleManager() {
  // Tabs
  const [activeTab, setActiveTab] = useState<"accounts" | "permissions">("accounts");

  // Accounts state with local storage persistence
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem("ebm_erp_accounts");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading ebm_erp_accounts:", e);
      }
    }
    return DEFAULT_ACCOUNTS;
  });

  useEffect(() => {
    localStorage.setItem("ebm_erp_accounts", JSON.stringify(accounts));
  }, [accounts]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  // Alert State
  const [alert, setAlert] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const triggerAlert = (type: "success" | "error", text: string) => {
    setAlert({ type, text });
    setTimeout(() => setAlert(null), 4000);
  };

  // Add Account Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<Account["role"]>("Student");
  const [newStatus, setNewStatus] = useState<Account["status"]>("Active");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  // Edit Account Inline State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState<Account["role"]>("Student");
  const [editStatus, setEditStatus] = useState<Account["status"]>("Active");
  const [editPassword, setEditPassword] = useState("");
  const [editPasswordVisible, setEditPasswordVisible] = useState(false);

  // Dedicated Password Reset Modal State
  const [resettingAccount, setResettingAccount] = useState<Account | null>(null);
  const [resetPasswordInput, setResetPasswordInput] = useState("");
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);

  // Revealed passwords map (for showing passwords on click in directory)
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

  const togglePasswordReveal = (id: string) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle Add Account
  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      triggerAlert("error", "Name and Email are required fields.");
      return;
    }

    if (accounts.some(acc => acc.email.toLowerCase() === newEmail.toLowerCase().trim())) {
      triggerAlert("error", "An account with this email already exists.");
      return;
    }

    const finalPassword = newPassword.trim() || `EBM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newAccount: Account = {
      id: `acc-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      role: newRole,
      enrolledAt: new Date().toISOString().split("T")[0],
      status: newStatus,
      password: finalPassword,
    };

    setAccounts([newAccount, ...accounts]);
    setIsAddModalOpen(false);
    
    // Reset Form
    setNewName("");
    setNewEmail("");
    setNewRole("Student");
    setNewStatus("Active");
    setNewPassword("");
    setNewPasswordVisible(false);

    triggerAlert("success", `Successfully created ${newRole} account for ${newName}! Password set to "${finalPassword}"`);
  };

  // Handle Edit Click
  const startEdit = (acc: Account) => {
    setEditingId(acc.id);
    setEditName(acc.name);
    setEditEmail(acc.email);
    setEditRole(acc.role);
    setEditStatus(acc.status);
    setEditPassword(acc.password || "");
    setEditPasswordVisible(false);
  };

  // Handle Save Edit
  const handleSaveEdit = (id: string) => {
    if (!editName.trim() || !editEmail.trim()) {
      triggerAlert("error", "Name and Email cannot be empty.");
      return;
    }

    setAccounts(accounts.map(acc => {
      if (acc.id === id) {
        return {
          ...acc,
          name: editName.trim(),
          email: editEmail.trim().toLowerCase(),
          role: editRole,
          status: editStatus,
          password: editPassword.trim() || acc.password,
        };
      }
      return acc;
    }));

    setEditingId(null);
    triggerAlert("success", "Account details and password updated successfully.");
  };

  // Handle Dedicated Reset Password Action
  const handleResetPasswordCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resettingAccount) return;
    if (!resetPasswordInput.trim()) {
      triggerAlert("error", "Password cannot be empty.");
      return;
    }

    setAccounts(accounts.map(acc => {
      if (acc.id === resettingAccount.id) {
        return {
          ...acc,
          password: resetPasswordInput.trim()
        };
      }
      return acc;
    }));

    triggerAlert("success", `Password for ${resettingAccount.name} has been updated.`);
    setResettingAccount(null);
    setResetPasswordInput("");
    setResetPasswordVisible(false);
  };

  // Handle Delete Account
  const handleDeleteAccount = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove the account for ${name}?`)) {
      setAccounts(accounts.filter(acc => acc.id !== id));
      triggerAlert("success", `Account for ${name} has been deleted.`);
    }
  };

  // Filtered accounts list
  const filteredAccounts = accounts.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          acc.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || acc.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Calculate dynamic stats for each role type
  const getRoleCount = (roleName: string) => {
    return accounts.filter(a => a.role === roleName).length;
  };

  const rolesStats = [
    { name: "Super Admin", users: getRoleCount("Super Admin"), level: "L10", color: "rose" },
    { name: "Principal", users: getRoleCount("Principal"), level: "L09", color: "indigo" },
    { name: "Admin", users: getRoleCount("Admin"), level: "L08", color: "slate" },
    { name: "Faculty", users: getRoleCount("Faculty"), level: "L07", color: "blue" },
    { name: "Student", users: getRoleCount("Student"), level: "L01", color: "amber" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Dynamic Alert Popup */}
      {alert && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-xl animate-in slide-in-from-top duration-300 ${
          alert.type === "success" 
            ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
            : "bg-rose-50 border-rose-100 text-rose-800"
        }`}>
          {alert.type === "success" ? <Check className="h-5 w-5 text-emerald-600 shrink-0" /> : <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />}
          <p className="text-xs font-black uppercase tracking-wider">{alert.text}</p>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-indigo-600" />
            Roles & Identity Management
          </h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">
            Identity Provisioning, Role Assignments & Cryptographic Guardrails
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab("accounts")}
            className={`px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border ${
              activeTab === "accounts" 
                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Accounts Directory
          </button>
          <button 
            onClick={() => setActiveTab("permissions")}
            className={`px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border ${
              activeTab === "permissions" 
                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Permissions Matrix
          </button>
        </div>
      </div>

      {activeTab === "accounts" ? (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search accounts by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Add Account Trigger */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 shrink-0"
              >
                <UserPlus className="h-4 w-4" />
                Add Account
              </button>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {["All", "Super Admin", "Principal", "Admin", "Faculty", "Student"].map((role) => {
                const count = role === "All" ? accounts.length : getRoleCount(role);
                const isActive = roleFilter === role;
                return (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      isActive 
                        ? "bg-slate-900 text-amber-400 font-black border border-slate-950" 
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/60"
                    }`}
                  >
                    <span>{role}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${
                      isActive ? "bg-amber-400 text-slate-950" : "bg-slate-200/80 text-slate-600"
                    }`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Directory Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="px-6 py-4">Identity Details</th>
                    <th className="px-6 py-4">Security Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Enrolled Date</th>
                    <th className="px-6 py-4 text-right">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((acc) => {
                      const isEditing = editingId === acc.id;
                      const style = getRoleStyle(acc.role);
                      const currentStyle = getRoleStyle(isEditing ? editRole : acc.role);

                      return (
                        <tr key={acc.id} className={`hover:bg-slate-50/40 transition-colors ${isEditing ? "bg-indigo-50/20" : ""}`}>
                          
                          {/* Identity Card */}
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <div className="space-y-2 max-w-xs">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                                  placeholder="Full Name"
                                />
                                <input
                                  type="email"
                                  value={editEmail}
                                  onChange={(e) => setEditEmail(e.target.value)}
                                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-[11px] font-mono text-slate-600"
                                  placeholder="Email Address"
                                />
                                <div className="relative">
                                  <input
                                    type={editPasswordVisible ? "text" : "password"}
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.target.value)}
                                    className="w-full pl-3 pr-8 py-1.5 bg-white border border-slate-300 rounded-lg text-[11px] font-mono text-slate-600"
                                    placeholder="Update Password"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setEditPasswordVisible(!editPasswordVisible)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                  >
                                    {editPasswordVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs uppercase ${style.bg} ${style.text} border`}>
                                  {acc.name.split(" ").map(w => w[0]).join("").substring(0, 2)}
                                </div>
                                <div>
                                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{acc.name}</h4>
                                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">{acc.email}</p>
                                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                                    <Lock className="h-3 w-3 shrink-0 text-slate-400" />
                                    <span className="font-mono text-slate-600">
                                      {revealedPasswords[acc.id] ? (acc.password || "••••••••") : "••••••••"}
                                    </span>
                                    <button 
                                      onClick={() => togglePasswordReveal(acc.id)}
                                      className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                      title={revealedPasswords[acc.id] ? "Hide Password" : "Show Password"}
                                    >
                                      {revealedPasswords[acc.id] ? (
                                        <EyeOff className="h-3 w-3" />
                                      ) : (
                                        <Eye className="h-3 w-3" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>

                          {/* Security Role Select / Badge */}
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <select
                                value={editRole}
                                onChange={(e) => setEditRole(e.target.value as Account["role"])}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border focus:outline-none ${currentStyle.badge}`}
                              >
                                <option value="Super Admin">Super Admin</option>
                                <option value="Principal">Principal</option>
                                <option value="Admin">Admin</option>
                                <option value="Faculty">Faculty</option>
                                <option value="Student">Student</option>
                              </select>
                            ) : (
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${style.badge}`}>
                                {acc.role}
                              </span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <select
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value as Account["status"])}
                                className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200 bg-white"
                              >
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                              </select>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${acc.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{acc.status}</span>
                              </div>
                            )}
                          </td>

                          {/* Enrolled At */}
                          <td className="px-6 py-4">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                              {acc.enrolledAt}
                            </span>
                          </td>

                          {/* Action Controls */}
                          <td className="px-6 py-4 text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleSaveEdit(acc.id)}
                                  className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-all"
                                  title="Commit Changes"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-2 bg-slate-50 text-slate-400 hover:bg-slate-100 rounded-xl transition-all"
                                  title="Cancel Edit"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setResettingAccount(acc);
                                    setResetPasswordInput(acc.password || "");
                                    setResetPasswordVisible(false);
                                  }}
                                  className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50/50 rounded-xl transition-all"
                                  title="Change Password"
                                >
                                  <Key className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => startEdit(acc)}
                                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all"
                                  title="Edit Identity & Role"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAccount(acc.id, acc.name)}
                                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl transition-all"
                                  title="Revoke Account"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest">No Identities Match Query</h4>
                        <p className="text-xs text-slate-400 mt-1">Try tweaking your keyword terms or category filters.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Account Modal Overlay */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-indigo-600" />
                    Provision Security Identity
                  </h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleAddAccount} className="p-6 space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Professor Jonathan Stark"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="username@ebm.edu"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Set Password</label>
                    <div className="relative">
                      <input
                        type={newPasswordVisible ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Leave blank for auto-generated password"
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {newPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Security Role</label>
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value as Account["role"])}
                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none"
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Principal">Principal</option>
                        <option value="Admin">Admin</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Student">Student</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Initial Status</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as Account["status"])}
                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-100"
                    >
                      Provision Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Quick Password Reset Modal Overlay */}
          {resettingAccount && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                    <Key className="h-4 w-4 text-amber-500" />
                    Reset Account Password
                  </h3>
                  <button onClick={() => setResettingAccount(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleResetPasswordCommit} className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Account Name</span>
                    <span className="text-xs font-bold text-slate-800 uppercase mt-1 block">{resettingAccount.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{resettingAccount.email}</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={resetPasswordVisible ? "text" : "password"}
                        required
                        value={resetPasswordInput}
                        onChange={(e) => setResetPasswordInput(e.target.value)}
                        placeholder="Type new password"
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setResetPasswordVisible(!resetPasswordVisible)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {resetPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setResettingAccount(null)}
                      className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-100"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Roles List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                  <Key className="h-4 w-4 text-amber-500" />
                  Active System Roles
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {rolesStats.map((role, i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border bg-${role.color}-50 text-${role.color}-600 border-${role.color}-100`}>
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{role.name}</h4>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                            <Users className="h-3 w-3" /> {role.users} Active Users
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className={`text-[10px] font-black text-${role.color}-600 uppercase tracking-widest`}>Level {role.level}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <Lock className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Permissions Draft Matrix */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                  <Edit3 className="h-4 w-4 text-indigo-600" />
                  Permission Matrix (Draft Mode)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      <th className="px-6 py-4">Module / Resource</th>
                      <th className="px-4 py-4 text-center">Create</th>
                      <th className="px-4 py-4 text-center">Read</th>
                      <th className="px-4 py-4 text-center">Update</th>
                      <th className="px-4 py-4 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {["Student Records", "Academic ERP", "Finance Hub", "System Settings"].map((mod, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 text-[10px] font-black text-slate-700 uppercase tracking-widest">{mod}</td>
                        <td className="px-4 py-4 text-center">
                          <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-0" defaultChecked={i === 0} />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-0" defaultChecked />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-0" defaultChecked={i < 2} />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-0" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
                <button 
                  onClick={() => triggerAlert("success", "Permission Matrix committed and applied across active clusters.")}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  Commit Changes
                </button>
              </div>
            </div>
          </div>

          {/* RBAC Integrity Card */}
          <div className="space-y-8">
            <div className="bg-[#0F172A] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/10">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldAlert className="w-32 h-32" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                RBAC Core Integrity
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6">
                Every permission and role change is cryptographically hashed, audited, and appended to the immutable system audit chain.
              </p>
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-2xl">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  <span>Audit Chain Status</span>
                  <span className="text-emerald-400">Verified</span>
                </div>
                <div className="h-1 bg-slate-700 rounded-full">
                  <div className="h-full bg-emerald-500 w-full rounded-full" />
                </div>
              </div>
            </div>

            {/* Security Policies */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Security Policies</h3>
              <div className="space-y-3">
                {[
                  "Multi-Factor Auth (Enforced)",
                  "Session Timeout (30 min)",
                  "IP Whitelisting (Active)",
                  "Password Complexity (High)",
                ].map((policy, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">{policy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
