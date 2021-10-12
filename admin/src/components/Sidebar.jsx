import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { Collapse } from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#607D8B',
    color: 'white'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}))

export default function Sidebar (props) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [list, setList] = React.useState(null)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const { to, children } = props
  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to]
  )
  const linkList = [
    { text: 'Home', link: '/' },
    {
      text: 'Challenge',
      subList: [
        { text: 'View Challenges', link: '/challenges' },
        { text: 'Create Challenge', link: '/challenges/create' }
      ]
    },
    {
      text: 'Contest',
      subList: [
        { text: 'View Contests', link: '/Contests' },
        { text: 'Create Contest', link: '/Contests/create' }
      ]
    },
    { text: 'Leaderboard', link: '/leaderboard' },
    { text: 'Statistics', link: '/statistics' }
  ]
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        color='primary'
      >
        <Toolbar>
          <IconButton
            color='secondary'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Codemania
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {linkList.map((el, index) =>
            el.link ? (
              <ListItem button key={index} to={el.link} component={CustomLink}>
                <ListItemText primary={el.text} />
              </ListItem>
            ) : (
              <>
                <ListItem button key={index} onClick={() => setList(index)}>
                  <ListItemText primary={el.text} />
                  {list === index ? <ExpandMore /> : <ExpandLess />}
                </ListItem>
                <Collapse in={list === index}>
                  <List>
                    {el.subList.map((subEle, subIndex) => (
                      <ListItem
                        button
                        key={subIndex}
                        to={subEle.link}
                        component={CustomLink}
                      >
                        <ListItemText primary={subEle.text} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )
          )}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  )
}
