import { Divider, Drawer, List, ListItem, ListItemText, makeStyles, withStyles } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { DRAWER_WIDTH } from '../Constants';
import '../App.css';
import { useContext } from 'react';
import blue from '@material-ui/core/colors/blue';
import getPageTitle from '../services/PageTitleService';
import UsuarioLogadoContext from '../contexts/UsuarioLogadoContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    toolbar: theme.mixins.toolbar,
}));

const StyledListItem = withStyles({
    root: {
        backgroundColor: blue[900]
        ,
        color: "white"
    },
})(ListItem);

function Menu() {
    const { usuarioLogado, setUsuarioLogado } = useContext(UsuarioLogadoContext);

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    function logoff() {
        localStorage.removeItem('dadosAutenticacao');
        setUsuarioLogado(null);
        history.push('/');
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {!usuarioLogado &&
                    <ListItem button component={Link} to={'/login'} key={getPageTitle('/login')} selected={location.pathname === '/login'}>
                        <ListItemText primary={getPageTitle('/login')} />
                    </ListItem>
                }
                {usuarioLogado &&
                    <StyledListItem >
                        <ListItemText primary={usuarioLogado.username} />
                    </StyledListItem>
                }

                <ListItem button component={Link} to={'/'} key={getPageTitle('/')} selected={location.pathname === '/'}>
                    <ListItemText primary={getPageTitle('/')} />
                </ListItem>

                {(usuarioLogado && [
                    '/marcas',
                    '/usuarios',
                    '/dashboard'
                ].map(path => (
                    <ListItem button component={Link} to={path} key={getPageTitle(path)} selected={location.pathname === path}>
                        <ListItemText primary={getPageTitle(path)} />
                    </ListItem>
                )))}
            </List>
            <Divider />
            <List>
                {usuarioLogado &&
                    <ListItem button>
                        <ListItemText primary='Sair' onClick={() => logoff()} />
                    </ListItem>
                }

            </List>
        </Drawer >

    )
}

export default Menu;