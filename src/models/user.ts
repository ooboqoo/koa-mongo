import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  _createTime: { type: Date, default: Date.now }
}, {
  versionKey: false
})

userSchema.virtual('createTime')
  .set( function(value) { this._createTime = value; })
  .get( function() { return this._createTime.toLocaleString(); } );

export default mongoose.model('User', userSchema);
