import React, { useMemo, useState } from "react";
import { useCvData } from "./hooks/useCvData";
import { useCvPdfDownload } from "./hooks/useCvPdfDownload";
import "./App.css";

type Theme = "dark" | "grey" | "white" | "paper";

export default function App(): JSX.Element {
  // useCvData is implemented in JS; allow implicit any
  // @ts-ignore
  const {
    cvData,
    handlePersonalChange,
    // @ts-ignore - handler implemented in JS
    handlePersonalFile,
    addEducation,
    removeEducation,
    handleEducationChange,
    addExperience,
    removeExperience,
    handleExperienceChange,
    addSkill,
    removeSkill,
  } = useCvData();

  // @ts-ignore
  const { handleDownloadCv } = useCvPdfDownload(cvData);

  const [theme, setTheme] = useState<Theme>("dark");
  const [skillInput, setSkillInput] = useState("");

  // Color palette (from provided spec)
  const palette = {
    canvasBackground: "#09090e",
    surface: "#111118",
    cardInset: "rgba(255,255,255,0.03)",
    borderRule: "#1e1e2e",
    inputBorder: "#242432",
    bodyText: "#e8e8f0",
    softText: "#9090a8",
    accent: "#b8ff47",
    accentDim: "#8fd432",
    remove: "#ef4444",
    removeBorder: "#3f1717",
    paperBg: "#ffffff",
    paperName: "#0a0a0a",
    paperBody: "#333333",
    paperSecondary: "#444444",
    paperContact: "#555555",
    paperDates: "#888888",
    paperDivider: "#e0e0e8",
    paperSection: "#6b21a8",
    skillBg: "#f3e8ff",
    skillBorder: "#e9d5ff",
    skillText: "#6b21a8",
    previewBg: "#e8e8ee",
    downloadBg: "#0a0a0e",
    downloadText: "#ffffff",
  };

  const accent = palette.accent;
  const canvasDark = palette.canvasBackground;
  const rightPanelBg = theme === "paper" ? palette.paperBg : palette.previewBg;

  const appStyle: React.CSSProperties = useMemo(
    () => ({
      minHeight: "100vh",
      background: theme === "dark" ? canvasDark : "#0b0b0f",
      color: theme === "dark" ? "#e6e6e6" : "#0b0b0f",
      fontFamily: "Inter, system-ui, -apple-system, 'Helvetica Neue', Arial",
      transition: "background 0.18s ease, color 0.18s ease",
      padding: "28px",
    }),
    [theme]
  );

  const formSurfaceStyle: React.CSSProperties = {
    background: palette.surface,
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "DM Mono, monospace",
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: theme === "dark" ? accent : palette.softText,
    marginBottom: 6,
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: `1px solid ${palette.inputBorder}`,
    background: palette.surface,
    color: palette.bodyText,
    outline: "none",
    transition: "box-shadow 0.15s ease, border-color 0.15s ease",
  };

  const focusStyle = {
    boxShadow: `0 0 0 4px ${accent}33`,
    borderColor: accent,
  } as React.CSSProperties;

  const themeButton = (t: Theme, label: string) => {
    const active = t === theme;
    const style: React.CSSProperties = {
      padding: "8px 14px",
      borderRadius: 999,
      border: "none",
      cursor: "pointer",
      background: active ? accent : "transparent",
      color: active ? "#071006" : "#d1d5db",
      fontFamily: "DM Mono, monospace",
      fontSize: 12,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      transition: "transform 0.12s ease, background 0.12s ease",
      marginRight: 8,
    };
    return (
      <button
        key={t}
        style={style}
        onClick={() => setTheme(t)}
        aria-pressed={active}
      >
        {label}
      </button>
    );
  };

  return (
    <div style={appStyle} className="app-root">
      <div className="container mx-auto max-w-7xl" style={{ gap: 20, display: "grid", gridTemplateColumns: "480px 1fr" }}>
        <aside style={formSurfaceStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h1 style={{ fontFamily: "DM Mono, monospace", color: accent, margin: 0 }}>CV Builder</h1>
            <div style={{ display: "flex", alignItems: "center" }}>
              {themeButton("dark", "Dark")}
              {themeButton("grey", "Grey")}
              {themeButton("white", "White")}
              {themeButton("paper", "Paper")}
            </div>
          </div>

          <section style={{ marginBottom: 16 }}>
            <div style={labelStyle}>Personal</div>
            <div style={{ display: "grid", gap: 8 }}>
              <input
                name="name"
                placeholder="Full name"
                value={cvData.personal.name}
                onChange={handlePersonalChange}
                style={{ ...inputBase }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = focusStyle.boxShadow as string)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
              <input
                name="email"
                placeholder="Email"
                value={cvData.personal.email}
                onChange={handlePersonalChange}
                style={{ ...inputBase }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = focusStyle.boxShadow as string)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
              <input
                name="phone"
                placeholder="Phone"
                value={cvData.personal.phone}
                onChange={handlePersonalChange}
                style={{ ...inputBase }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = focusStyle.boxShadow as string)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
              <input
                name="location"
                placeholder="Location"
                value={cvData.personal.location}
                onChange={handlePersonalChange}
                style={{ ...inputBase }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = focusStyle.boxShadow as string)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
              <textarea
                name="description"
                placeholder="A short description about you"
                value={cvData.personal.description || ''}
                onChange={handlePersonalChange}
                style={{ ...inputBase, minHeight: 84 }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = focusStyle.boxShadow as string)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
              <input type="file" accept="image/*" onChange={handlePersonalFile} />
            </div>
          </section>

          <section style={{ marginBottom: 16 }}>
            <div style={labelStyle}>Education</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cvData.education.map((entry: any) => (
                <div key={entry.id} style={{ display: "grid", gap: 6 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      name="school"
                      placeholder="School"
                      value={entry.school}
                      onChange={(e) => handleEducationChange(entry.id, e)}
                      style={{ ...inputBase }}
                    />
                    <button
                      onClick={() => removeEducation(entry.id)}
                      style={{ background: "transparent", border: `1px solid ${palette.removeBorder}`, borderRadius: 8, padding: "6px 8px", color: palette.remove }}
                    >
                      Remove
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input name="degree" placeholder="Degree" value={entry.degree} onChange={(e) => handleEducationChange(entry.id, e)} style={{ ...inputBase }} />
                    <input name="from" placeholder="From" value={entry.from} onChange={(e) => handleEducationChange(entry.id, e)} style={{ width: 100, ...inputBase, color: palette.softText }} />
                    <input name="to" placeholder="To" value={entry.to} onChange={(e) => handleEducationChange(entry.id, e)} style={{ width: 100, ...inputBase, color: palette.softText }} />
                  </div>
                </div>
              ))}
              <div>
                <button
                  onClick={addEducation}
                  style={{ padding: "8px 12px", borderRadius: 8, background: "transparent", border: `1px solid ${accent}`, color: accent }}
                >
                  + Add education
                    <button
                      onClick={addEducation}
                      style={{ padding: "8px 12px", borderRadius: 8, background: "transparent", border: `1px solid ${palette.accent}`, color: palette.accent }}
                    >
                      + Add education
                    </button>
            <div style={labelStyle}>Experience</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cvData.experience.map((entry: any) => (
                <div key={entry.id} style={{ display: "grid", gap: 6 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input name="company" placeholder="Company" value={entry.company} onChange={(e) => handleExperienceChange(entry.id, e)} style={{ ...inputBase }} />
                    <button onClick={() => removeExperience(entry.id)} style={{ background: "transparent", border: `1px solid ${palette.removeBorder}`, borderRadius: 8, padding: "6px 8px", color: palette.remove }}>
                      Remove
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input name="role" placeholder="Role" value={entry.role} onChange={(e) => handleExperienceChange(entry.id, e)} style={{ ...inputBase }} />
                    <input name="from" placeholder="From" value={entry.from} onChange={(e) => handleExperienceChange(entry.id, e)} style={{ width: 100, ...inputBase }} />
                    <input name="to" placeholder="To" value={entry.to} onChange={(e) => handleExperienceChange(entry.id, e)} style={{ width: 100, ...inputBase }} />
                  </div>
                  <textarea name="description" placeholder="Description" value={entry.description} onChange={(e) => handleExperienceChange(entry.id, e)} style={{ ...inputBase, minHeight: 64 }} />
                </div>
              ))}
              <div>
                <button onClick={addExperience} style={{ padding: "8px 12px", borderRadius: 8, background: "transparent", border: `1px solid ${palette.accent}`, color: palette.accent }}>
                  + Add experience
                </button>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: 16 }}>
            <div style={labelStyle}>Skills</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                placeholder="Add skill and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(skillInput);
                    setSkillInput("");
                  }
                }}
                style={{ ...inputBase }}
              />
              <button onClick={() => { addSkill(skillInput); setSkillInput(""); }} style={{ padding: "8px 12px", borderRadius: 999, background: accent, border: "none", color: "#071006" }}>
                Add
              </button>
            </div>
              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {cvData.skills.map((s: string) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, background: palette.cardInset, padding: "6px 8px", borderRadius: 999 }}>
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: palette.bodyText }}>{s}</span>
                  <button onClick={() => removeSkill(s)} style={{ background: "transparent", border: "none", color: palette.remove, cursor: "pointer" }}>×</button>
                </div>
              ))}
            </div>
          </section>

          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <button onClick={handleDownloadCv} style={{ padding: "10px 14px", borderRadius: 999, background: palette.downloadBg, color: palette.downloadText, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}>
              Download CV
            </button>
          </div>
        </aside>

        <main style={{ padding: 20 }}>
          <div style={{ background: rightPanelBg, minHeight: "88vh", borderRadius: 12, padding: 28, boxShadow: theme === "paper" ? "0 6px 24px rgba(16,24,40,0.08)" : "none" }}>
            {/* Paper preview must be preserved exactly as specified */}
            <div style={{ maxWidth: 720, margin: "0 auto", background: palette.paperBg, padding: 28 }}>
              <div style={{ textAlign: "center", marginBottom: 8 }}>
                  {cvData.personal.image && (
                    <div style={{ marginBottom: 8 }}>
                      <img src={cvData.personal.image} alt={cvData.personal.name || 'Photo'} style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 999, border: '3px solid #fff', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', display: 'inline-block' }} />
                    </div>
                  )}
                  <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 32, letterSpacing: "-0.03em", color: palette.paperName }}>{cvData.personal.name || "Your Name"}</div>
                  {cvData.personal.description && (
                    <div style={{ marginTop: 8, fontFamily: "Inter, sans-serif", fontSize: 14, color: palette.paperBody }}>{cvData.personal.description}</div>
                  )}
                  <div style={{ marginTop: 6, fontFamily: "DM Mono, monospace", fontSize: 12, color: palette.paperContact }}>
                    {[cvData.personal.email, cvData.personal.phone, cvData.personal.location].filter(Boolean).join(" | ")}
                  </div>
              </div>

              {/* Education */}
              {cvData.education.some((e: any) => Object.values(e).some((v) => String(v || "").trim())) && (
                <section style={{ marginTop: 18 }}>
                  <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: palette.paperSection, marginBottom: 6 }}>Education</div>
                  <div>
                    {cvData.education.map((entry: any) => (
                      <div key={entry.id} style={{ marginBottom: 8 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Inter", fontSize: 13, color: palette.paperBody }}>
                          <div style={{ fontWeight: 600 }}>{entry.school}</div>
                            <div style={{ color: palette.paperSecondary }}>{[entry.from, entry.to].filter(Boolean).join(" – ")}</div>
                        </div>
                          <div style={{ fontSize: 13, color: palette.paperSecondary }}>{[entry.degree, entry.field].filter(Boolean).join(", ")}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Experience */}
              {cvData.experience.some((e: any) => Object.values(e).some((v) => String(v || "").trim())) && (
                <section style={{ marginTop: 14 }}>
                  <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: palette.paperSection, marginBottom: 6 }}>Experience</div>
                  <div>
                    {cvData.experience.map((entry: any) => (
                      <div key={entry.id} style={{ marginBottom: 8 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Inter", fontSize: 13, color: palette.paperBody }}>
                          <div style={{ fontWeight: 600 }}>{entry.role}</div>
                            <div style={{ color: palette.paperSecondary }}>{[entry.from, entry.to].filter(Boolean).join(" – ")}</div>
                        </div>
                          <div style={{ fontSize: 13, color: palette.paperSecondary }}>{entry.company}</div>
                          {entry.description && <div style={{ marginTop: 6, fontSize: 13, color: palette.paperSecondary }}>{entry.description}</div>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {cvData.skills && cvData.skills.length > 0 && (
                <section style={{ marginTop: 14 }}>
                  <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: palette.paperSection, marginBottom: 6 }}>Skills</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {cvData.skills.map((s: string) => (
                        <div key={s} style={{ background: palette.skillBg, border: `1px solid ${palette.skillBorder}`, color: palette.skillText, padding: "6px 10px", borderRadius: 999, fontFamily: "DM Mono, monospace", fontSize: 12 }}>{s}</div>
                      ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
