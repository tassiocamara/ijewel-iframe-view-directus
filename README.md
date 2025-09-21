# Iframe View – Extensão Directus

Esta extensão adiciona uma interface personalizada ao Directus para exibir um iFrame do iJewel, baseado no slug armazenado em um campo.

## Funcionalidades
- Exibe um iFrame dinâmico conforme o valor do campo (slug).
- Compatível com campos do tipo `string` e `text`.
- Agrupada na seção "Apresentação" do Directus.

## Instalação
1. Copie a pasta `iframe-view` para o diretório de extensões do Directus.
2. Reinicie o Directus para carregar a extensão.

## Uso
- Ao editar um campo compatível, selecione "Iframe View" como interface.
- Informe o slug desejado; o iFrame será exibido automaticamente.

## Estrutura
```
iframe-view/
├── .gitignore
├── package.json
├── src/
│   ├── index.js
│   └── interface.vue
```

## Autor
- Desenvolvido por Alisson

## Licença
MIT