<template>
  <div class="generic-avatar">
    <figure class="is-128x128">
      <router-link :to="profilePath">
        <img class="avatar-image" :src="avatarSrc" :alt="`${name} avatar`" />
      </router-link>
    </figure>
  </div>
</template>

<script>
  export default {
    name: 'WikiAvatar',
    
    props: {
      name: String,
      avatarSrc: String,
      profilePath: String,
    },
  };
</script>

<style scoped lang="scss">
.avatar-image {
  border-radius: 0.75rem;
}
</style>
