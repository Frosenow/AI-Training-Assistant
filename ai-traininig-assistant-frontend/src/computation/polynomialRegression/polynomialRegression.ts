import { PolynomialRegression } from 'ml-regression';
import moment from 'moment';

function convertDateToDays(dateString, startDate) {
  if (!dateString) return null; // Handle null values

  const date = moment(dateString, 'DD/MM/YYYY');
  return date.diff(startDate, 'days');
}

// Function to predict data
export const predictData = () => {};

export function predictProgressionData(
  predictionStartPoint,
  progressionDataset,
  predictionEndPoint
) {
  const startDate = moment(predictionStartPoint, 'DD/MM/YYYY');

  // Degree of the polynomial
  const degree = 2;

  const xValues = progressionDataset.timestamp.map((date) =>
    convertDateToDays(date, startDate)
  );
  const yValues = progressionDataset.volume;

  // Creating the regression model and training
  const regression = new PolynomialRegression(xValues, yValues, degree); // Training is done while construction new instance of PolynomialRegression

  const predictedValue = regression.predict(predictionEndPoint);

  return {
    xValue: predictionEndPoint,
    yValue: predictedValue,
  };
}
