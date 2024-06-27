import React from 'react';

const Button = ({ children, className, onClick, type, ...props}) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
