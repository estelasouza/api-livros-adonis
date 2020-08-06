'use strict'
const User = use('App/Models/User')
const { validateAll } = use('Validator')
class CadastroController {
    async register({ request, response }){

    try {
            const validation = await validateAll(request.all(),{
                email:'required|email|unique:users',
                password: 'required|min:5'
            })

            if(validation.fails()){
                return response.status(401).send({message:validation.messages()})
            }
            const data = request.only(['email', 'password','username'])
            const user = await User.create(data)
    
            return user
        }
        
    catch(err){
        return response.status(400).send({error:`Erro: ${err.message}`})
    }    
}
    async login({ request, response, auth }){
        try{
            const { email, password } = request.all()
            const validaToken = await auth.attempt(email, password)
            
            return validaToken
        }catch(err){
        return response.status(400).send({error:`Erro: ${err.message}`})
    }
    }
}
module.exports = CadastroController
