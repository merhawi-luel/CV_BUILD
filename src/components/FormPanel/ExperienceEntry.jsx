const THEMES = {
  dark:  { inputBg: '#111118', inputBorder: '#242432', text: '#e8e8f0', cardBg: 'rgba(255,255,255,0.03)', cardBorder: '#242432' },
  grey:  { inputBg: '#e8e8f0', inputBorder: '#c8c8d8', text: '#1a1a2e', cardBg: 'rgba(0,0,0,0.03)',       cardBorder: '#c8c8d8' },
  white: { inputBg: '#f4f4f8', inputBorder: '#d0d0dc', text: '#1a1a2e', cardBg: 'rgba(0,0,0,0.02)',       cardBorder: '#d0d0dc' },
  paper: { inputBg: '#ede8e0', inputBorder: '#c8bfb0', text: '#1a1a2e', cardBg: 'rgba(0,0,0,0.02)',       cardBorder: '#c8bfb0' },
};

function EntryInput({ name, value, onChange, placeholder, theme }) {
  const t = THEMES[theme] || THEMES.dark;
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '8px 10px',
        borderRadius: '7px',
        border: `1px solid ${t.inputBorder}`,
        background: t.inputBg,
        color: t.text,
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s',
      }}
      onFocus={e => (e.target.style.borderColor = '#b8ff47')}
      onBlur={e => (e.target.style.borderColor = t.inputBorder)}
    />
  );
}

function ExperienceEntry({ entry, onRemoveExperience, onExperienceChange, theme = 'dark' }) {
  const t = THEMES[theme] || THEMES.dark;

  return (
    <div style={{
      padding: '14px',
      background: t.cardBg,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <EntryInput name="company" value={entry.company} onChange={e => onExperienceChange(entry.id, e)} placeholder="Company"    theme={theme} />
        <EntryInput name="role"    value={entry.role}    onChange={e => onExperienceChange(entry.id, e)} placeholder="Role / Title" theme={theme} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <EntryInput name="from" value={entry.from} onChange={e => onExperienceChange(entry.id, e)} placeholder="From" theme={theme} />
        <EntryInput name="to"   value={entry.to}   onChange={e => onExperienceChange(entry.id, e)} placeholder="To"   theme={theme} />
      </div>

      <textarea
        name="description"
        value={entry.description}
        onChange={e => onExperienceChange(entry.id, e)}
        placeholder="Key achievements and responsibilities…"
        rows={3}
        style={{
          width: '100%',
          padding: '8px 10px',
          borderRadius: '7px',
          border: `1px solid ${t.inputBorder}`,
          background: t.inputBg,
          color: t.text,
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          outline: 'none',
          resize: 'vertical',
          lineHeight: '1.5',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => (e.target.style.borderColor = '#b8ff47')}
        onBlur={e => (e.target.style.borderColor = t.inputBorder)}
      />

      <button
        type="button"
        onClick={() => onRemoveExperience(entry.id)}
        style={{
          alignSelf: 'flex-start',
          background: 'transparent',
          border: '1px solid #3f1717',
          borderRadius: '6px',
          padding: '4px 10px',
          color: '#ef4444',
          fontFamily: "'DM Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.04em',
          cursor: 'pointer',
        }}
      >
        — remove
      </button>
    </div>
  );
}

export default ExperienceEntry;