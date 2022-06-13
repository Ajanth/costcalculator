import React from 'react';

import './results-container.css';

// data: {
//   "targetCity": "Berlin",
//   "tax": 18585,
//   "healthInsurance": 5616,
//   "netIncomePerYear": 45799,
//   "netIncomePerMonth": 3816.5833333333335,
//   "expenseData": {
//     "totalExpenses": 1277,
//     "rent": 790,
//     "groceryExpenses": 170,
//     "otherExpenses": 200,
//     "internetCharges": 30,
//     "radioCharges": 17
//   }
// }

function ResultsContainer({ data }: any) {
  console.log(`data: ${JSON.stringify(data, null, 2)}`);
  return (
    <div className="results-container">
      <div className="sub-header">
        <span>Salary Breakdown (Approximate)</span>
      </div>
      <div className="salary-breakdown">
        <div className="row-item">
          <span>Tax:</span>
          <span>{data.tax}</span>
        </div>
        <div className="row-item">
          <span>Statutory Health Insurance:</span>
          <span>{data.healthInsurance}</span>
        </div>
        <div className="row-item">
          <span>Net Income (per year):</span>
          <span>{data.netIncomePerYear}</span>
        </div>
        <div className="row-item">
          <span>Net Income (per month):</span>
          <span>
            <b>{data.netIncomePerMonth}</b>
          </span>
        </div>
      </div>
      <hr />
      <div className="sub-header">
        <span>Cost of Living in {data.targetCity}</span>
      </div>
      <div className="expense-breakdown">
        <div className="row-item">
          <span>Average Rent:</span>
          <span>{data.expenseData.rent}</span>
        </div>
        <div className="row-item">
          <span>Grocery Expenses:</span>
          <span>{data.expenseData.groceryExpenses}</span>
        </div>
        <div className="row-item">
          <span>Other Expenses:</span>
          <span>{data.expenseData.otherExpenses}</span>
        </div>
        <div className="row-item">
          <span>Internet:</span>
          <span>{data.expenseData.internetCharges}</span>
        </div>
        <div className="row-item">
          <span>ARD Radio:</span>
          <span>{data.expenseData.radioCharges}</span>
        </div>
        <hr />
        <div className="row-item">
          <span>Total Expenses Per Month:</span>
          <span>
            <b>{data.expenseData.totalExpenses}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ResultsContainer;
