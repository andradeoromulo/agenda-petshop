const Operations = require('../../infraestrutura/operations');
const Pet = new Operations('pet');

const resolvers = {
    Query: {
      pets: () => Pet.lista(),
      pet: (root, { id }) => Pet.buscaPorId(id)
    },
    Mutation: {
      adicionarPet: (root, params) => Pet.adiciona(params),
      atualizarPet: (root, params) => Pet.atualiza(params),
      deletarPet: (root, { id }) => Pet.deleta(id)
    }
};

module.exports = resolvers;