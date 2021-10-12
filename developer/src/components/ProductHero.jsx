import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ProductHeroLayout from './ProductHeroLayout'
import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const backgroundImage =
  'https://images.unsplash.com/photo-1573167130797-8453176c73d0?auto=format&fit=crop&w=1400&q=80'

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center'
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  }
})

function ProductHero(props) {
  const { classes } = props

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt='increase priority'
      />
      <Typography color='inherit' align='center' variant='h2' marked='center'>
        Evaluate candidates quickly,
        <br />
        affordably, and accurately.
      </Typography>
      <Typography
        color='inherit'
        align='center'
        variant='h5'
        className={classes.h5}
      >
        The industry’s #1 code assessment platform for screening, interviews,
        and take-home projects.
        <br />
        All plans include unlimited candidates, assessments, and user accounts.
      </Typography>
      <Link to='/auth/signup'>
        <Button
          color='secondary'
          variant='contained'
          size='large'
          className={classes.button}
          component='a'
        >
          Register
        </Button>
      </Link>
      <Typography variant='body2' color='inherit' className={classes.more}>
        14 day free trial. Plans begin at $99/month.
      </Typography>
    </ProductHeroLayout>
  )
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductHero)
