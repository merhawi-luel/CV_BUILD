function CVSkills({ skills }) {
  const visible = skills.filter((s) => String(s || "").trim() !== "");

  if (visible.length === 0) return null;

  return (
    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0e0e8' }}>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#6b21a8',
        marginBottom: '10px',
      }}>
        Skills
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {visible.map((skill) => (
          <span key={skill} style={{
            padding: '4px 12px',
            background: '#f3e8ff',
            border: '1px solid #e9d5ff',
            borderRadius: '20px',
            fontFamily: "'DM Mono', monospace",
            fontSize: '12px',
            color: '#6b21a8',
            lineHeight: 1.4,
          }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CVSkills;