import ServiceUtils from "./ServiceUtils";

const VeiculoService = {
  dashboard() {
    return Promise.resolve([
      { marca: 'GM', valor: "R$ 50.000,00" },
      { marca: 'FIAT', valor: "R$ 15.000,00" },
      { marca: 'RENAULT', valor: "R$ 8.000,00" },
    ]);
  },

  cadastrar(veiculo) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/veiculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
        body: JSON.stringify(veiculo)
      })
    );
  },

  alterar(veiculo) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/veiculos/' + veiculo.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
        body: JSON.stringify(veiculo)
      })
    );
  },

  consultar(id) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/veiculos/' + id)
    );
  },

  listar() {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/veiculos')
    );
  },

  excluir(veiculo) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/veiculos/' + veiculo.id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
      })
    );
  }
};

export default VeiculoService;