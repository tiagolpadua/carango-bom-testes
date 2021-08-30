import ServiceUtils from "./ServiceUtils";

const MarcaService = {
  cadastrar(marca) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/marcas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
        body: JSON.stringify(marca)
      })
    );
  },

  alterar(marca) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/marcas/' + marca.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
        body: JSON.stringify(marca)
      })
    );
  },

  consultar(id) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/marcas/' + id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
      })
    );
  },

  listar() {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/marcas', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
      })
    );
  },

  excluir(marca) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/marcas/' + marca.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
      })
    );
  }
};

export default MarcaService;