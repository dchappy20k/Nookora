import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded focus:outline-none uppercase tracking-wider select-none';

  const sizeStyles = {
    sm: 'text-[11px] px-3 py-1.5 gap-1.5',
    md: 'text-xs px-5 py-2.5 gap-2',
    lg: 'text-xs px-7 py-3.5 gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#D8C19A] text-[#111714] font-semibold hover:bg-[#B89565] hover:text-[#111714] shadow-md shadow-black/30',
    secondary:
      'bg-[#202A24] text-[#F2EFE7] border border-[rgba(216,193,154,0.2)] hover:border-[#D8C19A] hover:bg-[#252F29]',
    ghost:
      'bg-transparent text-[#F2EFE7] hover:bg-[rgba(216,193,154,0.08)] hover:text-[#D8C19A]',
    outline:
      'bg-transparent text-[#F2EFE7] border border-[rgba(216,193,154,0.3)] hover:border-[#D8C19A] hover:bg-[rgba(216,193,154,0.08)] hover:text-[#D8C19A]',
    text:
      'bg-transparent text-[#D8C19A] hover:text-[#f5ddb4] underline underline-offset-4 decoration-[#D8C19A]/40 hover:decoration-[#D8C19A] p-0',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
