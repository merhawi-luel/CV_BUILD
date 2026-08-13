function CVSkills({ skills, scale = 1 }) {
  const px = (value) => `${Math.round(value * scale)}px`;
  const visible = skills.filter((s) => String(s || '').trim() !== '');
  if (visible.length === 0) return null;

  return (
    <div style={{ marginBottom: px(20) }}>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: px(13),
        fontWeight: 800,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#1a3658',
        borderBottom: `${Math.max(1, Math.round(2 * scale))}px solid #1a3658`,
        paddingBottom: px(4),
        marginBottom: px(12),
      }}>
        Additional Information
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: px(6) }}>
        {visible.map((skill) => (
          <span key={skill} style={{
            padding: `${Math.round(4 * scale)}px ${Math.round(12 * scale)}px`,
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: px(4),
            fontFamily: "'Inter', sans-serif",
            fontSize: px(12.5),
            color: '#1a3658',
            fontWeight: 500,
          }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CVSkills;
