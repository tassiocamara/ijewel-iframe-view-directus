import { defineInterface } from '@directus/extensions-sdk'
import InterfaceComponent from './interface.vue'

export default defineInterface({
  id: 'iframe-view',
  name: 'Iframe View',
  icon: 'web_asset',
  description: 'Exibe um iFrame do iJewel baseado no slug armazenado',
  component: InterfaceComponent,
  types: ['string', 'text'], // garante compatibilidade
  group: 'presentation', // agrupa em "Apresentação" no menu
  options: [],
})