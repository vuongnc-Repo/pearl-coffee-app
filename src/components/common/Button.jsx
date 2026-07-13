import './Button.css';

export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled, type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}