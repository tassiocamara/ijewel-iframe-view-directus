<template>
  <div class="d-flex flex-col gap-3">
    <!-- Campo de edição do slug (o valor do próprio field) -->
    <v-input
      :model-value="localValue"
      :readonly="props.readOnly"
      :disabled="props.disabled"
      placeholder="Digite o slug do iJewel (ex.: fe69838)"
      @update:modelValue="onUpdate"
    />

    <!-- Pré-visualização do iFrame -->
    <div v-if="safeSlug" class="rounded overflow-hidden">
      <iframe
        :title="`iJewel - ${safeSlug}`"
        frameborder="0"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        allow="autoplay; fullscreen; xr-spatial-tracking; web-share"
        width="100%"
        height="450px"
        :src="iframeSrc"
      ></iframe>
    </div>

    <v-notice v-else type="warning" icon>
      Informe um slug válido (apenas letras, números, hífen ou sublinhado).
    </v-notice>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

/**
 * O valor do campo (string/text) É o slug.
 * A interface só renderiza iFrame do domínio permitido:
 *   https://ijewel.design/embedded?slug=<slug>
 */

const props = defineProps({
  value: { type: String, default: '' }, // valor atual do campo
  readOnly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['input']) // padrão do Directus: emitir 'input' com o novo valor

const localValue = ref(props.value || '')

watch(
  () => props.value,
  (v) => {
    if (v !== localValue.value) localValue.value = v || ''
  }
)

function onUpdate(v) {
  if (props.readOnly || props.disabled) return
  localValue.value = v || ''
  emit('input', localValue.value)
}

// valida slug (apenas a-z, A-Z, 0-9, -, _)
const slugRegex = /^[A-Za-z0-9_-]+$/

const safeSlug = computed(() => {
  const s = (localValue.value || '').trim()
  return s && slugRegex.test(s) ? s : ''
})

const iframeSrc = computed(() => {
  // Garante domínio fixo e escapa o slug
  return safeSlug.value
    ? `https://ijewel.design/embedded?slug=${encodeURIComponent(safeSlug.value)}`
    : ''
})
</script>

<style scoped>
.d-flex { display: flex; }
.flex-col { flex-direction: column; }
.gap-3 { gap: 12px; }
.rounded { border-radius: 8px; }
.overflow-hidden { overflow: hidden; }
</style>
