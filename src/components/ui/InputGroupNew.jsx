// 03/01

import React from "react";

export const InputGroupNew = ({
  containerClasses = "col-md-6 mb-3",
  label = "",
  type = "text",
  name = "",
  value = "",
  onChange = () => {},
  required = false,
}) => {
  return (
    <div className={containerClasses}>
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        type={type}
        placeholder={label}
        name={name}
        autoComplete="true"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
