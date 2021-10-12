import { Component } from 'react'
import { connect } from 'react-redux'
import AppNav from '../components/AppNav'
import ProductHero from '../components/ProductHero'

class LandingPage extends Component {
  render () {
    return (
      <>
        <AppNav />
        <ProductHero></ProductHero>
      </>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
