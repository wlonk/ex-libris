const state = {
  books: {},
  loading: true,
  focusedBooks: [],
  previewBook: null,
  showEditModal: false
}

const mutations = {
  CLEAR_BOOKS (state) {
    state.books = {}
    state.focusedBooks = []
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
  FOCUS_BOOK (state, book) {
    state.focusedBooks = [...state.focusedBooks, book.id]
  },
  UNFOCUS_BOOK (state, book) {
    state.focusedBooks = [...state.focusedBooks].filter(bookId => book.id !== bookId)
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
  updateBooks ({ commit }, books) {
    commit('UPDATE_BOOKS', books)
  }
}

export default {
  state,
  mutations,
  actions
}
