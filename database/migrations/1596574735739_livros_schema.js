'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LivrosSchema extends Schema {
  up () {
    this.create('livros', (table) => {
      table.increments()
      table.string('titulo').notNullable()
      table.string('descricao').notNullable()
      table.string('valor')
      table.boolean('disponivel')
      table.string('contato').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('livros')
  }
}

module.exports = LivrosSchema
