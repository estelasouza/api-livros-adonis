'use strict'

const Livros = use('App/Models/Livro')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with livros
 */
class LivroController {
  /**
   * Show a list of all livros.
   * GET livros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try{ 
      const livros = await Database.from('livros').select('id','titulo','descricao')

    return livros
    }
    catch(err){
      return response.status(404).send({message:"Não há livros cadastrados"})
    }
  }


  /**
   * Create/save a new livro.
   * POST livros
   * EDIT E CREATE
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['titulo', 'descricao','valor', 'disponivel', 'contato'])
    try{
      const livro = await Livros.create(data)
   
      return livro
    }catch(err){
      return response.status(404).send({message:err.message})

    }
   
  }

  /**
   * Display a single livro.
   * GET livros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    
    try{
      const id = params.id
      const livro = await Database.from('livros').where('id',id).select('titulo','descricao','valor','disponivel')
      return livro
    }
    catch(err){
      return response.status(404).send({message:"não há livro com esse id"})
    }
  }

  /**
   * Update livro details.
   * PUT or PATCH livros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try{
      const {  titulo ,  descricao , valor ,  disponivel } = request.all()
      const id = params.id
  
      const livro = await Database.table('livros').where('id',id).update({titulo:titulo,descricao:descricao,valor:valor,disponivel:disponivel})

      return livro
  }catch(err){
      return response.status(404).send({message:err.message})
    }
  }

  /**
   * Delete a livro with id.
   * DELETE livros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const id = params.id
    const livro = await Database.from('livros').where('id',id).delete()
    return livro
  }
}

module.exports = LivroController
