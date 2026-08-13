import "../styles/FormPanel.css";

const THEMES = {
  dark:  { inputBg: '#111118', inputBorder: '#242432', text: '#e8e8f0', cardBg: 'rgba(255,255,255,0.03)', cardBorder: '#242432' },
  grey:  { inputBg: '#e8e8f0', inputBorder: '#c8c8d8', text: '#1a1a2e', cardBg: 'rgba(0,0,0,0.03)',       cardBorder: '#c8c8d8' },
  white: { inputBg: '#f4f4f8', inputBorder: '#d0d0dc', text: '#1a1a2e', cardBg: 'rgba(0,0,0,0.02)',       cardBorder: '#d0d0dc' },
  paper: { inputBg: '#ede8e0', inputBorder: '#c8bfb0', text: '#1a1a2e', cardBg: 'rgba(0,0,0,0.02)',       cardBorder: '#c8bfb0' },
};

function EntryInput({ name, value, onChange, placeholder, theme, style = {} }) {
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

function EducationEntry({ entry, onRemoveEducation, onEducationChange, theme = 'dark' }) {
  const t = THEMES[theme] || THEMES.dark;

  return (
    <div className="entry-card">
      <EntryInput name="school" value={entry.school} onChange={e => onEducationChange(entry.id, e)} placeholder="School / University" theme={theme} />

      <div className="entry-grid-2">
        <EntryInput name="degree" value={entry.degree} onChange={e => onEducationChange(entry.id, e)} placeholder="Degree" theme={theme} />
        <EntryInput name="field"  value={entry.field}  onChange={e => onEducationChange(entry.id, e)} placeholder="Field of Study"    theme={theme} />
      </div>

      <div className="entry-grid-2">
        <EntryInput name="from" value={entry.from} onChange={e => onEducationChange(entry.id, e)} placeholder="From" theme={theme} />
        <EntryInput name="to"   value={entry.to}   onChange={e => onEducationChange(entry.id, e)} placeholder="To"   theme={theme} />
      </div>

      <button
        type="button"
        onClick={() => onRemoveEducation(entry.id)}
        className="remove-btn"
      >
        — remove
      </button>
    </div>
  );
}

export default EducationEntry;