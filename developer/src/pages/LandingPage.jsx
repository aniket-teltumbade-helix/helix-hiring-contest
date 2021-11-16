import { Component } from 'react'
import { connect } from 'react-redux'
import AppNav from '../components/AppNav'
import Footer from '../components/Footer'
import ProductHero from '../components/ProductHero'

class LandingPage extends Component {
  render () {
    return (
      <>
        <AppNav />
        <ProductHero></ProductHero>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
