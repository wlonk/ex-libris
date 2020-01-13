'use strict'

import store from '../renderer/store'
// import db from './datastore'

const db = {
  find: () => {}
}

export default () => {
  store.dispatch('setLoading')
  store.dispatch('unpreviewBook')
  store.dispatch('clearBooks')

  // TODO: replace this with an action dispatch, so that the DB access happens
  // reliably through the render process.
  db.find({}, (err, docs) => {
    if (err) {
      console.warn(err)
      return
    }
    store.dispatch('setBooks', docs)
  })
}
