'use strict'

import Datastore from 'nedb'
import path from 'path'
import * as electron from 'electron'

let datastore

export default () => {
  if (!datastore) {
    const { remote, app } = electron
    let userData
    // Sometimes, we are calling this from inside the main process, and
    // sometimes from inside the renderer. So we need a genericization across
    // the two cases:
    if (remote) {
      userData = remote.app.getPath('userData')
    } else {
      userData = app.getPath('userData')
    }
    datastore = new Datastore({
      autoload: true,
      filename: path.join(userData, '/data.db')
    })
  }
  return datastore
}
