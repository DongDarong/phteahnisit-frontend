<template>
  <div class="animate-pulse">
    <!-- Breadcrumb Skeleton -->
    <div class="h-4 w-48 rounded bg-gray-200 mb-8"></div>
    
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <!-- Left Column (Gallery + Info) -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Gallery Skeleton -->
        <div class="aspect-[16/9] w-full rounded-2xl bg-gray-200"></div>
        <div class="flex gap-4">
          <div v-for="i in 4" :key="i" class="h-20 w-full rounded-xl bg-gray-200"></div>
        </div>
        
        <!-- Info Skeleton -->
        <div class="space-y-4 pt-4">
          <div class="h-10 w-3/4 rounded bg-gray-200"></div>
          <div class="h-4 w-1/2 rounded bg-gray-200"></div>
          <div class="space-y-2 pt-4">
            <div v-for="i in 4" :key="i" class="h-4 w-full rounded bg-gray-200"></div>
          </div>
        </div>
      </div>

      <!-- Right Column (Sticky Cards) -->
      <div class="space-y-6">
        <div class="h-64 w-full rounded-2xl bg-gray-200"></div>
        <div class="h-80 w-full rounded-2xl bg-gray-200"></div>
      </div>
    </div>
  </div>
</template>
