import React from 'react';
import Select from 'react-select';

import './currency-selector.css';

function CurrencySelector({ onChange, value }: any) {
  const options = [
    { label: '£', value: '£' },
    { label: '$', value: '$' },
    { label: '€', value: '€' }
  ];

  const defaultValue = {
    label: value,
    value
  };

  return (
    <Select
      className="currency-container"
      options={options}
      defaultValue={defaultValue}
      theme={(theme: any) => ({
        ...theme,
        borderRadius: 3
      })}
      onChange={({ value }: any) => {
        onChange(value);
      }}
    />
  );
}

export default CurrencySelector;
