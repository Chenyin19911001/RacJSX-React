import PropTypes from 'prop-types'

export default PropTypes.shape({
  inject: PropTypes.func.isRequired,
  autoRun: PropTypes.func.isRequired,
  getRacxValue: PropTypes.func.isRequired,
  extendsObservable: PropTypes.func.isRequired
})
