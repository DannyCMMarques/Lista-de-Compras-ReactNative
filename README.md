# 🚀 Lista de Compras Compartilhável

## 📌 Descrição do Desafio

Este é um aplicativo mobile de lista de compras, desenvolvido em React Native com Expo, que permite:

- **Criar** múltiplas listas de compras, definindo título, cor e ícone
- **Adicionar** itens à lista (nome, quantidade, unidade, categoria)
- **Remover** itens da lista
- **Excluir** listas completas
- **Marcar/desmarcar** itens como “comprado”
- **Compartilhar** toda a lista, incluindo marcação dos itens comprados, via WhatsApp, e-mail etc.

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
- **Persistência de Dados**:  
  - Em nuvem com Firebase (Firestore ou Realtime Database)  
- **Linking & Compartilhamento**:  
  - API `Share` nativa do React Native  
- **Notificações / Toasts**:  
  - toastify-react-native  
- **Testes**:  
  - Jest & jest-expo  
  - @testing-library/react-native
---

## 📌 Funcionalidades

### Visão Geral das Listas

- Tela inicial exibe todas as listas em ordem de criação  
- Criar múltiplas listas, informando:
  - Título da lista  
  - Cor personalizada  
  - Ícone representativo  
- Cada card mostra:
  - Ícone, título e total de itens  
  - Data de criação  
  - Botões de **Compartilhar** e **Excluir**

### Dentro de Cada Lista

- **Adicionar itens**, informando:
  - Nome do produto  
  - Quantidade e unidade (ex.: 500 g, 10 unid.)  
  - Categoria (ex.: Frutas, Bebidas, Limpeza etc.)  
- **Agrupamento** automático dos itens por categoria  
- **Marcar/desmarcar** itens como “comprado” (checkbox)  
- **Excluir** itens individualmente  
- **Barra de progresso** exibindo “X de Y itens comprados”

---
## 📸 Prints
<img width="300" alt="image" src="https://github.com/user-attachments/assets/c9a06e8f-26e1-49e4-aadc-8dbf973135a1" />
<img width="300"  alt="image" src="https://github.com/user-attachments/assets/cc5a9763-aedf-49fc-ae41-3e3176a64a72" />
<img width="300"  alt="image" src="https://github.com/user-attachments/assets/d12da96c-eb75-4975-b6b4-702b4f2dfef9" />
<img width="300" alt="Screenshot_1752264558" src="https://github.com/user-attachments/assets/2b46b16d-39e5-4ec8-a5b9-7e6401525e53" />

<img width="300" alt="image" src="https://github.com/user-attachments/assets/cda18c23-f9dc-48f5-976f-7155b08d0362" />


## 🏗️ Arquitetura e estrutura do projeto

```plaintext
shopping-list-app/
├── expo/                   # Configurações do Expo (app.json, eas.json)
├── src/
│   ├── app/                # Telas (adicionar-lista, adicionar-itens, lista)
│   ├── components/         # Componentes reutilizáveis
│   ├── hooks/              # Custom hooks (+ __tests__)
│   ├── service/            # Integração com APIs / Firebase (+ __tests__)
│   ├── styles/             # Estilos compartilhados
│   └── utils/              # Tipos, constantes, helpers, mocks
├── .gitignore
├── package.json
└── README.md
```

---

## 🔍 Decisões técnicas tomadas

- **React Native**  
  Permite base única de código para Android e iOS

- **Expo**  
  Acelera o setup inicial, fornece APIs nativas via Expo Go e habilita OTA (over-the-air).

- **TypeScript**  
  Tipagem estática para robustez, autocompletar e prevenção de erros em build.

- **react-hook-form**  
  Validações declarativas, performance otimizada e integração fácil com zod.

- **expo-router**  
  Roteamento via filesystem, suporte a layouts aninhados e navegação sem configuração manual.

- **@tanstack/react-query**  
  Hooks personalizados para consumo de APIs, cache, refetch automático e sincronização.

- **Firebase como BaaS**  
  Rápida configuração de backend, SDKs oficiais e documentação completa.

- **Firebase Firestore**  
  Persistência em nuvem e sincronização em tempo real com listeners.

- **API Share nativa**  
  Compartilhamento de listas usando o módulo `Share` do React Native.

---

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

2. **Clonar o repositório**  
   ```bash
   git clone https://github.com/DannyCMMarques/Lista-de-Compras-ReactNative.git
   cd SHOPPING-LIST-APP
   ```

3. **Instalar dependências**  
   ```bash
   npm install
   # ou
   yarn install
   ```

4. **Executar em modo de desenvolvimento**  
   ```bash
   npx expo start
   ```  
   - Escaneie o QR Code com o app Expo Go ou pressione `a` (Android) / `i` (iOS).

---

## 📦 Como gerar o build de produção

### Usando EAS Build (recomendado)

1. Instalar EAS CLI (se necessário):  
   ```bash
   npm install -g eas-cli
   ```

2. Fazer login no Expo:  
   ```bash
   eas login
   ```  
   *(Caso não tenha conta, cadastre-se em https://expo.dev/signup.)*

3. Gerar o APK Android:  
   ```bash
   eas build -p android --profile production
   ```  
   — Copie o link gerado e baixe o `.apk` para distribuição.

---

## 🧪 Como rodar os testes com cobertura

```bash
npm run test -- --coverage
# ou
yarn test --coverage
```
