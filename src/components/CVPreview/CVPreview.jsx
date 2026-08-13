import CVHeader from "./CVHeader";
import CVEducation from "./CVEducation";
import CVExperience from "./CVExperience";
import CVSkills from "./CVSkills";

function CVPreview({ cvData }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: '680px',
      minHeight: '880px',
      background: '#ffffff',
      boxShadow: '0 4px 40px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
      padding: '56px 60px',
      fontFamily: "'Inter', sans-serif",
      color: '#111111',
      borderRadius: '2px',
      boxSizing: 'border-box',
    }}>
      <CVHeader personal={cvData.personal} />
      <CVEducation education={cvData.education} />
      <CVExperience experience={cvData.experience} />
      <CVSkills skills={cvData.skills} />
    </div>
  );
}

export default CVPreview;
