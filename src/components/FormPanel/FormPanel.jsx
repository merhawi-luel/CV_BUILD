import PersonalForm from "./PersonalForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import "../styles/FormPanel.css";

const THEMES = {
  dark:  { panel: '#09090e', border: '#1e1e2e' },
  grey:  { panel: '#f0f0f4', border: '#dddde8' },
  white: { panel: '#ffffff', border: '#e0e0e8' },
  paper: { panel: '#f5f0e8', border: '#d8cfc0' },
};

function FormPanel({
  cvData,
  theme = 'dark',
  onThemeChange,
  onPersonalChange,
  onPersonalFile,
  onAddEducation, onRemoveEducation, onEducationChange,
  onAddExperience, onRemoveExperience, onExperienceChange,
  onAddSkill, onRemoveSkill,
  onClearAll,
  onLoadExample,
}) {
  const t = THEMES[theme] || THEMES.dark;
  const isDark = theme === 'dark';
  const accent = '#b8ff47';
  const textColor = isDark ? '#e8e8f0' : '#1a1a2e';
  const subtleColor = isDark ? '#9090a8' : '#6b7280';

  const cssVars = {
    '--panel': t.panel,
    '--border': t.border,
    '--text-color': textColor,
    '--subtle': subtleColor,
    '--accent': '#b8ff47',
    '--remove': '#ef4444',
    '--remove-border': '#3f1717',
    '--input-bg': theme === 'dark' ? '#111118' : theme === 'grey' ? '#e8e8f0' : theme === 'white' ? '#f4f4f8' : '#ede8e0',
    '--input-border': theme === 'dark' ? '#242432' : theme === 'grey' ? '#c8c8d8' : theme === 'white' ? '#d0d0dc' : '#c8bfb0',
    '--card-bg': theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
    '--card-border': theme === 'dark' ? '#242432' : theme === 'grey' ? '#c8c8d8' : theme === 'white' ? '#d0d0dc' : '#c8bfb0',
    '--chip-bg': theme === 'dark' ? 'rgba(184,255,71,0.1)' : '#f3e8ff',
    '--chip-border': theme === 'dark' ? 'rgba(184,255,71,0.25)' : '#e9d5ff',
    '--chip-text': theme === 'dark' ? '#b8ff47' : '#6b21a8',
    '--label': theme === 'dark' ? '#b8ff47' : '#6b21a8',
    '--accent-contrast': '#09090e',
    '--brand-mark': isDark ? accent : '#6b21a8',
  };

  return (
    <div className="form-root" style={cssVars}>

      {/* Brand header */}
      <div className="brand-header">
        <div className="brand-title">
          <span className="brand-mark">cv/</span>
          <span className="brand-name">builder</span>
        </div>
        <p className="brand-sub">fill in the form — preview updates live</p>

        {/* Theme switcher */}
        <div className="theme-switcher">
          {['dark', 'grey', 'white', 'paper'].map((key) => {
            const active = theme === key;
            return (
              <button
                key={key}
                onClick={() => onThemeChange?.(key)}
                className={`theme-btn ${active ? 'active' : ''}`}
              >
                {key}
              </button>
            );
          })}
        </div>

        {/* Clear / Load actions */}
        <div className="form-actions">
          <button
            type="button"
            className="action-btn"
            onClick={onClearAll}
          >
            Clear All
          </button>
          <button
            type="button"
            className="action-btn action-btn-primary"
            onClick={onLoadExample}
          >
            Load Example
          </button>
        </div>
      </div>

      {/* Scrollable form sections */}
      <div className="form-scroll">
        <PersonalForm
          personal={cvData.personal}
          onPersonalChange={onPersonalChange}
          onPersonalFile={onPersonalFile}
          theme={theme}
        />
        <EducationForm
          education={cvData.education}
          onAddEducation={onAddEducation}
          onRemoveEducation={onRemoveEducation}
          onEducationChange={onEducationChange}
          theme={theme}
        />
        <ExperienceForm
          experience={cvData.experience}
          onAddExperience={onAddExperience}
          onRemoveExperience={onRemoveExperience}
          onExperienceChange={onExperienceChange}
          theme={theme}
        />
        <SkillsForm
          skills={cvData.skills}
          onAddSkill={onAddSkill}
          onRemoveSkill={onRemoveSkill}
          theme={theme}
        />
        <div className="spacer-8" />
      </div>
    </div>
  );
}

export default FormPanel;