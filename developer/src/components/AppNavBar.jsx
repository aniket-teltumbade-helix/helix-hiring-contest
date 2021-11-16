import {
    AppBar,
    Box,
    Button,
    Divider,
    MenuItem,
    MenuList,
    Paper,
    Toolbar,
    Typography,
    IconButton
} from "@material-ui/core";
import { Menu, ExitToApp } from "@material-ui/icons";


import React from 'react'
import { useLocation } from "react-router";


function MobileMenu(props) {
    return (
        <Box sx={{ display: { md: "none" } }}>
            <Paper
                sx={{
                    width: 320,
                    maxWidth: "100%",
                }}
                variant="elevation"
            >
                <MenuList>
                    <Divider />
                    <MenuItem>
                        <IconButton onClick={props.handleLogout} color="primary" aria-label="upload picture" component="span">
                            <ExitToApp />
                        </IconButton>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Box>
    );
}
export default function AppNavBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(false);
    const handleClick = (event) => {
        setAnchorEl(!anchorEl);
    };
    const location = useLocation()
    return !location.pathname.includes('sections') && (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" style={{ flexGrow: "1" }}>
                        <img
                            src='/static/themes/onepirate/productHeroWonder.png'
                            alt='wonder'
                            width='200px'
                            height='auto'
                        />
                    </Typography>
                    <Box sx={{ flexGrow: "3" }}></Box>
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Box >
                            <IconButton onClick={() => props.handleLogout()} color="secondary" aria-label="upload picture" component="span">
                                <ExitToApp />
                            </IconButton>
                        </Box>

                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <Button onClick={handleClick} >
                            <Menu />
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {anchorEl && <MobileMenu />}
        </>
    );
}
