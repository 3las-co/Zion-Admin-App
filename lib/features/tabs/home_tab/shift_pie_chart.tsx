import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface ShiftPieChartProps {
  assignedCount: number;
  unassignedCount: number;
}

const ShiftPieChart: React.FC<ShiftPieChartProps> = ({ assignedCount, unassignedCount }) => {
  const data = [
    {
      name: 'Assigned',
      population: assignedCount,
      color: '#6A1B9A', // Purple color
      legendFontColor: '#6A1B9A',
      legendFontSize: 14,
    },
    {
      name: 'Unassigned',
      population: unassignedCount,
      color: '#BDBDBD', // Gray color
      legendFontColor: '#BDBDBD',
      legendFontSize: 14,
    },
  ];

  return (
    <PieChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'16'}
        center={[10, 10]}
        absolute
      />
  );
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

export default ShiftPieChart;