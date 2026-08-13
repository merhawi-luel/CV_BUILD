import "../styles/FormPanel.css";

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
      className="entry-input"
      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
      onBlur={e => (e.target.style.borderColor = '')}
    />
  );
}

function ExperienceEntry({ entry, onRemoveExperience, onExperienceChange, theme = 'dark' }) {
  const t = THEMES[theme] || THEMES.dark;

  return (
    <div className="entry-card">
      <div className="entry-grid-2">
        <EntryInput name="company" value={entry.company} onChange={e => onExperienceChange(entry.id, e)} placeholder="Company"    theme={theme} />
        <EntryInput name="role"    value={entry.role}    onChange={e => onExperienceChange(entry.id, e)} placeholder="Role / Title" theme={theme} />
      </div>

      <div className="entry-grid-2">
        <EntryInput name="from" value={entry.from} onChange={e => onExperienceChange(entry.id, e)} placeholder="From" theme={theme} />
        <EntryInput name="to"   value={entry.to}   onChange={e => onExperienceChange(entry.id, e)} placeholder="To"   theme={theme} />
      </div>

      <textarea
        name="description"
        value={entry.description}
        onChange={e => onExperienceChange(entry.id, e)}
        placeholder="Key achievements and responsibilities…"
        rows={3}
        className="entry-textarea"
        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={e => (e.target.style.borderColor = '')}
      />

      <button
        type="button"
        onClick={() => onRemoveExperience(entry.id)}
        className="remove-btn"
      >
        — remove
      </button>
    </div>
  );
}

export default ExperienceEntry;