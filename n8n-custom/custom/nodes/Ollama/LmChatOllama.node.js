const { NodeConnectionTypes } = require('n8n-workflow');
const { ChatOllama } = require('@langchain/ollama');
const { LangfuseN8nHandler } = require('./LangfuseCallbackHandler');

class LmChatOllama {
  constructor() {
    this.description = {
      displayName: 'Ollama LLM',
      name: 'lmChatOllama',
      icon: 'file:bitovi.svg',
      group: ['transform'],
      version: 1.0,
      description: 'Ollama LLM with Langfuse tracing',
      defaults: { name: 'Ollama LLM' },
      inputs: [],
      outputs: [NodeConnectionTypes.AiLanguageModel],
      outputNames: ['Model'],
      credentials: [
        { name: 'ollamaApi', required: true },
        { name: 'langfuseApi', required: true },
      ],
      properties: [
        {
          displayName: 'Model',
          name: 'model',
          type: 'string',
          default: 'llama3',
          required: true,
        },
      ],
    };
  }

  async supplyData(itemIndex) {
    const getCreds = this.getCredentials;
    const getParam = this.getNodeParameter;

    const ollamaCreds = await getCreds.call(this, 'ollamaApi', itemIndex);
    const langfuseCreds = await getCreds.call(this, 'langfuseApi', itemIndex);
    const modelName = getParam.call(this, 'model', itemIndex);

    const langfuseHandler = new LangfuseN8nHandler({
      publicKey: langfuseCreds.publicKey,
      secretKey: langfuseCreds.secretKey,
      baseUrl: langfuseCreds.baseUrl,
    });

    const model = new ChatOllama({
      baseUrl: ollamaCreds.baseUrl,
      model: modelName,
      callbacks: [langfuseHandler],
    });

    return { response: model };
  }
}

module.exports = { LmChatOllama };