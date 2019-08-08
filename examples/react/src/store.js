import createStore from 'unistore'

const store = createStore({
  firstName: '',
  lastName: '',
  username: '',
  nested: {
    list: ['one', 'two', 'three'],
    nestedDeeper: {
      id: 1,
      isActive: true
    }
  }
})

export default store;
