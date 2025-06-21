import { Router } from 'express'
import { CategoryController } from '../controllers'

let router = Router()

const categoryRoute = (app) => {
    router.get('/', new CategoryController().getAll)

    app.use('/api/v1/category', router)
}

export default categoryRoute