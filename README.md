
# Iframe View – Extensão Directus

Extensão para Directus que adiciona uma interface personalizada para exibir um iFrame do iJewel, baseada no valor de um campo (slug). Permite visualização dinâmica, respeitando permissões, travas de edição e validação do campo.

## Funcionalidades Detalhadas

- **Visualização Dinâmica:** Exibe um iFrame do iJewel conforme o valor do campo (slug) informado pelo usuário.
- **Validação de Slug:** Aceita apenas valores alfanuméricos, hífen ou sublinhado. Caso o slug seja inválido, exibe aviso.
- **Compatibilidade:** Funciona com campos do tipo `string` e `text`.
- **Permissões e Travas:**
	- Respeita permissões do usuário (Policy) para edição: se o usuário não pode atualizar a coleção, o campo é travado.
	- Detecta campos marcados como `readonly` ou `disabled` via metadados do Directus.
	- Aplica hardening visual, bloqueando interação quando travado.
- **Agrupamento:** Interface aparece na seção "Apresentação" do Directus.

## Instalação
1. Copie a pasta `iframe-view` para o diretório de extensões do Directus.
2. Execute o build da extensão, se necessário: `npx -y -p @directus/extensions-sdk@latest directus-extension build`
3. Reinicie o Directus para carregar a extensão.

## Como Funciona

### 1. Seleção da Interface
Ao editar um campo compatível, selecione "Iframe View" como interface. O campo será exibido com um input para o slug e a pré-visualização do iFrame.

### 2. Edição e Travas
- O campo pode ser editado apenas se:
	- O usuário tem permissão de atualização na coleção (Policy Directus).
	- O campo não está marcado como `readonly` ou `disabled` nos metadados.
- Se qualquer trava estiver ativa, o input fica bloqueado e não aceita edição.

### 3. Validação do Slug
- O valor do campo é validado usando regex: apenas letras, números, hífen ou sublinhado são aceitos.
- Se o slug for inválido, um aviso é exibido e o iFrame não aparece.

### 4. Visualização do iFrame
- Quando o slug é válido, o iFrame é exibido automaticamente, apontando para:
	`https://ijewel.design/embedded?slug=SEU_SLUG`
- O iFrame tem altura fixa (450px) e largura total, com bordas arredondadas.

### 5. Hardening Visual
- Quando travado, o campo bloqueia interação (foco, clique, digitação), garantindo segurança visual e funcional.

### 6. Estrutura dos Arquivos
```
iframe-view/
├── .gitignore
├── package.json
├── src/
│   ├── index.js         # Registro da interface e metadados
│   └── interface.vue    # Componente Vue com lógica de edição, travas, validação e visualização
```

## Exemplos de Uso

1. **Configuração do Campo:**
	 - Crie um campo do tipo `string` ou `text`.
	 - Selecione "Iframe View" como interface.
2. **Permissões:**
	 - Usuários sem permissão de edição verão o campo travado.
3. **Visualização:**
	 - Informe um slug válido para visualizar o iFrame do iJewel.

## Autor
- Desenvolvido por Alisson

## Licença
MIT