import React from 'react';

const InputFormulario = ({ type, placeholder, value, onChange, required }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default InputFormulario;