# Furia Fan Server

Este é o backend da aplicação **Furia Fan**, desenvolvido para oferecer suporte aos fãs da FURIA Esports com uma API robusta e segura.

## 📋 Sobre o Projeto

O **Furia Fan Server** é uma API RESTful desenvolvida com Node.js e Express que fornece endpoints para a aplicação Furia Fan. O servidor conta com recursos como limitação de taxa de requisições, tratamento centralizado de erros e suporte a CORS, garantindo segurança e desempenho.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **CORS**
- **Cloudinary**
- **Middlewares personalizados** para:

  - Limitação de taxa (Rate Limiting)
  - Tratamento de erros

## 🔧 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/mendeslian/furia-fan-server.git
cd furia-fan-server
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente:**  
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
PORT=
GEMINI_API_KEY=
DB_CONNECTION_STRING=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
# Adicione outras variáveis necessárias
```

4. **Inicie o servidor:**

```bash
npm start
# ou
yarn start
```

> O servidor estará disponível em `http://localhost:3001`

5. **Para ambiente de desenvolvimento:**

```bash
npm run dev
# ou
yarn dev
```

## 🛠️ Estrutura do Projeto

```
furia-fan-server/
├── src/
│   ├── config/         # Configurações da aplicação
│   ├── controllers/    # Controladores da aplicação
│   ├── middlewares/    # Middlewares personalizados
│   ├── models/         # Modelos de dados
│   ├── routes/         # Definição de rotas
│   ├── schemas/        # Esquemas de validação
│   ├── utils/          # Funções utilitárias
├── app.js              # Configuração principal da aplicação
└── server.js           # Inicialização do servidor
```

## 🔌 Endpoints da API

### 🧑 Usuários

- `POST /user` — Cria um novo usuário
- `GET /user/:id` — Obtém informações de um usuário específico
- `PUT /user/:id` — Atualiza dados de um usuário
- `DELETE /user/:id` — Remove um usuário

### 📄 Documentos

- `POST /user/:id/document` — Faz upload de um documento de identificação

### 🌐 Redes Sociais

- `POST /user/:id/social-media` — Conecta uma rede social ao perfil do usuário

### 🕹️ Perfil de Esports

- `POST /user/:id/esports-profile` — Valida o perfil de esports do usuário

## 🔒 Segurança

O servidor implementa medidas como:

- **Limitação de taxa (Rate Limiting)** para prevenir abusos
- **Configuração de CORS** para controle de acesso
- **Tratamento centralizado de erros** para maior confiabilidade

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature:

```bash
git checkout -b feature/nova-feature
```

3. Faça commit das suas alterações:

```bash
git commit -m 'Adiciona nova feature'
```

4. Faça push para a branch:

```bash
git push origin feature/nova-feature
```

5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT — consulte o arquivo `LICENSE.md` para mais informações.

## 📬 Contato

Lian Mendes — [nailptm@gmail.com](mailto:nailptm@gmail.com)

<!-- Link do Projeto: [https://github.com/seu-usuario/furia-bot-web-app](https://github.com/seu-usuario/furia-bot-web-app) -->
