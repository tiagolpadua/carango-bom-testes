const ServiceUtils = {

    handleResponse(prom) {
        return new Promise((resolve, reject) => {
            prom.then((response) => {
                if (response.ok) {
                    if (response.headers.get('Content-Length') === '0') {
                        resolve();
                    } else {
                        resolve(response.json());
                    }
                } else {
                    response.json()
                        .then((data) => {
                            if (data.error) {
                                reject(data.error);
                            } else if (data.erros) {
                                reject(data.erros);
                            } else {
                                reject(data);
                            }
                        })
                        .catch(err => reject(err));
                }
            })
        });
    },

    getAPIHost() {
        if (process.env.NODE_ENV === 'development') {
            // return 'http://localhost:8080';
            return 'https://carango-bom-api.herokuapp.com';
        } else {
            return 'https://carango-bom-api.herokuapp.com';
        }
    },

    getJWT() {
        const dadosAutenticacao = JSON.parse(localStorage.getItem('dadosAutenticacao'));
        return dadosAutenticacao.token;
    }
}

export default ServiceUtils;