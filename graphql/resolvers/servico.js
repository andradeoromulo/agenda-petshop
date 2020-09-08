const Operations = require('../../infraestrutura/operations');
const Servico = new Operations('servico');

const resolvers = {
    Query: {
        servicos: () => Servico.lista(),
        servico: (root, { id }) => Servico.buscaPorId(id)
    },
    Mutation: {
        adicionarServico: (root, params) => Servico.adiciona(params),
        atualizarServico: (root, params) => Servico.atualiza(params),
        deletarServico: (root, { id }) => Servico.deleta(id)
    }
};

module.exports = resolvers;