import {connect, connection as db} from 'mongoose'

export default function connectDatabase (uri) {
  db.on('error', err => { console.error('%s', err) })
    .on('close', () => console.log('Database connection closed.'))
  return connect(uri)
}
