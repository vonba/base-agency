import { useState } from 'react';

export default function useForm(defaults) {
  // Hook into state
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // Do we need to convert to number?
    let { value, type } = e.target;
    if (e.target.value === 'number') {
      // To allow floats we would need an additional check (step?)
      value = parseInt(value);
    }
    if (type === 'checkbox') {
      value = e.target.checked;
    }
    // Push to state
    setValues({
      // The existing form (state) values
      ...values,
      // The value that changed
      [e.target.name]: value,
    });
  }

  function clearForm() {
    setValues(defaults);
  }

  return { values, updateValue, clearForm };
}
