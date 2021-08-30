import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useLocation } from 'react-router';
import '../App.css';
import { DRAWER_WIDTH } from '../Constants';
import getPageTitle from '../services/PageTitleService';

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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

function Topbar() {
    const classes = useStyles();

    const location = useLocation();

    const pageTitle = getPageTitle(location.pathname);

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap>{pageTitle ? pageTitle + ' - ' : ''}Carango Bom</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Topbar;