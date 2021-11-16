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
import { devRegister, devLogin, devRequestPass, devResetPass } from '../redux/actions/authActions'
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

const result = (res) => {
  console.log({ res });
  if (res.msg) {
    toast.success(res.msg)
  }
  else {
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
    country: null,
    errors: {},
    confirm: null,
    passkey: null
  }
  componentDidMount() {
    this.setState({ url: this.props.location.pathname.split('/')[2] })
    if (this.props.match.params.passkey) {
      this.setState({ passkey: this.props.match.params.passkey })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ url: this.props.location.pathname.split('/')[2] })
    }
  }
  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    if (this.state.url === "signup") {
      //Name
      if (!fields["full_name"]) {
        formIsValid = false;
        errors["full_name"] = "Cannot be empty";
      }

      if (typeof fields["full_name"] !== "undefined") {
        if (fields["full_name"].match(/^[a-zA-Z]$/)) {
          formIsValid = false;
          errors["full_name"] = "Only letters";
        }
      }
    }
    if (this.state.url === "resetpass") {
      //Password
      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "Cannot be empty";
      }

      if (typeof fields["password"] !== "undefined" && typeof fields["confirm"] !== "undefined") {
        if (fields["password"] !== fields["confirm"]) {
          formIsValid = false;
          errors["confirm"] = "Password Doesn't Match";
        }
      }
    }
    if (this.state.url !== "resetpass") {
      //Email
      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "Cannot be empty";
      }

      if (typeof fields["email"] !== "undefined") {
        let lastAtPos = fields["email"].lastIndexOf("@");
        let lastDotPos = fields["email"].lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            fields["email"].indexOf("@@") === -1 &&
            lastDotPos > 2 &&
            fields["email"].length - lastDotPos > 2
          )
        ) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.handleValidation()) {
      if (this.state.url === 'signup') {
        this.props.devRegister(this.state).then(result)
      } else if (this.state.url === "signin") {
        this.props.devLogin(this.state).then(result)
      } else if (this.state.url === "requestpass") {
        this.props.devRequestPass(this.state).then(result)
      }
      else {
        this.props.devResetPass(this.state).then(result)
      }
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
                {this.state.url !== "resetpass" && <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  helperText={this.state.errors.email ? this.state.errors.email : ''}
                  onChange={this.handleInput}
                />}
                {this.state.url !== "requestpass" && <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  helperText={this.state.errors.password ? this.state.errors.password : ''}
                  onChange={this.handleInput}
                />}
                {this.state.url === "resetpass" && <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='confirm'
                  label='Confirm'
                  type='password'
                  id='confirm'
                  autoComplete='current-confirm'
                  onChange={this.handleInput}
                  helperText={this.state.errors.confirm ? this.state.errors.confirm : ''}
                />}

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
                      helperText={this.state.errors.full_name ? this.state.errors.full_name : ''}
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
                        <Link to="/auth/requestpass">
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
                {(this.state.url === "requestpass" || this.state.url === "resetpass") &&
                  <>
                    <Button type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      className={classes.submit}>Reset Password</Button>
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
                }

                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
        <ToastContainer />
      </>
    )
  }
}

const mapStateToProps = storeState => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, { devRegister, devLogin, devRequestPass, devResetPass })(
    withStyles(useStyles)(Authentication)
  )
)
