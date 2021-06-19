<template>
  <div></div>
</template>

<script>
export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',

  middleware: 'auth',
  
  name: "HomePage",
};
</script>
