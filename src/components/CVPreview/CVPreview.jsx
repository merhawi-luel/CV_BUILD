
import CVHeader from "./CVHeader";
import CVEducation from "./CVEducation";
import CVExperience from "./CVExperience";
import CVSkills from "./CVSkills";

function CVPreview({ cvData, scale = 1, width = 720 }) {
  const px = (value) => `${Math.round(value * scale)}px`;
  const { email = "", phone = "" } = cvData.personal || {};

  const footerItems = [
    email && {
      icon: (
        <svg width={px(15)} height={px(15)} viewBox="0 0 24 24" fill="none" stroke="#1a3658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      value: email,
    },
    phone && {
      icon: (
        <svg width={px(15)} height={px(15)} viewBox="0 0 24 24" fill="none" stroke="#1a3658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      value: phone,
    },
  ].filter(Boolean);

  return (
    <div style={{
      width: `${width}px`,
      height: 'auto',
      // One long sheet: at least one A4 page tall, grows with content.
      minHeight: `${Math.round((width * 297) / 210)}px`,
      display: 'flex',
      flexDirection: 'column',
      background: '#ffffff',
      padding: `${Math.round(48 * scale)}px ${Math.round(52 * scale)}px`,
      fontFamily: "'Inter', sans-serif",
      color: '#111827',
      borderRadius: '2px',
      boxSizing: 'border-box',
    }}>
      <CVHeader personal={cvData.personal} scale={scale} />
      <CVEducation education={cvData.education} scale={scale} />
      <CVExperience experience={cvData.experience} scale={scale} />
      <CVSkills skills={cvData.skills} scale={scale} />

      {footerItems.length > 0 && (
        <div style={{
          // Pins the footer to the bottom of the sheet; grows with content.
          marginTop: 'auto',
          paddingTop: px(14),
          borderTop: `${Math.max(1, Math.round(2 * scale))}px solid #1a3658`,
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: px(24),
        }}>
          {footerItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: px(8) }}>
              {item.icon}
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(13), color: '#374151' }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CVPreview;