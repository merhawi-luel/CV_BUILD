import PersonalForm from "./PersonalForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";

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
  onAddEducation, onRemoveEducation, onEducationChange,
  onAddExperience, onRemoveExperience, onExperienceChange,
  onAddSkill, onRemoveSkill,
}) {
  const t = THEMES[theme] || THEMES.dark;
  const isDark = theme === 'dark';
  const accent = '#b8ff47';
  const textColor = isDark ? '#e8e8f0' : '#1a1a2e';
  const subtleColor = isDark ? '#9090a8' : '#6b7280';

  return (
    <div style={{
      width: '420px',
      minWidth: '340px',
      height: '100vh',
      background: t.panel,
      borderRight: `1px solid ${t.border}`,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', sans-serif",
      color: textColor,
      transition: 'background 0.2s, color 0.2s',
      flexShrink: 0,
    }}>

      {/* Brand header */}
      <div style={{
        padding: '20px 24px 16px',
        borderBottom: `1px solid ${t.border}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '3px' }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '20px',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: isDark ? accent : '#6b21a8',
          }}>cv/</span>
          <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.01em' }}>builder</span>
        </div>
        <p style={{
          margin: '0 0 14px',
          fontFamily: "'DM Mono', monospace",
          fontSize: '11px',
          color: subtleColor,
          letterSpacing: '0.02em',
        }}>
          fill in the form — preview updates live
        </p>

        {/* Theme switcher */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['dark', 'grey', 'white', 'paper'].map((key) => {
            const active = theme === key;
            return (
              <button
                key={key}
                onClick={() => onThemeChange?.(key)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  padding: '5px 13px',
                  borderRadius: '20px',
                  border: `1px solid ${active ? accent : t.border}`,
                  background: active ? accent : 'transparent',
                  color: active ? '#09090e' : textColor,
                  cursor: 'pointer',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable form sections */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}>
        <PersonalForm
          personal={cvData.personal}
          onPersonalChange={onPersonalChange}
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
        <div style={{ height: '8px' }} />
      </div>
    </div>
  );
}

export default FormPanel;