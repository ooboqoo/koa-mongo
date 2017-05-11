import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';

export interface User {
  username: string;
  email?: string;
}

export interface UserModel extends User, Document {
  createTime: Date;
}

const userSchema = new Schema({
  username: String,
  _createTime: {type: Date, default: Date.now}
}, {
  versionKey: false
})

userSchema.virtual('createTime')
  .set( function(value) { this._createTime = value; })
  .get( function() { return this._createTime.toLocaleString(); } );

export default mongoose.model<UserModel>('User', userSchema);
