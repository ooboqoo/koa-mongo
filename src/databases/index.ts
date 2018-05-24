import {connect, connection as db} from 'mongoose'

export default function connectDatabase (uri) {
  return new Promise((resolve, reject) => {
    db.on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(db))

    connect(uri)
  })
}
