import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Button, makeStyles } from '@fluentui/react-components';

// Styles
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    padding: '20px',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: '20px 0',
  },
});

// Sample data
const data = [
  { poNumber: 'PO-13466', openPOs: 25 },
  { poNumber: 'PO-13467', openPOs: 40 },
  { poNumber: 'PO-13468', openPOs: 30 },
  { poNumber: 'PO-13469', openPOs: 20 },
  { poNumber: 'PO-13470', openPOs: 15 },
  { poNumber: 'PO-13471', openPOs: 50 },
];

// Function to generate random colors
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Create an array of random colors based on the data length
const generateColors = (dataLength) => {
  return Array.from({ length: dataLength }, () => getRandomColor());
};

const DonutChartPage = () => {
  const styles = useStyles();

  // Dynamically generate colors based on the number of POs
  const colors = generateColors(data.length);

  return (
    <div className={styles.root}>
    
      <div className={styles.chartContainer}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={150}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="openPOs"
            nameKey="poNumber"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      
    </div>
  );
};

export default DonutChartPage;
