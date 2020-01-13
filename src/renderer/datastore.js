'use strict'
/* eslint-disable */

import Datastore from 'nedb'
import path from 'path'
// XXX: Why the FUCK is `remote` consistently undefined when I run this?
import { remote } from 'electron'

let datastore

export default () => {
  if (!datastore) {
    const userData = remote.app.getPath('userData')
    datastore = new Datastore({
      autoload: true,
      filename: path.join(userData, '/data.db')
    })
  }
  return datastore
}
