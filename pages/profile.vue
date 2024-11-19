<template>
<div>
  <h1 class="text-[25px]">پروفایل</h1>

  <NuxtLayout name="custom">
    <NuxtLoadingIndicator/>
    <NuxtPage/>
  </NuxtLayout>
</div>
</template>

<script setup>
definePageMeta({
  middleware:"auth"
})
</script>

<style scoped>

</style>