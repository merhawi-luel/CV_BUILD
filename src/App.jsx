import { useEffect, useRef, useState } from "react";
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
  const [mode, setMode] = useState("edit"); // "edit" | "preview"
  const [leftPanelWidth, setLeftPanelWidth] = useState(420);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 1440 : window.innerWidth
  );
  const resizeStateRef = useRef({ active: false, startX: 0, startWidth: 420 });
  const previewRef = useRef(null);

  const {
    cvData,
    handlePersonalChange,
    handlePersonalFile,
    addEducation,
    removeEducation,
    handleEducationChange,
    addExperience,
    removeExperience,
    handleExperienceChange,
    addSkill,
    removeSkill,
    clearAll,
    loadExample,
  } = useCvData();

  const { handleDownloadCv, isGenerating } = useCvPdfDownload(cvData, previewRef);

  useEffect(() => {
    const handleViewportResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleViewportResize);
    handleViewportResize();

    return () => window.removeEventListener("resize", handleViewportResize);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!resizeStateRef.current.active) return;

      const nextWidth = resizeStateRef.current.startWidth + (event.clientX - resizeStateRef.current.startX);
      const maxLeftWidth = Math.max(340, window.innerWidth - 420);

      setLeftPanelWidth(Math.min(maxLeftWidth, Math.max(340, nextWidth)));
    };

    const stopResize = () => {
      resizeStateRef.current.active = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("pointercancel", stopResize);
    };
  }, []);

  const handleResizePointerDown = (event) => {
    event.preventDefault();

    resizeStateRef.current = {
      active: true,
      startX: event.clientX,
      startWidth: leftPanelWidth,
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const splitterWidth = 14;
  const previewAreaWidth = mode === "edit"
    ? Math.max(0, viewportWidth - leftPanelWidth - splitterWidth - 64)
    : Math.max(0, viewportWidth - 64);
  const previewCardWidth = Math.min(720, Math.max(560, previewAreaWidth));
  const previewScale = previewCardWidth / 720;

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Left: Form Panel (hidden in preview mode) */}
      {mode === "edit" && (
        <div style={{ width: leftPanelWidth, minWidth: 340, flex: '0 0 auto' }}>
          <FormPanel
            cvData={cvData}
            theme={theme}
            onThemeChange={setTheme}
            onPersonalChange={handlePersonalChange}
            onPersonalFile={handlePersonalFile}
            onAddEducation={addEducation}
            onRemoveEducation={removeEducation}
            onEducationChange={handleEducationChange}
            onAddExperience={addExperience}
            onRemoveExperience={removeExperience}
            onExperienceChange={handleExperienceChange}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
            onClearAll={clearAll}
            onLoadExample={loadExample}
          />
        </div>
      )}

      {mode === "edit" && (
        <button
          type="button"
          aria-label="Resize panels"
          onPointerDown={handleResizePointerDown}
          style={{
            flex: '0 0 14px',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'col-resize',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
            position: 'relative',
            outline: 'none',
            touchAction: 'none',
            userSelect: 'none',
          }}
        >
          <span style={{
            position: 'absolute',
            inset: '0',
            margin: 'auto',
            width: '2px',
            height: '76px',
            borderRadius: '999px',
            background: 'rgba(184, 255, 71, 0.7)',
            boxShadow: '0 0 0 1px rgba(184, 255, 71, 0.12), 0 0 18px rgba(184, 255, 71, 0.2)',
          }} />
        </button>
      )}

      {/* Right: Preview Panel */}
      <div style={{
        flex: 1,
        minWidth: 0,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0',
        overflow: 'auto',
        gap: '24px',
      }}>
        {/* Edit / Preview mode toggle */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '16px 0 0',
          background: 'linear-gradient(180deg, #ffffff 60%, rgba(255,255,255,0))',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            gap: 4,
            padding: 4,
            borderRadius: '999px',
            background: '#0a0a0e',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          }}>
            {[
              { key: 'edit', label: 'Edit' },
              { key: 'preview', label: 'Preview' },
            ].map(({ key, label }) => {
              const active = mode === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  style={{
                    border: 'none',
                    borderRadius: '999px',
                    padding: '8px 20px',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    background: active ? '#b8ff47' : 'transparent',
                    color: active ? '#09090e' : '#e8e8f0',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={previewRef} style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)', borderRadius: '2px' }}>
          <CVPreview cvData={cvData} scale={previewScale} width={previewCardWidth} />
        </div>

        {/* Download button */}
        <button
          onClick={handleDownloadCv}
          disabled={isGenerating}
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
          {isGenerating ? 'Generating…' : '↓ Download CV'}
        </button>
      </div>
    </div>
  );
}

export default App;