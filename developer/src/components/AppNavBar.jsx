import {
    AppBar,
    Box,
    Button,
    Divider,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Toolbar,
    Typography,
    IconButton
} from "@material-ui/core";
import { Menu, ExitToApp } from "@material-ui/icons";


import React from 'react'


function MobileMenu() {
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
                    <MenuItem>
                        <ListItemText>Home</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText>Practice</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText>Invitation</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <IconButton onClick={this.props.handleLogout} color="primary" aria-label="upload picture" component="span">
                            <ExitToApp />
                        </IconButton>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Box>
    );
}
export default function AppNavBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(!anchorEl);
    };
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" style={{ flexGrow: "1" }}>
                        Helixstack
                    </Typography>
                    <Box sx={{ flexGrow: "3" }}></Box>
                    <Box sx={{ display: { xs: "none", md: "flex" }, minWidth: "300px" }}>
                        <Box sx={{ flexGrow: "1" }}>
                            <Button variant="text" >
                                Home
                            </Button>
                        </Box>
                        <Box sx={{ flexGrow: "1" }}>
                            <Button variant="text" >
                                Invitaions
                            </Button>
                        </Box>
                        <Box sx={{ flexGrow: "1" }}>
                            <Button variant="text" >
                                Profile
                            </Button>
                        </Box>
                        <Box sx={{ flexGrow: "1" }}>
                            <IconButton onClick={()=>props.handleLogout()} color="secondary" aria-label="upload picture" component="span">
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
