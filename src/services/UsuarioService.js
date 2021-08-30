import ServiceUtils from "./ServiceUtils";

const UsuarioService = {
  login({ usuario, senha }) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/autenticacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usuario, password: senha })
      })
    ).then(dadosAutenticacao => {
      localStorage.setItem('dadosAutenticacao', JSON.stringify(dadosAutenticacao));
      return dadosAutenticacao.usuario;
    });
  },

  cadastrar({ usuario, senha }) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
        body: JSON.stringify({ username: usuario, password: senha })
      })
    );
  },

  listar() {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/usuarios', {
        headers: {
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        }
      })
    );
  },

  excluir(usuario) {
    return ServiceUtils.handleResponse(
      fetch(ServiceUtils.getAPIHost() + '/usuarios/' + usuario.username, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + ServiceUtils.getJWT()
        },
      })
    );
  }
};

export default UsuarioService;