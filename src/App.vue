<template>
  <div id="app" class="my-16 w-full">
    <h1 class="mb-8">Vue CLI 3 TailwindCSS Skeleton</h1>

    <div class="bg-grey-lightest py-12">
      <Cards/>
    </div>

    <div class="xl:px-12 w-full max-w-lg mx-auto xl:w-3/4 my-16">
      <h2>Default color palette</h2>
      <ColorPalette/>
    </div>
  </div>
</template>

<script>
import Cards from './components/Cards'
import ColorPalette from './components/ColorPalette'

export default {
  name: 'App',
  components: {
    Cards,
    ColorPalette
  }
}
</script>

<style lang="postcss">
@import 'main.pcss';

h1, h2 {
  @apply text-grey-darkest text-center;
}
</style>
