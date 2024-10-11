import { Hono } from 'hono'
import { auth } from '../routes'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')
app.route('/register', auth)

console.log("bateu aqui")

export const GET = handle(app)
export const POST = handle(app)
