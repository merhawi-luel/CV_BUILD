import { useState } from "react";

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
    <section>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: t.label,
        marginBottom: '12px',
      }}>
        Skills
      </div>

      {/* Skill chips */}
      {skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
          {skills.map((skill) => (
            <span
              key={skill}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '20px',
                background: t.chipBg,
                border: `1px solid ${t.chipBorder}`,
                fontFamily: "'DM Mono', monospace",
                fontSize: '12px',
                color: t.chipText,
              }}
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemoveSkill(skill)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: t.chipText,
                  opacity: 0.6,
                  cursor: 'pointer',
                  padding: '0',
                  fontSize: '13px',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input + add button */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
          placeholder="Type a skill and press Enter"
          style={{
            flex: 1,
            padding: '9px 12px',
            borderRadius: '8px',
            border: `1px solid ${t.inputBorder}`,
            background: t.inputBg,
            color: t.text,
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = '#b8ff47')}
          onBlur={e => (e.target.style.borderColor = t.inputBorder)}
        />
        <button
          type="button"
          onClick={handleAdd}
          style={{
            background: '#b8ff47',
            color: '#09090e',
            border: 'none',
            borderRadius: '8px',
            padding: '9px 16px',
            fontFamily: "'DM Mono', monospace",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          + add
        </button>
      </div>
    </section>
  );
}

export default SkillsForm;