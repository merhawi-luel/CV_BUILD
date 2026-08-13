import { useRef } from "react";

const THEMES = {
  dark:  { inputBg: '#111118', inputBorder: '#242432', text: '#e8e8f0', label: '#b8ff47' },
  grey:  { inputBg: '#e8e8f0', inputBorder: '#c8c8d8', text: '#1a1a2e', label: '#6b21a8' },
  white: { inputBg: '#f4f4f8', inputBorder: '#d0d0dc', text: '#1a1a2e', label: '#6b21a8' },
  paper: { inputBg: '#ede8e0', inputBorder: '#c8bfb0', text: '#1a1a2e', label: '#6b21a8' },
};

function FormInput({ name, value, onChange, placeholder, theme }) {
  const t = THEMES[theme] || THEMES.dark;
  const ref = useRef(null);
  return (
    <input
      ref={ref}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '9px 12px',
        borderRadius: '8px',
        border: `1px solid ${t.inputBorder}`,
        background: t.inputBg,
        color: t.text,
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        outline: 'none',
        transition: 'border-color 0.15s',
        boxSizing: 'border-box',
      }}
      onFocus={e => (e.target.style.borderColor = '#b8ff47')}
      onBlur={e => (e.target.style.borderColor = t.inputBorder)}
    />
  );
}

function PersonalForm({ personal, onPersonalChange, theme = 'dark' }) {
  const t = THEMES[theme] || THEMES.dark;

  return (
    <section>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: t.label,
        marginBottom: '12px',
      }}>
        Personal Info
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <FormInput name="name"     value={personal.name}     onChange={onPersonalChange} placeholder="Full Name"  theme={theme} />
        <FormInput name="email"    value={personal.email}    onChange={onPersonalChange} placeholder="Email"      theme={theme} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <FormInput name="phone"    value={personal.phone}    onChange={onPersonalChange} placeholder="Phone"    theme={theme} />
          <FormInput name="location" value={personal.location} onChange={onPersonalChange} placeholder="Location" theme={theme} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <FormInput name="linkedin" value={personal.linkedin} onChange={onPersonalChange} placeholder="LinkedIn" theme={theme} />
          <FormInput name="github"   value={personal.github}   onChange={onPersonalChange} placeholder="GitHub"   theme={theme} />
        </div>
      </div>
    </section>
  );
}

export default PersonalForm;