// 03/01

import React from "react";

export const InputGroup = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete="true"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
