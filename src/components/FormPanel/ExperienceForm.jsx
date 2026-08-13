import ExperienceEntry from "./ExperienceEntry";
import "../styles/FormPanel.css";

const THEMES = {
  dark:  { label: '#b8ff47', border: '#242432' },
  grey:  { label: '#6b21a8', border: '#c8c8d8' },
  white: { label: '#6b21a8', border: '#d0d0dc' },
  paper: { label: '#6b21a8', border: '#c8bfb0' },
};

function ExperienceForm({ experience, onAddExperience, onRemoveExperience, onExperienceChange, theme = 'dark' }) {
  const t = THEMES[theme] || THEMES.dark;
  const textColor = theme === 'dark' ? '#e8e8f0' : '#1a1a2e';

  return (
    <section className="section">
      <div className="section-label">Work Experience</div>

      <div className="section-content">
        {experience.map((entry) => (
          <ExperienceEntry
            key={entry.id}
            entry={entry}
            onRemoveExperience={onRemoveExperience}
            onExperienceChange={onExperienceChange}
            theme={theme}
          />
        ))}

        <button
          type="button"
          onClick={onAddExperience}
          className="dashed-button"
        >
          + Add Experience
        </button>
      </div>
    </section>
  );
}

export default ExperienceForm;
