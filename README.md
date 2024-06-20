
# Pokemon TCG Deck Builder

Este projeto é um aplicativo web para construção de decks do Pokemon TCG.

## Arquitetura

- **Angular 18**: Utilizado como framework front-end.
- **Tailwind CSS**: Utilizado para estilização utilizando classes utility.
- **UI Infragistics**: Integração de componentes de interface gráfica da Infragistics.

## Funcionalidades

- **Criação de Baralhos**:
  - Os usuários podem criar novos baralhos inserindo um nome e adicionando cartas.
  - Restrições de 24 a 60 cartas por baralho.
  - Máximo de 4 cartas com o mesmo nome por baralho.

- **Lista de Baralhos**:
  - Exibição de todos os baralhos criados.
  - Funcionalidades para editar e remover baralhos.

- **Detalhes do Baralho**:
  - Visualização de detalhes como número de cartas e tipos de cartas.

## Rotas

- `/decks`: Lista todos os baralhos criados.
- `/create-deck`: Formulário para criar um novo baralho.
- `/edit-deck/:id`: Formulário para editar um baralho existente.
- `/deck-details/:id`: Detalhes de um baralho específico.
- Rota padrão: Redireciona para `/decks`.

## Ambiente de Desenvolvimento

- **Node.js**: v14.17.0
- **Angular CLI**: v18.0.0
- **Instalação de Dependências**:
  ```
  npm install
  ```
- **Rodando o Projeto**:
  ```
  ng serve
  ```

## Estrutura de Pastas

- **src/**
  - **app/**
    - **components/**
    - **pages/**
    - **services/**
    - **models/**
    - **assets/**
    - **app.module.ts**
    - **app.routes.ts**

## Instruções para Desenvolvedores

- **Clonando o Repositório**:
  ```
  git clone https://github.com/gabrielmoraisr/pokemon-tcg-deck-builder.git
  ```
- **Instalando Dependências**:
  ```
  cd pokemon-tcg-deck-builder
  npm install
  ```
- **Rodando o Projeto**:
  ```
  ng serve
  ```
