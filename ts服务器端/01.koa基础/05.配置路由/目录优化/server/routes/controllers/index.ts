import userController from './userController/user.controller'
import indexController from './indexController/index.controller'

const {register } = userController
const {indexPage} = indexController

export {
    register, 
    indexPage
}