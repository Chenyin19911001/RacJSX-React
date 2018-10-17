import PropTypes from 'prop-types'

const storeShape = PropTypes.shape({
  inject: PropTypes.func.isRequired,
  autoRun: PropTypes.func.isRequired,
  getRacxValue: PropTypes.func.isRequired,
  extendsObservable: PropTypes.func.isRequired
})

export default storeShape
