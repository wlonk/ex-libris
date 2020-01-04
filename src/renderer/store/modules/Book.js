const state = {
  books: {},
  loading: true,
  highlightedBooks: {},
  previewBook: null
}

const mutations = {
  CLEAR_BOOKS (state) {
    state.books = {}
  },
  ADD_BOOK (state, book) {
    state.books = {...state.books, [book.id]: book}
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
  HIGHLIGHT_BOOK (state, bookId) {
    state.highlightedBooks = {...state.highlightedBooks, bookId: null}
  },
  UNHIGHLIGHT_BOOK (state, bookId) {
    state.highlightedBooks = {...state.highlightedBooks, bookId: null}
  },
  PREVIEW_BOOK (state, book) {
    state.previewBook = book
  },
  UNPREVIEW_BOOK (state) {
    state.previewBook = null
  }
}

const actions = {
  clearBooks ({ commit }) {
    commit('CLEAR_BOOKS')
  },
  addBook ({ commit }, book) {
    commit('ADD_BOOK', book)
  },
  setBooks ({ commit }, books) {
    console.log('setting books:', books)
    commit('SET_BOOKS', books)
  },
  setLoading ({ commit }) {
    commit('SET_LOADING')
  },
  unsetLoading ({ commit }) {
    commit('UNSET_LOADING')
  },
  previewBook ({ commit }, book) {
    commit('PREVIEW_BOOK', book)
  },
  unpreviewBook ({ commit }) {
    commit('UNPREVIEW_BOOK')
  }
}

export default {
  state,
  mutations,
  actions
}
