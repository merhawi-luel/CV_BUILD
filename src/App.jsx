import { useState } from "react";
import FormPanel from "./components/FormPanel/FormPanel";
import CVPreview from "./components/CVPreview/CVPreview";
import { useCvData } from "./hooks/useCvData";
import { useCvPdfDownload } from "./hooks/useCvPdfDownload";

const PREVIEW_BG = {
  dark:  '#e8e8ee',
  grey:  '#e8e8ee',
  white: '#e8e8ee',
  paper: '#e8e8ee',
};

function App() {
  const [theme, setTheme] = useState("dark");

  const {
    cvData,
    handlePersonalChange,
    addEducation,
    removeEducation,
    handleEducationChange,
    addExperience,
    removeExperience,
    handleExperienceChange,
    addSkill,
    removeSkill,
  } = useCvData();

  const { handleDownloadCv } = useCvPdfDownload(cvData);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Left: Form Panel */}
      <FormPanel
        cvData={cvData}
        theme={theme}
        onThemeChange={setTheme}
        onPersonalChange={handlePersonalChange}
        onAddEducation={addEducation}
        onRemoveEducation={removeEducation}
        onEducationChange={handleEducationChange}
        onAddExperience={addExperience}
        onRemoveExperience={removeExperience}
        onExperienceChange={handleExperienceChange}
        onAddSkill={addSkill}
        onRemoveSkill={removeSkill}
      />

      {/* Right: Preview Panel */}
      <div style={{
        flex: 1,
        background: PREVIEW_BG[theme],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '40px 40px 40px',
        overflowY: 'auto',
        gap: '24px',
      }}>
        <CVPreview cvData={cvData} />

        {/* Download button */}
        <button
          onClick={handleDownloadCv}
          style={{
            background: '#0a0a0e',
            color: '#ffffff',
            border: 'none',
            borderRadius: '30px',
            padding: '13px 32px',
            fontFamily: "'DM Mono', monospace",
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            cursor: 'pointer',
            boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
            transition: 'transform 0.15s, box-shadow 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
          }}
        >
          ↓ Download CV
        </button>
      </div>
    </div>
  );
}

export default App;