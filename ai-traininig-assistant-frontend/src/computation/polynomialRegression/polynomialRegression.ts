import { PolynomialRegression } from 'ml-regression';
import moment from 'moment';

function convertDateToDays(dateString, startDate) {
  if (!dateString) return null; // Handle null values

  const date = moment(dateString, 'DD/MM/YYYY');
  return date.diff(startDate, 'days');
}

function convertDaysToDate(predictedDays, startDate) {
  return moment(startDate, 'DD/MM/YYYY')
    .add(predictedDays, 'days')
    .format('DD/MM/YYYY');
}

export function predictProgressionData(progressionDataset, predictionSpan) {
  const { timestamp, volume } = progressionDataset;

  const startDate = moment(timestamp[0], 'DD/MM/YYYY');

  // Degree of the polynomial, first = linear regression
  const degree = 1;

  const xValues = timestamp.map((date) => convertDateToDays(date, startDate));
  const yValues = volume;

  // Creating the regression model and training
  const regression = new PolynomialRegression(xValues, yValues, degree); // Training is done while construction new instance of PolynomialRegression

  const predictedDate = xValues[xValues.length - 1] + predictionSpan;

  const predictedValue = regression.predict(predictedDate);

  const predictedValueDateFormat = convertDaysToDate(
    predictionSpan,
    timestamp[timestamp.length - 1]
  );

  return {
    xValue: predictedValueDateFormat,
    yValue: predictedValue,
  };
}
