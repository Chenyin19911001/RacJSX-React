import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import storeShape from './storeShape'

export default class Provider extends Component {
  static propTypes = {
    store: storeShape.isRequired,
    children: PropTypes.element.isRequired
  }

  static childContextTypes = {
    store: storeShape.isRequired
  }

  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    return Children.only(this.props.children)
  }
}
