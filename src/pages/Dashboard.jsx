import { Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DashboardService from '../services/DashboardService';

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        maxWidth: 400,
        margin: 20,
        display: 'inline-block',
    }
});

function Dashboard() {
    const classes = useStyles();

    const [dados, setDados] = useState([]);

    useEffect(() => {
        DashboardService.listar()
            .then(dados => {
                setDados(dados.map(d => (
                    {
                        ...d,
                        valor: d.montante.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                    })
                ));
            });
    }, []);

    return (
        dados.map((dado, index) =>
            <Card key={index} className={classes.root}>
                <CardHeader
                    title={dado.nomeDaMarca}
                />
                <CardContent>
                    <Typography variant="body1" color="textPrimary" component="p">
                        Quantidade: {dado.quantidadeDeVeiculos}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        Valor: {dado.valor}
                    </Typography>
                </CardContent>
            </Card>
        )
    );
}

export default Dashboard;