# 🚀 Lista de Compras Compartilhável

## 📌 Descrição do Desafio

Este é um aplicativo mobile de lista de compras, desenvolvido em React Native com Expo, que permite:

- Criar Listas
- Adicionar itens à lista
- Remover itens da lista
  -Excluir Lista
- Marcar/desmarcar itens como “comprado”
- Compartilhar toda a lista juntamente com uma marcação dos itens comprados via WhatsApp, e-mail etc.

---
## 📱 Stack utilizada

- **Plataforma**: React Native (Expo SDK ~53.0.15)  
- **Linguagem**: TypeScript (~5.8.3)  
- **Roteamento / Navegação**:  
  - expo-router (~5.1.2)  

- **Formulários & Validação**:  
  - react-hook-form  
  - @hookform/resolvers  
  - zod  

- **Integração com APIs**:  
  - @tanstack/react-query v5  
    *(utilizado em hooks personalizados para consumo de APIs)*  

- **Backend-as-a-Service & Banco de Dados**:  
  - Firebase v11 (Firestore / Realtime Database)  

- **Linking & Compartilhamento**:  
  - API `Share` do React Native  

- **Notificações / Toasts**:  
  - toastify-react-native  

- **Testes**:  
  - Jest & jest-expo  
  - @testing-library/react-native & @testing-library/jest-native  
---

## 📌 Funcionalidades

- **Visão Geral das Listas**

  - Tela inicial exibe todas as listas em ordem de criação
  - Criar múltiplas listas de compras, informando:
    - Título da lista
    - Cor personalizada
    - Ícone representativo
  - Cada card mostra:
    - Ícone e título
    - Quantidade total de itens e data de criação (“Hoje”)
    - Botões de **Compartilhar** e **Excluir**
    - Compartilhar listas (via WhatsApp, e-mail, etc.)

- **Dentro de Cada Lista**

  - **Adicionar itens**, informando:
    - Nome do produto
    - Quantidade e unidade (ex.: 500 g, 10 unid.)
    - Categoria (ex.: Frutas, Bebidas, Limpeza etc.)
  - **Agrupamento** automático dos itens por categoria
  - **Marcar/desmarcar** itens como “comprado” (checkbox)
  - **Excluir** itens individualmente
  - **Barra de progresso** exibindo a quantidade de itens comprados do total

  ***

## 🏗️ Arquitetura e estrutura do projeto

**Estrutura de pastas:**
```plaintext
src
├── app/
│   ├── adicionar-itens/
│   ├── adicionar-listas/
│   └── lista/
├── components/
├── config/
├── hooks/
│   └── __tests__/
├── service/
│   └── __tests__/
├── styles/
├── utils/
│   ├── constants/
│   ├── content/
│   ├── helpers/
│   ├── mocks/
│   └── types/
│       ├── components/
│       └── interfaces/
└── __tests__/
```

---
## 🔍 Decisões técnicas tomadas

- **React Native**  
  Escolhido pela capacidade de desenvolver uma única base de código para Android e iOS, com hot-reload, vasto ecossistema de bibliotecas e comunidade ativa.
- **Expo**  
  Utilizado para acelerar o setup inicial, fornecer APIs nativas (Expo Go), gerenciar assets (imagens, fontes) e habilitar atualizações OTA (over-the-air) sem recriar o binário.
- **TypeScript**  
  Adoção de tipagem estática para melhorar a robustez do código, facilitar o autocompletar em IDEs e capturar erros em tempo de compilação.
- **react-hook-form**  
  Selecionado pela abordagem declarativa, alta performance (menos re-renders) e integração fácil com validações via zod.
- **expo-router**  
  Roteamento baseado em filesystem, permitindo layouts aninhados e navegação automática sem configuração manual de stacks.
- **@tanstack/react-query**  
  Usado em hooks personalizados para consumo de APIs, gerenciamento de cache, refetch automático e sincronização de dados remotos.
- **Firebase como BaaS**  
  Backend-as-a-Service escolhido pela rapidez de configuração, SDKs oficiais e documentação completa para autenticação e banco de dados.
- **Firebase Firestore**  
  Firestore utilizado para persistência em nuvem e sincronização em tempo real, com listeners que atualizam automaticamente a UI ao mudar os dados.
- **API Share nativa**  
  Empregada para compartilhar listas via WhatsApp, e-mail e outros apps, usando o módulo `Share` do React Native sem dependências externas.


## 🧪 Como rodar o projeto 

1. **Pré-requisitos**

   - Node.js (LTS)
   - Yarn ou npm
   - Expo CLI
     ```bash
     npm install -g expo-cli
     # ou
     yarn global add expo-cli
     ```

2. **Clone o Projeto 

   ```bash
   git clone: https://github.com/DannyCMMarques/Lista-de-Compras-ReactNative.git
   cd shopping-list-app
   ```
3- **Instale as dependências 
   ```bash
  npm install
   ```
4-Execute o projeto no modo desenvolvimento 
``
npx expo start
``
   -  escaneie o QR Code com o app Expo Go em seu dispositivo real.



---

## Como gerar o build de produção
### 🔸 Usando EAS Build (recomendado)

1. Instale o EAS CLI(se você não tiver):
   ```bash
   npm install -g eas-cli
   ```
2. Autentique-se:
   ```bash
   eas login
   ```
   - caso não possuir realize o cadastro nesse link aqui: https://expo.dev/signup
3. Gere o APK Android:

   ```bash
   eas build -p android --profile production
   ```
   — Ao final, copie o link gerado e baixe seu `.apk` pronto para distribuição.


---

## Como rodar os testes com cobertura 


