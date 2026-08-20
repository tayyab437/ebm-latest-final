import fs from 'fs';
let content = fs.readFileSync('src/components/auth/auth.service.ts', 'utf8');

const replacement = `  static async register(payload: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    ebmYear?: EbmYear;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        if (data.token && data.user) {
          this.saveSession(data.token, data.user);
        }
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || "Registration failed." };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || "Registration failed.",
      };
    }
  }`;

content = content.replace(/static async register\([\s\S]*?error: err\.message \|\| "Registration failed\.",\n\s*};\n\s*\}\n\s*\}/, replacement);
fs.writeFileSync('src/components/auth/auth.service.ts', content);
console.log("Updated auth.service.ts");
