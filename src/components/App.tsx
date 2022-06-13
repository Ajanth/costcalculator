import React, { useState } from 'react';

import EditHome from './edit-home/edit-home';

let transportExpenditurePerMonth = 70;

let groceriesPerMonthPerPerson = 170;
let groceriesPerMonthPerExtraPerson = 0.3;

let otherExpensesPerPerson = 200;
let otherExpensesPerExtraPerson = 0.35;

let internetCharges = 30;
let radioCharges = 17;

const cityExpenditure = {
  Aachen: {
    averageRent: 635
  },
  Augsburg: {
    averageRent: 613.57
  },
  Berlin: {
    averageRent: 790
  },
  Bochum: {
    averageRent: 600
  },
  Bonn: {
    averageRent: 650
  },
  Cologne: {
    averageRent: 800
  },
  Dresden: {
    averageRent: 500
  },
  Frankfurt: {
    averageRent: 870
  },
  Hamburg: {
    averageRent: 868
  },
  Leipzig: {
    averageRent: 500
  },
  Mainz: {
    averageRent: 650
  },
  Munich: {
    averageRent: 1100
  },
  Stuttgart: {
    averageRent: 850
  }
};

function useCity(initialValue: any) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: any) {
    setValue(e.value);
  }

  return {
    value,
    onChangeCity: handleChange
  };
}

export const App = () => {
  const options = [
    {
      value: 'Frankfurt',
      label: 'Frankfurt'
    },
    {
      value: 'Berlin',
      label: 'Berlin'
    },
    {
      value: 'Hamburg',
      label: 'Hamburg'
    },
    {
      value: 'Mainz',
      label: 'Mainz'
    },
    {
      value: 'Leipzig',
      label: 'Leipzig'
    },
    {
      value: 'Dresden',
      label: 'Dresden'
    },
    {
      value: 'Cologne',
      label: 'Cologne'
    },
    {
      value: 'Bonn',
      label: 'Bonn'
    },
    {
      value: 'Bochum',
      label: 'Bochum'
    },
    {
      value: 'Augsburg',
      label: 'Augsburg'
    },
    {
      value: 'Aachen',
      label: 'Aachen'
    },
    {
      value: 'Munich',
      label: 'Munich'
    },
    {
      value: 'Stuttgart',
      label: 'Stuttgart'
    }
  ];

  const home = useCity(null);

  const [salary, updateSalary] = useState('');
  const [pCount, updatePCount] = useState(1);
  const [currency, updateCurrency] = useState('€');
  const [showResults, updateShowResults] = useState(false);
  const [results, updateResults] = useState({
    targetCity: '',
    tax: 0,
    healthInsurance: 0
  });

  const onSubmit = data => {
    console.log('onSubmit called');

    const reductions = calculateTaxAndHealthInsurance(data.salary);
    const netIncomePerYear =
      data.salary - (reductions.healthInsurance + reductions.tax);

    const expenseData = calculateExpenses(data.city, data.pCount);

    const netIncomePerMonth = netIncomePerYear / 12;

    updateResults(prev => ({
      ...prev,
      targetCity: data.city,
      tax: Math.floor(reductions.tax),
      healthInsurance: Math.floor(reductions.healthInsurance),
      netIncomePerYear: Math.floor(netIncomePerYear),
      netIncomePerMonth: Math.floor(netIncomePerMonth),
      expenseData
    }));
    console.log(`results: ${JSON.stringify(results)}`);
  };

  const calculateExpenses = (city, numPersons) => {
    const rent = cityExpenditure[city].averageRent;
    let groceryExpenses = groceriesPerMonthPerPerson;
    let otherExpenses = otherExpensesPerPerson;

    let totalExpenses = transportExpenditurePerMonth + rent;

    const numExtraPersons = numPersons - 1;
    if (numPersons > 1) {
      groceryExpenses +=
        groceriesPerMonthPerPerson *
        (groceriesPerMonthPerExtraPerson * numExtraPersons);
      otherExpenses +=
        otherExpensesPerPerson *
        (otherExpensesPerExtraPerson * numExtraPersons);
    }
    totalExpenses += groceryExpenses + otherExpenses;
    totalExpenses += internetCharges + radioCharges;

    return {
      totalExpenses: Math.floor(totalExpenses),
      rent: Math.floor(rent),
      groceryExpenses: Math.floor(groceryExpenses),
      otherExpenses: Math.floor(otherExpenses),
      internetCharges: Math.floor(internetCharges),
      radioCharges: Math.floor(radioCharges)
    };
  };

  const calculateTaxAndHealthInsurance = salary => {
    let insurancePercent = 0;
    let taxPercent = 0.2142;
    switch (salary) {
      case salary <= 20000:
        insurancePercent = 0.0942;
        taxPercent = 0.1104;
        break;
      case salary <= 30000:
        insurancePercent = 0.0944;
        taxPercent = 0.1673;
        break;
      case salary <= 60000:
        insurancePercent = 0.0969;
        taxPercent = 0.2142;
        break;
      case salary <= 90000:
        insurancePercent = defaultInsurancePercent(salary);
        taxPercent = 0.2142;
        break;
      case salary <= 150000:
        insurancePercent = defaultInsurancePercent(salary);
        taxPercent = 0.2377;
        break;
      default:
        insurancePercent = defaultInsurancePercent(salary);
        taxPercent = 0.2655;
        break;
    }
    return {
      tax: salary * taxPercent,
      healthInsurance: salary * insurancePercent
    };
  };

  const defaultInsurancePercent = salary => {
    let insurancePerYear = 468 * 12;
    return insurancePerYear / salary;
  };

  return (
    <EditHome
      className="app"
      currency={currency}
      options={options}
      salary={salary}
      updateCurrency={updateCurrency}
      pCount={pCount}
      updatePCount={updatePCount}
      updateSalary={updateSalary}
      onSubmit={onSubmit}
      results={results}
      showResults={showResults}
      updateShowResults={updateShowResults}
      {...home}
    />
  );
};
