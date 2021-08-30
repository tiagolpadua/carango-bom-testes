function getPageTitle(path) {
    const el = [
        ['/login', 'Entrar'],
        ['/dashboard', 'Dashboard'],
        ['/cadastro-veiculo', 'Cadastro de Veículo'],
        ['/usuarios', 'Usuários'],
        ['/cadastro-usuario', 'Cadastro de Usuário'],
        ['/marcas', 'Marcas'],
        ['/cadastro-marca', 'Cadastro de Marca'],
        ['/alteracao-marca', 'Alteração de Marca'],
        ['/', 'Veículos']
    ].find(i => path.startsWith(i[0]));

    return el ? el[1] : ('Sem título para: ' + path);
}

export default getPageTitle;