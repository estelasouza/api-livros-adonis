'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApiLivrosSchema extends Schema {
  up () {
    this.create('api_livros', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('api_livros')
  }
}

module.exports = ApiLivrosSchema
