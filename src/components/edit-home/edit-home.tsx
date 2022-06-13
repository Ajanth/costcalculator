import React from 'react';

import CitySelector from '../city-selector/city-selector';
import CurrencySelector from '../currency-selector/currency-selector';
import NumericInput from 'react-numeric-input';
import cost from './cost.png';

import './edit-home.css';
import ResultsContainer from '../results-container/results-container';
// import InfoModal from '../info-modal/info-modal';

function EditHome({
  options,
  onChangeCity,
  value,
  currency,
  updateCurrency,
  salary,
  updateSalary,
  pCount,
  updatePCount,
  onSubmit,
  showResults,
  results,
  updateShowResults
}: any) {
  let isDisabled = true;

  if (value !== null && salary !== '') {
    isDisabled = false;
  }

  // const [infoModalOpen, updateInfoModalOpen] = useState(false);

  // function openModal() {
  //   updateInfoModalOpen(true);
  // }

  // function closeModal() {
  //   updateInfoModalOpen(false);
  // }

  return (
    <div className={`container ${showResults ? '' : 'reverse'} `}>
      <div className="form-container">
        <div className="form">
          <div className="form-cell">
            <label className="control-label">Select City</label>
            <CitySelector
              options={options}
              onChange={onChangeCity}
              value={value}
            />
          </div>
          <div className="form-cell">
            <label className="control-label">Annual Salary</label>
            <div className="salary-inputs">
              <CurrencySelector value={currency} onChange={updateCurrency} />
              <input
                className="form-control"
                type="text"
                placeholder="e.g. 25,000"
                value={salary}
                pattern="\d*"
                onChange={e => {
                  const re = /^[0-9\b]+$/;

                  const value = e.target.value.replace(/,/g, '');

                  if (value === '' || re.test(value)) {
                    updateSalary(value);
                  }
                }}
              />
            </div>
          </div>

          <div className="form-cell small-width">
            <label className="control-label">Number of People</label>
            <NumericInput
              mobile
              className="form-control number-control"
              value={pCount}
              onChange={updatePCount}
              min={1}
              max={5}
              size={5}
            />
          </div>
        </div>
        <div className="actions">
          <button
            disabled={isDisabled}
            type="button"
            onClick={e => {
              onSubmit({
                city: value, // city
                salary,
                pCount,
                currency
              });
              updateShowResults(true);
            }}
            className="primary-btn"
          >
            Calculate
          </button>
        </div>
      </div>
      {!showResults && (
        <div className="hero-container">
          <img src={cost} className="wallet-hero" />
        </div>
      )}

      {showResults && <ResultsContainer data={results} />}

      {/* <div>
        <button onClick={openModal}>Open Modal</button>
        <InfoModal infoModalOpen={infoModalOpen} closeModal={closeModal} />
      </div> */}
    </div>
  );
}

export default EditHome;
