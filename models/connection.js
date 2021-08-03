require('dotenv').config()
const mongoose = require('mongoose')

module.exports = async () => {
  try{
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log('db is connected')
  }
  catch(err) {
    console.error(err)
    process.exit(1)
  }
}