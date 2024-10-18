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

// Sample invoice status data
const invoiceData = [
  { status: 'Approved', count: 80 },
  { status: 'Pending', count: 20 },
];

// Define colors for the statuses
const COLORS = ['#00C49F', '#FF8042']; // Approved - Green, Pending - Orange

const InvoiceStatusPieChart = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
     
      <div className={styles.chartContainer}>
        <PieChart width={400} height={400}>
          <Pie
            data={invoiceData}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={150}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="count"
            nameKey="status"
          >
            {invoiceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      
    </div>
  );
};

export default InvoiceStatusPieChart;
