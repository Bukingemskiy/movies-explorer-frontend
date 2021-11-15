import React from "react";

export default function ValidationForm() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const { value } = input.value;
    const { name } = input.name;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };

  return { values, errors, isValid, handleChange, setValues };
}
