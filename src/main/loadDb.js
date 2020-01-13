'use strict'

import store from '../renderer/store'
import getDatastore from '../renderer/datastore'

export default () => {
  store.dispatch('setLoading')
  store.dispatch('unpreviewBook')
  store.dispatch('clearBooks')

  const db = getDatastore()
  db.find({}, (err, books) => {
    if (err) {
      console.warn(err)
      return
    }
    const newBooks = books.reduce((acc, book) => {
      return {...acc, [book._id]: book}
    }, {})
    store.dispatch('setBooks', newBooks)
  })
}
