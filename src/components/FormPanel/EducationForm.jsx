import EducationEntry from "./EducationEntry";
import "../styles/FormPanel.css";

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
    <section className="section">
      <div className="section-label">Education</div>

      <div className="section-content">
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
          className="dashed-button"
        >
          + Add Education
        </button>
      </div>
    </section>
  );
}

export default EducationForm;