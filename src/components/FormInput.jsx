import React from "react";

const FormInput = ({ type, name, label, defaultValue, size }) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
      />
    </label>
  );
};

export default FormInput;
