// modulo nativo no node
const path = require('path');
// lib parar juntar os arquivos graphql dos schemas
const mergeGraphQLSchemas = require('merge-graphql-schemas');

//carregando todos os arquivos
const arquivos = path.join(__dirname, './');

// pegando funções da nossa lib
const { fileLoader, mergeTypes } = mergeGraphQLSchemas;

// carregando e agrupando os arquivos
const arquivosCarregados = fileLoader(arquivos);
const schemas = mergeTypes(arquivosCarregados);

module.exports = schemas;



