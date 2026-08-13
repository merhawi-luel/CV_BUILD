import EducationEntry from "./EducationEntry";

const THEMES = {
  dark:  { label: '#b8ff47', border: '#242432' },
  grey:  { label: '#6b21a8', border: '#c8c8d8' },
  white: { label: '#6b21a8', border: '#d0d0dc' },
  paper: { label: '#6b21a8', border: '#c8bfb0' },
};

function EducationForm({ education, onAddEducation, onRemoveEducation, onEducationChange, theme = 'dark' }) {
  const t = THEMES[theme] || THEMES.dark;
  const textColor = theme === 'dark' ? '#e8e8f0' : '#1a1a2e';

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
        Education
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {education.map((entry) => (
          <EducationEntry
            key={entry.id}
            entry={entry}
            onRemoveEducation={onRemoveEducation}
            onEducationChange={onEducationChange}
            theme={theme}
          />
        ))}

        <button
          type="button"
          onClick={onAddEducation}
          style={{
            width: '100%',
            background: 'transparent',
            border: `1px dashed ${t.border}`,
            borderRadius: '8px',
            padding: '10px',
            color: textColor,
            opacity: 0.6,
            fontFamily: "'DM Mono', monospace",
            fontSize: '12px',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            transition: 'opacity 0.15s, border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.borderColor = '#b8ff47';
            e.currentTarget.style.color = '#b8ff47';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '0.6';
            e.currentTarget.style.borderColor = t.border;
            e.currentTarget.style.color = textColor;
          }}
        >
          + Add Education
        </button>
      </div>
    </section>
  );
}

export default EducationForm;