import React, { PureComponent, Component } from 'react'
import { shallowEqual } from './utils'
import storeShape from './storeShape'
const { CompoundDisposable } = require('racjs')

export default function inject(
  dep,
  propertyKey = 'racxStore',
  sync = false,
  pure = false,
  store = null
) {
  let privatePropertyKey = `__${propertyKey}`
  return function(WrapComponent) {
    class InjectComponent extends WrapComponent {
      static contextTypes = {
        store: storeShape
      }

      constructor(props, context) {
        super(props, context)
        if (!this.racxInjectDisposable) {
          this.racxInjectDisposable = new CompoundDisposable()
        }
        if (this[propertyKey] != null) {
          console.warn(`the key for ${propertyKey} has been set`)
        }
        this[privatePropertyKey] = store || props.store || context.store
        this[propertyKey] = pure
          ? this[privatePropertyKey].getRacxValue()
          : this[privatePropertyKey]
        this.clear()
      }

      componentDidMount() {
        let watcher = {
          dep,
          sync,
          subscriber: () => {
            pure &&
              (this[propertyKey] = this[privatePropertyKey].getRacxValue())
            this.forceUpdate()
          }
        }
        this.racxInjectDisposable.addDisposable(this.racxStore.inject(watcher))
        super.componentDidMount && super.componentDidMount()
      }

      componentWillUnmount() {
        super.componentWillUnmount && super.componentWillUnmount()
        if (this.racxInjectDisposable) {
          this.racxInjectDisposable.dispose()
          this.racxInjectDisposable = null
        }
      }
    }
    return InjectComponent
  }
}
