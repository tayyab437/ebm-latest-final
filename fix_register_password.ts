import fs from 'fs';

let storeContent = fs.readFileSync('src/components/auth/auth.store.ts', 'utf8');
storeContent = storeContent.replace(
  /const register = async \(name: string, email: string, role: UserRole, ebmYear\?: any\) => \{/,
  'const register = async (name: string, email: string, password: string | undefined, role: UserRole, ebmYear?: any) => {'
);
storeContent = storeContent.replace(
  /const result = await AuthService\.register\(\{ name, email, role, ebmYear \}\);/,
  'const result = await AuthService.register({ name, email, password, role, ebmYear });'
);
fs.writeFileSync('src/components/auth/auth.store.ts', storeContent);

let formContent = fs.readFileSync('src/components/auth/RegisterForm.tsx', 'utf8');
formContent = formContent.replace(
  /const result = await register\(name, email, role, role === UserRole\.STUDENT \? ebmYear : undefined\);/,
  'const result = await register(name, email, password, role, role === UserRole.STUDENT ? ebmYear : undefined);'
);
fs.writeFileSync('src/components/auth/RegisterForm.tsx', formContent);

console.log("Updated auth files for password registration");
