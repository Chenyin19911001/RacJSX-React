# RacJSX-React
Application For React Based On RacJSX 

## Provider
参考redux的Provider

## connect
方法模型：connect(dep, mergeStatesProps, store)
参数介绍：  
   1) dep: 必要，store的依赖声明      
   2）mergeStatesProps: 必要，function，根据当前store的state和当前组件的props进行融合生成能够使用的props  
   3）store: 不必要，如果传了，就链接这个store，不传的话就链接Provider或者props的store

## inject
方法模型：connect(dep, pure, store)
参数介绍：  
   1) dep: 必要，store的依赖声明      
   2）pure: 默认为false，如果为true，组件中获取的store就只是store的值映射（换句话说：拿到的store进行操作赋值是不会被触发监听的）  
   3）store: 不必要，如果传了，就链接这个store，不传的话就链接Provider或者props的store