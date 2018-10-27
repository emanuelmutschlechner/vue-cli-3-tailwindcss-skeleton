<template>
  <div>
    <div
      v-for="color in palette"
      :key="color.name"
      class="relative my-8 overflow-hidden rounded shadow-md1"
    >
      <div
        :class="variantClasses(color.name, {name: 'base', color: color.base})"
        class="relative shadow text-white px-3 py-4 md:py-1 text-sm font-semibold flex justify-between"
      >
        <div class="uppercase">{{ color.name }}</div>
        <div class="flex justify-between"><span class="mr-2">Base</span> <span class="font-normal opacity-75">{{ color.base }}</span></div>
      </div>
      <div class="md:flex md:flex-row-reverse">
        <div
          v-for="variant in color.variants"
          :key="`${color.name}-${variant.name}`"
          :class="variantClasses(color.name, variant)"
          class="px-3 py-4 text-sm flex-1 font-semibold leading-tight"
        >
          <div class="mb-2">{{ capitalize(variant.name) }}</div>
          <div class="font-normal opacity-75">{{ variant.color }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from '../../tailwind.config'
import { contrast } from '../utils/color-contrast'

const other = [
  'black',
  'white',
  'transparent'
]

const makeVariant = (variant, colorName) => ({
  name: variant,
  color: colors[colorName].toUpperCase()
})

const palette = Object.keys(colors)
  .filter(name => {
    return !other.some(n => n === name)
  })
  .reduce((result, name) => {
    const parts = name.split('-')
    const color = parts.shift()
    const variant = parts.join('-') || 'base'

    let palette = result.find(palette => palette.name === color)
    if (!palette) {
      palette = {
        name: color,
        base: null,
        variants: []
      }
      result.push(palette)
    }
    palette.variants.push(makeVariant(variant, name))
    if (variant === 'base') {
      palette.base = colors[name].toUpperCase()
    }
    return result
  }, [])
  .map(palette => {
    palette.variants = palette.variants.reverse()
    if (palette.name === 'grey') {
      palette.variants.push(makeVariant('black', 'black'))
      palette.variants.unshift(makeVariant('white', 'white'))
    }
    return palette
  })

export default {
  name: 'ColorPalette',
  data: () => ({
    palette,
    x: colors,
    colors: []
  }),
  methods: {
    capitalize (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    variantClasses (colorName, variant) {
      return [
        contrast(variant.color, 170)
          ? `text-${colorName}-darkest`
          : 'text-white',
        variant.name === 'base'
          ? `bg-${colorName}`
          : other.some(o => o === variant.name)
            ? `bg-${variant.name}`
            : `bg-${colorName}-${variant.name}`
      ]
    }
  }
}
</script>
