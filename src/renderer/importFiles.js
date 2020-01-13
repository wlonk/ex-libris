'use strict'

import finder from 'findit'
import path from 'path'
import uuid from 'uuid/v4'
import store from './store'

export default (rootDirectory) => {
  store.dispatch('setLoading')
  const find = finder(rootDirectory)
  const books = {}

  find.on('directory', (dir, stat, stop) => {
    const base = path.basename(dir)
    if (base.startsWith('.')) {
      stop()
    }
  })

  find.on('file', (file) => {
    if (file.endsWith('.pdf')) {
      const newBook = {
        id: uuid(),
        title: path.basename(file).split('.').slice(0, -1).join('.'),
        authors: [],
        publisher: '',
        series: '',
        edition: '',
        year: '',
        tags: [],
        fullPath: file
      }
      books[newBook.id] = newBook
    }
  })

  find.on('end', () => {
    store.dispatch('updateBooks', books)
    store.dispatch('unsetLoading')
  })
}
