const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schemas');

const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/database/tabelas');

conexao.connect(erro => {
  if (erro) 
    console.log(erro);
  console.log('Banco conectado com sucesso');

  Tabelas.init(conexao);
})

const servidor = new GraphQLServer({
  resolvers,
  typeDefs
});

servidor.start(() => console.log('Servidor rodando na porta 4000'));
