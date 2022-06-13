import React from 'react';
import Select from 'react-select';

import './city-selector.css';

function CitySelector({ options, onChange, value }: any) {
  let defaultValue = null;

  if (options[value]) {
    defaultValue = options[value];
  }

  return (
    <Select
      className="search-container"
      options={options}
      isSearchable={true}
      defaultValue={defaultValue}
      theme={(theme: any) => ({
        ...theme,
        borderRadius: 3
      })}
      onChange={onChange}
    />
  );
}

export default CitySelector;
