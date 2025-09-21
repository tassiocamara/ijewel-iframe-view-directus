<template>
  <div class="d-flex flex-col gap-3">
    <!-- Campo de edição do slug (o valor do próprio field) -->
    <v-input
      :model-value="localValue"
      placeholder="Digite o slug do iJewel (ex.: fe69838)"
      :disabled="isLocked"
      :readonly="isLocked"
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
import { useStores } from '@directus/extensions-sdk'

// Props padrão que o Editor passa para interfaces
// Docs: interfaces props + article de propriedades
// - value, collection, field, fieldData, disabled, etc
const props = defineProps({
  value: { type: String, default: '' },
  collection: { type: String, required: true },
  field: { type: String, required: true },
  fieldData: { type: Object, default: null }, // contém metadados, inclusive readonly
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['input'])

// Permissões do usuário (Policy)
const { usePermissionsStore } = useStores()
const permissions = usePermissionsStore()

// Se a Policy NÃO permite update na coleção, travamos
const canUpdateCollection = computed(() => {
  try {
    return permissions.hasPermission(props.collection, 'update')
  } catch {
    return false
  }
})

// Alguns setups marcam o field como readonly via metadados
const isFieldReadonlyMeta = computed(() => {
  // Em versões diferentes, pode estar em fieldData.readonly ou em fieldData.meta?.readonly
  const fd = props.fieldData || {}
  return Boolean(fd.readonly ?? fd?.meta?.readonly)
})

const isLocked = computed(() => {
  // Travar se:
  // - o field estiver desabilitado pelo editor (disabled),
  // - o metadado do field indicar readonly,
  // - a policy não permitir update na coleção.
  return props.disabled || isFieldReadonlyMeta.value || !canUpdateCollection.value
})

const localValue = ref(props.value || '')
watch(() => props.value, (v) => {
  if (v !== localValue.value) localValue.value = v || ''
})

function onUpdate(v) {
  if (isLocked.value) return
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
  return safeSlug.value
    ? `https://ijewel.design/embedded?slug=${encodeURIComponent(safeSlug.value)}`
    : ''
})
</script>

<style scoped>
/* evita foco e clique quando travado (hardening visual) */
:deep(input:disabled), :deep(textarea:disabled) {
  pointer-events: none;
}
.d-flex { display: flex; }
.flex-col { flex-direction: column; }
.gap-3 { gap: 12px; }
.rounded { border-radius: 8px; }
.overflow-hidden { overflow: hidden; }
</style>
