import React, { PureComponent, Component } from 'react'
import { shallowEqual } from './utils'
import storeShape from './storeShape'

export default function connect(dep, mergeStatesProps, store) {
  return function(WrapComponent) {
    class Connect extends Component {
      static WrapComponent = WrapComponent

      static contextTypes = {
        store: storeShape
      }

      static propTypes = {
        store: storeShape
      }

      constructor(props, context) {
        super(props, context)
        this.store = store || props.store || context.store
        this.state = {
          store: this.store.getRacxValue()
        }
        this.clear()
        this.wrapProps = mergeStatesProps(this.state.store, this.props)
      }

      clear() {
        this.disposable = null
        this.wrapProps = null
        this.propsChanged = false
        this.stateChanged = false
      }

      render() {
        return React.createElement(WrapComponent, this.wrapProps)
      }

      componentDidMount() {
        let watcher = {
          dep,
          subscriber: () => {
            let newStore = this.store.getRacxValue()
            if (!shallowEqual(this.state.store, newStore)) {
              this.stateChanged = true
              this.setState({
                store: this.store.getRacxValue()
              })
            }
          }
        }
        this.disposable = this.store.inject(watcher)
      }

      componentWillUnmount() {
        this.disposable.dispose()
        this.clear()
      }

      shouldComponentUpdate(nextProps, nextState) {
        if (this.propsChanged || this.stateChanged) {
          this.clear()
          let newWrapProps = mergeStatesProps(nextState.store, nextProps)
          if (!shallowEqual(this.wrapProps, newWrapProps)) {
            this.wrapProps = newWrapProps
            return true
          }
        }
        return false
      }

      componentWillReceiveProps(nextProps) {
        if (!shallowEqual(nextProps, this.props)) {
          this.propsChanged = true
        }
      }
    }
    return Connect
  }
}
