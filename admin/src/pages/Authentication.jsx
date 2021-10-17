import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Paper,
  Select,
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
  compLogin,
  compRegister,
  compRequestPass,
  compResetPass
} from '../redux/actions/authActions'
import { loadCountries } from '../redux/actions/defaultActions'
import { validateForm, validateInputs } from '../helpers/validation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const options = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
}
const toastify = data => {
  if (data.msg) {
    toast.success(data.msg, options)
  } else {
    toast.error(data.err, options)
  }
}

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
    height: '100vh',
    overflowY: 'hidden'
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

class Authentication extends Component {
  state = {
    url: null,
    email: null,
    password: null,
    full_name: null,
    phone_number: null,
    role: '',
    company: '',
    company_size: '',
    country: '',
    errors: false,
    error: false
  }
  componentDidMount () {
    this.setState({ url: this.props.location.pathname.split('/')[2] })
    this.props.loadCountries()
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
          this.props.compRegister(this.state).then(toastify)
        } else if (url === 'signin') {
          this.props.compLogin(this.state).then(toastify)
        } else if (url === 'request') {
          this.props.compRequestPass(this.state).then(toastify)
        } else if (url === 'request') {
          this.props.compResetPass(this.state).then(toastify)
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
                autocomplete='off'
                onSubmit={this.handleSubmit}
              >
                {this.state.url !== 'reset' && (
                  <TextField
                    type='email'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='off'
                    autoFocus
                    onChange={this.handleInput}
                    helperText={errors.email ? errors.email : null}
                  />
                )}
                {this.state.url !== 'request' && (
                  <TextField
                    type='password'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='password'
                    label='Password'
                    id='password'
                    autoComplete='off'
                    onChange={this.handleInput}
                    helperText={errors.password ? errors.password : null}
                  />
                )}
                {this.state.url === 'reset' && (
                  <TextField
                    type='password'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='confirm'
                    label='Confirm'
                    id='confirm'
                    autoComplete='off'
                    onChange={this.handleInput}
                    helperText={errors.confirm ? errors.confirm : null}
                  />
                )}

                {this.state.url === 'signup' && (
                  <>
                    <Grid container>
                      <Grid item xs>
                        <TextField
                          variant='outlined'
                          margin='normal'
                          fullWidth
                          name='full_name'
                          label='Full Name'
                          type='text'
                          id='full_name'
                          autoComplete='off'
                          onChange={this.handleInput}
                          helperText={
                            errors.full_name ? errors.full_name : null
                          }
                        />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          variant='outlined'
                          margin='normal'
                          fullWidth
                          name='phone_number'
                          label='Phone Number'
                          type='tel'
                          id='phone_number'
                          autoComplete='off'
                          onChange={this.handleInput}
                          helperText={
                            errors.phone_number ? errors.phone_number : null
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs>
                        <TextField
                          variant='outlined'
                          margin='normal'
                          fullWidth
                          name='company'
                          label='Company'
                          type='text'
                          id='company'
                          autoComplete='off'
                          onChange={this.handleInput}
                        />
                      </Grid>
                      <Grid item xs>
                        <FormControl
                          variant='outlined'
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor='company_size'>
                            Company Size
                          </InputLabel>
                          <Select
                            native
                            label='Company Size'
                            inputProps={{
                              name: 'company_size',
                              id: 'company_size'
                            }}
                            onChange={this.handleInput}
                          >
                            <option aria-label='None' value='' />
                            <option>1-20</option>
                            <option>21-50</option>
                            <option>51-100</option>
                            <option>101-500</option>
                            <option>501-1001</option>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs>
                        <FormControl
                          variant='outlined'
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor='role'>Role</InputLabel>
                          <Select
                            native
                            label='Role'
                            inputProps={{
                              name: 'role',
                              id: 'role'
                            }}
                            onChange={this.handleInput}
                          >
                            <option aria-label='None' value='' />
                            <option>Recruiting Team</option>
                            <option>Hiring Manager</option>
                            <option>Developer</option>
                            <option>Education</option>
                            <option>Other</option>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs>
                        <FormControl
                          variant='outlined'
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor='country'>Country</InputLabel>
                          <Select
                            native
                            label='Company Size'
                            inputProps={{
                              name: 'country',
                              id: 'country'
                            }}
                            autoComplete={false}
                            onChange={this.handleInput}
                          >
                            <option aria-label='None' value='' />
                            {this.props.countryList
                              ? this.props.countryList.map(el => (
                                  <option>{el.country}</option>
                                ))
                              : null}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
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
                {this.state.url === 'signup' && (
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      <Link to='/auth/signin' variant='body3'>
                        {'Already have an account? Sign In'}
                      </Link>
                    </Grid>
                  </Grid>
                )}
                {this.state.url === 'signin' && (
                  <>
                    <Grid container>
                      <Grid item xs>
                        <Link to='/auth/request' variant='body2'>
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
                {this.state.url === 'request' && (
                  <>
                    <Grid container>
                      <Grid item xs>
                        <Link to='/auth/signin' variant='body3'>
                          {'Already have an account? Sign In'}
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
  return { countryList: storeState.commonState.country }
}

export default withRouter(
  connect(mapStateToProps, {
    compRegister,
    compLogin,
    loadCountries,
    compRequestPass,
    compResetPass
  })(withStyles(useStyles)(Authentication))
)
