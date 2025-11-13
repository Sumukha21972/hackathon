import React, { useState } from "react";
import "./login.css";
import bgImage from "../assets/binary-bg.webp"; // keep if you use the background, otherwise remove

import { login } from "../api";

function IconDocument() {
  return (
    <svg width="58" height="58" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="gDoc" x1="0" x2="1">
          <stop offset="0" stopColor="#dceeff"/>
          <stop offset="1" stopColor="#bfe1ff"/>
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="14" height="18" rx="1.5" fill="url(#gDoc)" stroke="#cfe7ff" strokeWidth="0.8"/>
      <path d="M6 7h8M6 10h8M6 13h8" stroke="#3b82f6" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="17" y="6" width="2.8" height="4" rx="0.6" fill="#bfe1ff" stroke="#a7d2ff" strokeWidth="0.7"/>
    </svg>
  );
}

function IconFingerprint() {
  return (
    <svg width="58" height="58" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="gFp" x1="0" x2="1">
          <stop offset="0" stopColor="#dff3ff"/>
          <stop offset="1" stopColor="#cfeaff"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="url(#gFp)" stroke="#cfe7ff" strokeWidth="0.6"/>
      <path d="M8.5 10.5c.8-2.2 2.8-3.2 4.7-3 2 .2 3.6 1.8 3.9 3.8" stroke="#2b6ef6" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5 14.2c.6-1.4 1.6-2.2 2.4-2.4 1.2-.3 2.6.2 3.2 1.2" stroke="#2b6ef6" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M12 18v-2.2" stroke="#2b6ef6" strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  );
}

function IconPadlock() {
  return (
    <svg width="58" height="58" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="gLock" x1="0" x2="1">
          <stop offset="0" stopColor="#dbeeff"/>
          <stop offset="1" stopColor="#c3e2ff"/>
        </linearGradient>
      </defs>
      <rect x="4" y="9" width="16" height="11" rx="2.2" fill="url(#gLock)" stroke="#cfe7ff" strokeWidth="0.7"/>
      <path d="M8 9V7a4 4 0 018 0v2" stroke="#2b6ef6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="14.2" r="1.2" fill="#2b6ef6"/>
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="58" height="58" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="gShield" x1="0" x2="1">
          <stop offset="0" stopColor="#e6f3ff"/>
          <stop offset="1" stopColor="#d0eaff"/>
        </linearGradient>
      </defs>
      <path d="M12 3l6 3v4.4c0 4.3-2.8 8-6 9-3.2-1-6-4.7-6-9V6l6-3z" fill="url(#gShield)" stroke="#cfe7ff" strokeWidth="0.7"/>
      <path d="M10 13l1.8 2.2L15 11" stroke="#2b6ef6" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconProfile() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="gProf" x1="0" x2="1">
          <stop offset="0" stopColor="#dff3ff"/>
          <stop offset="1" stopColor="#cfeaff"/>
        </linearGradient>
      </defs>
      <circle cx="12" cy="8" r="3.2" fill="url(#gProf)" stroke="#cfe7ff" strokeWidth="0.6"/>
      <path d="M4.5 19a8 8 0 0115 0" fill="none" stroke="#2b6ef6" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  );
}

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("issuer");
  const [password, setPassword] = useState("password");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e?.preventDefault();
    setBusy(true);
    try {
      const res = await login(username, password);
      if (res && res.token) onLogin(res.token);
      else alert("Login failed — check username/password");
    } catch (err) {
      console.error(err);
      alert("Login error");
    } finally {
      setBusy(false);
    }
  }

  const pageStyle = {
    backgroundImage: `linear-gradient(rgba(2,8,23,0.45), rgba(2,8,23,0.45)), url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="vx-login-page" style={pageStyle}>
      <header className="vx-topbar">
        <div className="vx-topbar-inner">
          <div className="vx-logo-text">vault<span className="vx-x">X</span></div>
          <nav className="vx-nav">
            <a className="active">Home</a>
            <a>About</a>
          </nav>
        </div>
      </header>

      <main className="vx-main">
        <section className="vx-hero">
          <div className="vx-hero-card">
            {/* Left hero panel */}
            <div className="vx-hero-left">
              <h1>Secure Your Personal<br/>Data & Documents</h1>

              <p className="vx-hero-desc">
                Advanced Protection for Your Digital Life
                <span className="vx-dot"> · </span>
                End-to-End Encryption
                <span className="vx-dot"> · </span>
                Multi-Factor Authentication
              </p>

              {/* Icon cluster (bottom-left) */}
              <div className="vx-icon-cluster" aria-hidden>
                <div className="vx-icon-item">
                  <div className="vx-icon-frame"><IconDocument /></div>
                </div>
                <div className="vx-icon-item">
                  <div className="vx-icon-frame"><IconFingerprint /></div>
                </div>
                <div className="vx-icon-item">
                  <div className="vx-icon-frame"><IconPadlock /></div>
                </div>
                <div className="vx-icon-item">
                  <div className="vx-icon-frame"><IconShield /></div>
                </div>
              </div>
            </div>

            {/* Right login card */}
            <aside className="vx-hero-right">
              <div className="vx-login-card">
                <div className="vx-lock-header">
                  <svg className="vx-lock" viewBox="0 0 24 24" width="28" height="28" aria-hidden focusable="false">
                    <path fill="#1e61d6" d="M12 2a4 4 0 00-4 4v3H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2h-2V6a4 4 0 00-4-4z"/>
                  </svg>
                  <h3>Secure Login</h3>
                </div>

                <form className="vx-login-form" onSubmit={handleSubmit}>
                  <label className="vx-label">Username</label>
                  <input
                    className="vx-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                  />

                  <label className="vx-label">Password</label>
                  <input
                    className="vx-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />

                  <button className="vx-btn" type="submit" disabled={busy}>
                    {busy ? "Signing in..." : "LOGIN"}
                  </button>

                  <div className="vx-forgot">
                    <a href="#" onClick={(e)=>e.preventDefault()}>Forgot Username/Password?</a>
                  </div>
                </form>
              </div>

              {/* Profile icon on the right edge of left panel visually — positioned here to overlay */}
              <div className="vx-profile-floating" aria-hidden>
                <IconProfile />
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
