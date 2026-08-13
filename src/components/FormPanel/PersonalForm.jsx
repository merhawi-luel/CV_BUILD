import { useRef } from "react";
import "../styles/FormPanel.css";

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
      className="entry-input"
      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
      onBlur={e => (e.target.style.borderColor = '')}
    />
  );
}

function PersonalForm({ personal, onPersonalChange, onPersonalFile, theme = 'dark' }) {
  const t = THEMES[theme] || THEMES.dark;

  return (
    <section className="section">
      <div className="section-label">Personal Info</div>

      <div className="section-stack">
        <FormInput name="name"     value={personal.name}     onChange={onPersonalChange} placeholder="Full Name"  theme={theme} />
        <FormInput name="email"    value={personal.email}    onChange={onPersonalChange} placeholder="Email"      theme={theme} />
        <div className="entry-grid-2">
          <FormInput name="phone"    value={personal.phone}    onChange={onPersonalChange} placeholder="Phone"    theme={theme} />
          <FormInput name="location" value={personal.location} onChange={onPersonalChange} placeholder="Location" theme={theme} />
        </div>
        <div className="entry-grid-2">
          <FormInput name="linkedin" value={personal.linkedin} onChange={onPersonalChange} placeholder="LinkedIn" theme={theme} />
          <FormInput name="github"   value={personal.github}   onChange={onPersonalChange} placeholder="GitHub"   theme={theme} />
        </div>
        <div>
          <div className="section-label" style={{ marginBottom: 8 }}>About</div>
          <textarea
            name="description"
            placeholder="A short description about you"
            value={personal.description || ''}
            onChange={onPersonalChange}
            className="entry-textarea"
            rows={4}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.target.style.borderColor = '')}
          />
        </div>

        <div>
  <label style={{
    display: 'block',
    fontFamily: "'DM Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: t.label,
    marginBottom: '6px',
  }}>
    Photo (optional)
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={e => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => onPersonalChange({
        target: { name: 'photo', value: ev.target.result }
      });
      reader.readAsDataURL(file);
    }}
    style={{
      width: '100%',
      padding: '8px 10px',
      borderRadius: '7px',
      border: `1px solid ${t.inputBorder}`,
      background: t.inputBg,
      color: t.text,
      fontFamily: "'Inter', sans-serif",
      fontSize: '12px',
      cursor: 'pointer',
      boxSizing: 'border-box',
    }}
  />
</div>
      </div>
    </section>
  );
}

export default PersonalForm;