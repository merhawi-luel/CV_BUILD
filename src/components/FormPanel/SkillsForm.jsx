import { useState } from "react";
import "../styles/FormPanel.css";

const THEMES = {
  dark:  { label: '#b8ff47', inputBg: '#111118', inputBorder: '#242432', text: '#e8e8f0', chipBg: 'rgba(184,255,71,0.1)', chipBorder: 'rgba(184,255,71,0.25)', chipText: '#b8ff47' },
  grey:  { label: '#6b21a8', inputBg: '#e8e8f0', inputBorder: '#c8c8d8', text: '#1a1a2e', chipBg: '#f3e8ff',              chipBorder: '#e9d5ff',              chipText: '#6b21a8' },
  white: { label: '#6b21a8', inputBg: '#f4f4f8', inputBorder: '#d0d0dc', text: '#1a1a2e', chipBg: '#f3e8ff',              chipBorder: '#e9d5ff',              chipText: '#6b21a8' },
  paper: { label: '#6b21a8', inputBg: '#ede8e0', inputBorder: '#c8bfb0', text: '#1a1a2e', chipBg: '#f3e8ff',              chipBorder: '#e9d5ff',              chipText: '#6b21a8' },
};

function SkillsForm({ skills, onAddSkill, onRemoveSkill, theme = 'dark' }) {
  const [newSkill, setNewSkill] = useState("");
  const t = THEMES[theme] || THEMES.dark;

  function handleAdd() {
    const s = newSkill.trim();
    if (s) { onAddSkill(s); setNewSkill(""); }
  }

  return (
    <section className="section">
      <div className="section-label">Skills</div>

      {/* Skill chips */}
      {skills.length > 0 && (
        <div className="skills-list">
          {skills.map((skill) => (
            <span key={skill} className="skill-chip">
              {skill}
              <button type="button" onClick={() => onRemoveSkill(skill)}>{'×'}</button>
            </span>
          ))}
        </div>
      )}

      {/* Input + add button */}
      <div className="skill-row">
        <input
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
          placeholder="Type a skill and press Enter"
          className="skill-input"
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e => (e.target.style.borderColor = '')}
        />
        <button type="button" onClick={handleAdd} className="add-btn">+ add</button>
      </div>
    </section>
  );
}

export default SkillsForm;