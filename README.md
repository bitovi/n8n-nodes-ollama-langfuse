# Langfuse & Ollama Custom Node for n8n

This project enables **Langfuse tracing** for LLMs running via **Ollama**, integrated into **n8n** as a custom node. It logs all prompt/response interactions to Langfuse for observability and debugging.

---

## Prerequisites

- Node.js >=18
- [pnpm](https://pnpm.io/installation)
- Docker + Docker Compose
- Git

---

## Project Structure

```
n8n-nodes-ollama-langfuse/
├── docker-compose.yml        # Main app (n8n + custom nodes)
├── Dockerfile                # Optional build file for n8n
├── Langfuse/docker-compose.yml  # Langfuse tracing backend
├── n8n-custom/custom/        # Custom node code
│   ├── nodes/                # Custom node logic (LmChatOllama, handler)
│   ├── credentials/          # Custom credential definitions
│   ├── dist/                 # Compiled JS and flattened icons
│   ├── gulpfile.js           # Icon processor
│   ├── package.json          # Node definitions
└── n8n-data/                 # n8n runtime data (volume)
```

---

## Step-by-Step Setup

### 1. Install `pnpm`

```bash
npm install -g pnpm
```

---

### 2. Install Dependencies

```bash
cd n8n-custom/custom
pnpm install
```

---

### 3. Build the Custom Nodes

```bash
pnpm build
```

> This compiles your code and copies icons into `dist/`.

---

### 4. Start Langfuse

```bash
cd Langfuse
docker compose up -d
```

Access Langfuse UI at: [http://localhost:3001](http://localhost:3001)

---

### 5. Start n8n with Custom Nodes

```bash
docker compose up --build
```

> If you update node logic, re-run `pnpm build` and restart Docker.

---

## Using the Custom Node in n8n

1. Add Langfuse and Ollama credentials in n8n
2. Use `Prompt Template → LLM Chain → Ollama LLM`
3. Run the workflow
4. View logs in [Langfuse UI](http://localhost:3001)

---

## Rebuild Tips

```bash
pnpm build
docker compose down
docker compose up --build
```

---

## License

MIT