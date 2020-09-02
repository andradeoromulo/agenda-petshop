const { GraphQLServer } = require('graphql-yoga');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/database/tabelas');

const Operations = require('./infraestrutura/operations');

conexao.connect(erro => {
  if (erro) 
    console.log(erro);
  console.log('Banco conectado com sucesso');

  Tabelas.init(conexao);
})

const Cliente = new Operations('cliente');

const resolvers = {
  Query: {
    status: () => 'Servidor rodando',
    clientes: () => Cliente.lista(),
    cliente: (root, { id }) => Cliente.buscaPorId(id)
  },
  Mutation: {
    adicionarCliente: (root, params) => Cliente.adiciona(params),
    atualizarCliente: (root, params) => Cliente.atualiza(params),
    deletarCliente: (root, { id }) => Cliente.deleta(id) 
  }
};

const servidor = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
});

servidor.start(() => console.log('Servidor rodando na porta 4000'));
