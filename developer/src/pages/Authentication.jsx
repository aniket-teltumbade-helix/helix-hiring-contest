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
import {
  devRegister,
  devLogin,
  devRequestPass,
  devResetPass
} from '../redux/actions/authActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { validateForm, validateInputs } from '../helpers/validation'

function Copyright () {
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
    backgroundImage: 'url(https://source.unsplash.com/random?computer)',
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
const options = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
}
const toastify = res => {
  if (res.msg) {
    toast.success(res.msg, options)
  } else {
    toast.error(res.err, options)
  }
}

class Authentication extends Component {
  state = {
    url: null,
    email: null,
    password: null,
    full_name: null,
    phone_number: null,
    passkey: null,
    errors: false,
    error: false
  }
  componentDidMount () {
    this.setState({ url: this.props.location.pathname.split('/')[2] })
    if (this.props.location.pathname.split('/')[2] === 'reset') {
      let passkey = this.props.match.params.passkey
      this.setState({ passkey })
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ url: this.props.location.pathname.split('/')[2] })
    }
  }
  handleSubmit = async e => {
    e.preventDefault()
    let result = await validateForm(this.state)
    this.setState(result)
    const { url, error } = this.state
    if (await result) {
      if (!error) {
        if (url === 'signup') {
          this.props.devRegister(this.state).then(toastify)
        } else if (url === 'signin') {
          this.props.devLogin(this.state).then(toastify)
        } else if (url === 'request') {
          this.props.devRequestPass(this.state).then(toastify)
        } else if (url === 'reset') {
          this.props.devResetPass(this.state).then(toastify)
        }
      } else {
        toastify({ err: 'Required fields should be filled.' })
      }
    }
  }
  handleInput = async e => {
    await this.setState({ [e.target.name]: e.target.value })
    let err = await validateInputs(this.state, e.target.name)
    if (err !== true) {
      this.setState({ errors: { [e.target.name]: err, error: true } })
    } else {
      this.setState({ errors: { [e.target.name]: null, error: false } })
    }
  }
  render () {
    const { classes } = this.props
    const { errors } = this.state
    const formTitle = {
      signin: 'Log In',
      signup: 'Register',
      request: 'Forgot Password',
      reset: 'New Password'
    }
    const buttonTitle = {
      signin: 'Sign In',
      signup: 'Sign Up',
      request: 'Request For Password',
      reset: 'Reset Password'
    }
    return (
      <>
        <Grid container component='main' className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                {formTitle[this.state.url]}
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={this.handleSubmit}
              >
                {this.state.url !== 'reset' && (
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='off'
                    autoFocus
                    onChange={this.handleInput}
                  />
                )}
                {this.state.url !== 'request' && (
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='off'
                    onChange={this.handleInput}
                    helperText={errors.email ? errors.email : null}
                  />
                )}
                {this.state.url === 'reset' && (
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='confirm'
                    label='Confirm'
                    type='confirm'
                    id='confirm'
                    autoComplete='off'
                    onChange={this.handleInput}
                  />
                )}
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
                      autoComplete='off'
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
                      autoComplete='off'
                      onChange={this.handleInput}
                    />
                  </>
                )}
                {this.state.url === 'signin' && (
                  <FormControlLabel
                    control={<Checkbox value='remember' color='primary' />}
                    label='Remember me'
                  />
                )}
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  {buttonTitle[this.state.url]}
                </Button>

                <Grid
                  container
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {this.state.url !== 'request' && (
                    <Grid item>
                      <Link to='/auth/request' variant='body3'>
                        {'Forgot password'}
                      </Link>
                    </Grid>
                  )}
                  {this.state.url !== 'signin' && (
                    <Grid item>
                      <Link to='/auth/signin' variant='body3'>
                        {'Already have an account? Sign In'}
                      </Link>
                    </Grid>
                  )}
                  {this.state.url !== 'signup' && (
                    <Grid item>
                      <Link to='/auth/signup' variant='body2'>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  )}
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={1}
          theme='colored'
        />
      </>
    )
  }
}

const mapStateToProps = storeState => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, {
    devRegister,
    devLogin,
    devRequestPass,
    devResetPass
  })(withStyles(useStyles)(Authentication))
)
