<template>
<div>
  <ProfileAddresses :myProvince="data.provinces" :myCity="data.cities"/>
</div>
</template>

<script setup>

const { data } = await useFetch('/api/global', {
  query:{url:`/profile/addresses`},
  headers:useRequestHeader(['cookie'])
})
</script>

<style scoped>

</style>