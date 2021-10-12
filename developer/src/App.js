import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated, logout } from './redux/actions/authActions'

// REACT APP IMPORTS
import Authentication from './pages/Authentication'
import LandingPage from './pages/LandingPage'
import AppNavBar from './components/AppNavBar'
import ViewContests from './pages/Contests/ViewContests'
import Instructions from './pages/Contests/Instructions'
import Challenges from './pages/Contests/Challenges'
import ContestEnd from './pages/Contests/ContestEnd'

class App extends Component {
  componentDidMount = () => {
    this.props.isAuthenticated()
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.authDetails.isAuth !== this.props.authDetails.isAuth) {
      this.props.isAuthenticated()
    }
  }
  handleLogout = () => {
    console.log("log---------out");
    this.props.logout()
  }
  render() {
    return (
      <>
        {this.props.authDetails ? (
          <BrowserRouter>
            {this.props.authDetails.isAuth === true ? (
              <>
                <AppNavBar handleLogout={this.handleLogout}></AppNavBar>
                <Switch>
                  <Route
                    exact
                    path='/'
                    component={ViewContests}
                  />
                  <Route
                    exact
                    path='/contests/:contest'
                    component={Instructions}
                  />
                  <Route
                    exact
                    path='/contests/:contest/challenges'
                    component={Challenges}
                  />
                  <Route
                    exact
                    path='/contests/:contest/end'
                    component={ContestEnd}
                  />
                  <Redirect from='/auth/*' to='/' />
                </Switch>
              </>
            ) : this.props.authDetails.isAuth === false ? (
              <>
                <Switch>
                  <Route exact path='/auth/signin' component={Authentication} />
                  <Route exact path='/auth/signup' component={Authentication} />
                  <Route path='/' component={LandingPage} />
                </Switch>
              </>
            ) : (
              /* Loader */
              <></>
            )}
          </BrowserRouter>
        ) : (
          /* Loader */
          <></>
        )}
        {/* Footer */}
      </>
    )
  }
}

const mapStateToProps = storeState => {
  return { authDetails: storeState.authState }
}

export default connect(mapStateToProps, { isAuthenticated, logout })(App)
