<template>
  <div class="relative h-[300px] w-full">
    <Bar
      v-if="chartData.labels"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
  CategoryScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
  CategoryScale
)

defineProps({
  chartData: {
    type: Object,
    required: true
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      padding: 12,
      backgroundColor: '#1F2937'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: '#F3F4F6'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  borderRadius: 8
}
</script>
