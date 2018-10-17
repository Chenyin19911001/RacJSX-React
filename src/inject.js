import React, { PureComponent, Component } from 'react'
import { shallowEqual } from './utils'
import storeShape from './storeShape'

export default function inject(dep, pure = false, store = null) {
  return function(WrapComponent) {
    class InjectComponent extends WrapComponent {
      static contextTypes = {
        store: storeShape
      }

      static propTypes = {
        store: storeShape
      }

      constructor(props, context) {
        super(props, context)
        this.racxStore = store || props.store || context.store
        this.store = pure ? this.racxStore.getRacxValue() : this.racxStore
        this.clear()
      }

      componentDidMount() {
        let watcher = {
          dep,
          subscriber: () => {
            pure && (this.store = this.racxStore.getRacxValue())
            this.forceUpdate()
          }
        }
        this.racxInjectDisposable = this.racxStore.inject(watcher)
        super.componentDidMount && super.componentDidMount()
      }

      componentWillUnmount() {
        this.racxInjectDisposable.dispose()
        this.racxInjectDisposable = null
        super.componentWillUnmount && super.componentWillUnmount()
      }
    }
    return InjectComponent
  }
}
