<template>
  <div>
    <!-- change nullish to logical or
      because param id is always povided in optional param -->
    <h1>{{ $route.params.id || 'User' }} Detail</h1>
  </div>
</template>