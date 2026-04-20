<template>
  <div class="relative h-[350px] w-full">
    <Line
      :data="formattedData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Filler
);

const props = defineProps({
  labels: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const formattedData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Live User Growth',
      data: props.data,
      borderColor: '#10B981', // Tailwind green-500
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 500, // Smooth transition for real-time
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: '#1F2937',
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        color: '#F3F4F6',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};
</script>
