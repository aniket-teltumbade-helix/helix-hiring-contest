import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { devRegister, devLogin } from '../redux/actions/authActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' to='/'>
        Helixstack
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
const useStyles = theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 1, 1)
  }
})

const result=(res)=>
      {
        if(res.msg){
          toast.success(res.msg)
        }
        else{
          toast.error(res.err)
        }
      }


class Authentication extends Component {
  state = {
    url: null,
    email: null,
    password: null,
    full_name: null,
    role: null,
    company: null,
    company_size: null,
    country: null
  }
  componentDidMount() {
    this.setState({ url: this.props.location.pathname.split('/')[2] })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ url: this.props.location.pathname.split('/')[2] })
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.state.url === 'signup') {
      this.props.devRegister(this.state).then(result)
    } else {
      this.props.devLogin(this.state).then(result)
    }
  }
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { classes } = this.props
    return (
      <>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              {this.state.url === 'signin' ? 'Sign in' : 'Sign Up'}
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={this.handleInput}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={this.handleInput}
              />

              {this.state.url === 'signup' && (
                <>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='full_name'
                    label='Full Name'
                    type='text'
                    id='full_name'
                    autoComplete='name'
                    onChange={this.handleInput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='phone_number'
                    label='Phone Number'
                    type='tel'
                    id='phone_number'
                    autoComplete='phone'
                    onChange={this.handleInput}
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                  >
                    Register
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      <Link to='/auth/signin' variant='body3'>
                        {'Already have an account? Sign In'}
                      </Link>
                    </Grid>
                  </Grid>
                </>
              )}
              {this.state.url === 'signin' && (
                <>
                  <FormControlLabel
                    control={<Checkbox value='remember' color='primary' />}
                    label='Remember me'
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href='#' variant='body2'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to='/auth/signup' variant='body2'>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </>
              )}

              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
      <ToastContainer/>
      </>
    )
  }
}

const mapStateToProps = storeState => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, { devRegister, devLogin })(
    withStyles(useStyles)(Authentication)
  )
)
