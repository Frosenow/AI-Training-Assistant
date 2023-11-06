import { useState } from 'react';
import Radar from 'react-d3-radar';

const SpiderChart = ({ variables, options }) => {
  const [chartData, setChartData] = useState({
    variables: [...variables],
    sets: [...options],
  });

  const maxValues = options.reduce((max, option) => {
    const optionMax = Math.max(...Object.values(option.values));
    return optionMax > max ? optionMax : max;
  }, -Infinity);

  return (
    <Radar
      width={250}
      height={250}
      padding={50}
      domainMax={maxValues + 1}
      data={{
        variables: chartData.variables,
        sets: chartData.sets,
      }}
    />
  );
};

export default SpiderChart;
