import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const Apexchart = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [44, 15], 
    chart: {
      type: 'donut',
      width: 250,
      height: 250,
    },
    labels: ['Allotted Leaves', 'Available Leaves'],
    colors: ['#D4BDAC', '#536493'],
    legend: {
      fontSize: '10px',
      position: 'bottom',
      offsetY: 0,
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (val) => `${val}%`,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
            height: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  return (
    <div id="reportsChart">
      <ApexCharts options={chartOptions} series={chartOptions.series} type="donut" height={230} width={230} />
    </div>
  );
};

export default Apexchart;
