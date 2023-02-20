import { Database } from "./database.js"
import { buildRoadPath } from "./utils/build-route-path.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoadPath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))
    }
  }, 
  {
    method: 'POST',
    path: buildRoadPath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoadPath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      database.update('tasks', id, {
        title, 
        description,
        updated_at: new Date().toISOString()
      })

      return res.writeHead(204).end() 
    }
  },
  {
    method: 'PATCH',
    path: buildRoadPath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      database.update('tasks', id, {
        completed_at: new Date().toISOString()
      })

      return res.writeHead(204).end() 
    }
  },
  {
    method: 'DELETE',
    path: buildRoadPath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end() 
    }
  }
]