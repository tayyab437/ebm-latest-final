import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

let _app: any = null;
let _auth: Auth | null = null;
let _provider: GoogleAuthProvider | null = null;

export function getFirebaseApp() {
  if (!_app) {
    _app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
}

export function getGoogleAuthProvider(): GoogleAuthProvider {
  if (!_provider) {
    _provider = new GoogleAuthProvider();
  }
  return _provider;
}

// Proxy export for backward compatibility that initializes only on first access
export const auth = new Proxy({} as Auth, {
  get(_target, prop) {
    const realAuth = getFirebaseAuth();
    const val = (realAuth as any)[prop];
    return typeof val === 'function' ? val.bind(realAuth) : val;
  }
});

export const googleAuthProvider = new Proxy({} as GoogleAuthProvider, {
  get(_target, prop) {
    const realProvider = getGoogleAuthProvider();
    const val = (realProvider as any)[prop];
    return typeof val === 'function' ? val.bind(realProvider) : val;
  }
});

