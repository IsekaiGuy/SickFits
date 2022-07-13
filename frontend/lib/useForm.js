import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { name, type, value } = e.target;

    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({ ...inputs, [name]: name === 'price' ? +value : value });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.entries(inputs).map(([key, value]) => [key, '']);
    setInputs(Object.fromEntries(blankState));
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
