import './Input.css';

export default function Input({ label, error, type = 'text', className = '', ...props }) {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      {type === 'textarea' ? (
        <textarea className={`input-field input-textarea ${error ? 'input-field--error' : ''}`} {...props} />
      ) : (
        <input type={type} className={`input-field ${error ? 'input-field--error' : ''}`} {...props} />
      )}
      {error && <span className="input-error">{error}</span>}
    </div>
  );
}

export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <select className={`input-field input-select ${error ? 'input-field--error' : ''}`} {...props}>
        {children}
      </select>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
}