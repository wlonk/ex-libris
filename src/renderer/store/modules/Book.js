import getDatastore from '../../datastore'

const state = {
  books: {},
  sortKey: {
    key: 'title',
    ascending: true
  },
  loading: true,
  focusedBooks: [],
  previewBook: null,
  showEditModal: false
}

const mutations = {
  SET_SORT_KEY (state, key) {
    state.sortKey = key
  },
  CLEAR_BOOKS (state) {
    state.focusedBooks = []
  },
  ADD_BOOK (state, book) {
    // TODO: db action
    state.books = {...state.books, [book._id]: book}
  },
  SET_BOOKS (state, books) {
    state.books = books
  },
  SET_LOADING (state) {
    state.loading = true
  },
  UNSET_LOADING (state) {
    state.loading = false
  },
  FOCUS_BOOK (state, book) {
    state.focusedBooks = [...state.focusedBooks, book._id]
  },
  UNFOCUS_BOOK (state, book) {
    state.focusedBooks = [...state.focusedBooks].filter(bookId => book._id !== bookId)
  },
  SET_FOCUS (state, newFocus) {
    state.focusedBooks = newFocus
  },
  ADD_FOCUS (state, newFocuses) {
    state.focusedBooks = state.focusedBooks.concat(newFocuses)
  },
  PREVIEW_BOOK (state, book) {
    state.previewBook = book
  },
  UNPREVIEW_BOOK (state) {
    state.previewBook = null
  },
  EDIT_BOOK (state) {
    state.showEditModal = true
  },
  UNEDIT_BOOK (state) {
    state.showEditModal = false
  },
  UPDATE_BOOKS (state, books) {
    state.books = {
      ...state.books,
      ...books
    }
  }
}

const actions = {
  setSortKey ({ commit }, key) {
    commit('SET_SORT_KEY', key)
  },
  clearBooks ({ commit }) {
    commit('CLEAR_BOOKS')
  },
  addBook ({ commit }, book) {
    commit('ADD_BOOK', book)
  },
  setBooks ({ commit }, books) {
    commit('SET_BOOKS', books)
  },
  setLoading ({ commit }) {
    commit('SET_LOADING')
  },
  unsetLoading ({ commit }) {
    commit('UNSET_LOADING')
  },
  focusBook ({ commit }, book) {
    commit('FOCUS_BOOK', book)
  },
  unfocusBook ({ commit }, book) {
    commit('UNFOCUS_BOOK', book)
  },
  setFocus ({ commit }, newFocus) {
    commit('SET_FOCUS', newFocus)
  },
  addFocus ({ commit }, newFocuses) {
    commit('ADD_FOCUS', newFocuses)
  },
  previewBook ({ commit }, book) {
    commit('PREVIEW_BOOK', book)
  },
  unpreviewBook ({ commit }) {
    commit('UNPREVIEW_BOOK')
  },
  editBook ({ commit }) {
    commit('EDIT_BOOK')
  },
  uneditBook ({ commit }) {
    commit('UNEDIT_BOOK')
  },
  insertBooks ({ commit }, books) {
    getDatastore().insert(books, (err, books) => {
      if (err) {
        console.warn('Error accessing db:', err)
        return
      }
      const newBooks = books.reduce((acc, book) => {
        return {...acc, [book._id]: book}
      }, {})
      commit('UPDATE_BOOKS', newBooks)
    })
  },
  updateBooks ({ commit }, { bookIds, updatedFields, newBooks }) {
    const query = { _id: { $in: bookIds } }
    const update = { '$set': updatedFields }
    const options = { multi: true, returnUpdatedDocs: true }
    // TODO: Looks like this is overwriting the fields outside of
    // updated-fields. Can I just spot-edit fields with NeDB?
    getDatastore().update(query, update, options, (err, _, affectedDocuments) => {
      if (err) {
        console.warn('Error accessing db:', err)
        return
      }
      commit('UPDATE_BOOKS', newBooks)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
