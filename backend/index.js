//imports
const expres = require('express')
const app = expres()
const connectivity = require('./db/connectivity')
require('dotenv').config()
const {userAuthorisation}=require('./middleware/userAuthorisation')
const {adminAuthorisation}=require('./middleware/adminAuthorisation')
const cors=require('cors')



//routes
app.use(cors())
app.use(expres.json())
//product api
app.use('/comfysloth/api', require('./routers/productDataApi/Data'))
//auth api
app.use('/comfysloth/api/auth', require('./routers/authentication'))
//admin auth api
app.use('/comfysloth/api/auth/admin',require('./routers/admin'))
//user authorisation middleware
app.use('/comfysloth/api/user/authorisation',userAuthorisation, require('./routers/authorisation/userAuthorisation'))
//admin authorisation middleware
app.use('/comfysloth/api/admin/authorisation',adminAuthorisation,require('./routers/authorisation/adminAuthorisation'))




//start
const start = () => {
 try {
  connectivity(process.env.mongodb_connectivity)
  app.listen(process.env.PORT || 4000, () => {
   console.log('connect')
  })
 } catch {
  console.log('not connect...')
 }
}

start()