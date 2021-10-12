import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Button, Icon } from '@material-ui/core'
import { Link } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}))
const AppNav = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar variant='dense'>
          <Typography variant='h6' color='inherit'>
            HelixStack
          </Typography>
          <div style={{ flexGrow: '1' }} />
          <Link to='/auth/signin'>
            <Button
              variant='contained'
              color='secondary'
              className={classes.menuButton}
              endIcon={<Icon>login</Icon>}
            >
              Log IN
            </Button>
          </Link>
          <Link to='/auth/signup'>
            <Button
              variant='outlined'
              color='secondary'
              className={classes.menuButton}
              endIcon={<Icon>app_registration</Icon>}
            >
              Register
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AppNav)
