import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
// import './App.scss'
import { isAuthenticated, logout } from './redux/actions/authActions'

// REACT APP IMPORTS
import Sidebar from './components/Sidebar'
import Authentication from './pages/Authentication'
import CreateChallenge from './pages/Challenge/CreateChallenge'
import CreateContest from './pages/Contest/CreateContest'
import LandingPage from './pages/LandingPage'
import ViewChallenges from './pages/Challenge/ViewChallenges'
import ViewContests from './pages/Contest/ViewContests'
import LeaderBoard from './pages/LeaderBoard'
import Contacts from './pages/Contacts/Contacts'

class App extends Component {
  componentDidMount = () => {
    this.props.isAuthenticated()
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.authDetails.isAuth !== this.props.authDetails.isAuth) {
      this.props.isAuthenticated()
    }
  }
  Logout = () => {
    this.props.logout()
  }
  render() {
    return (
      <>
        {this.props.authDetails ? (
          <BrowserRouter>
            {this.props.authDetails.isAuth === true ? (
              <Sidebar>
                <Switch>
                  <Route
                    exact
                    path='/contests/create'
                    component={CreateContest}
                  />
                  <Route
                    exact
                    path='/challenges/create'
                    component={CreateChallenge}
                  />
                  <Route exact path='/challenges' component={ViewChallenges} />
                  <Route exact path='/contests' component={ViewContests} />
                  <Route exact path='/leaderboard' component={LeaderBoard} />
                  <Route exact path='/contacts' component={Contacts} />
                  <Redirect from='*' to='/contests/create' />
                </Switch>
              </Sidebar>
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
