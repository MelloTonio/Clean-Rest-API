import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helper/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly AddAccount: AddAccount
  // Como não é responsibilidade desta classe validar o email, separamos as responsabilidades para outra
  // Logo qualquer alteração que tenhamos que fazer relacionada com validação de email ou adicionar usuarios
  // poderá ser feita em outro local, fazendo com que não haja necessidade de alteração na classe principal.
  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator // Instanciando dessa forma permitimos que qualquer alteração possa ser feita direta na respectiva classe e não nessa.
    this.AddAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          // Loops over the request.body searching for a missing required field
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      // name,email,password given will be converted to valid_id,valid_name,valid_email,valid_password
      const account = await this.AddAccount.add({
        name,
        email,
        password
      })
      return ok(account) // Status 200: Success
    } catch (error) {
      return serverError()
    }
  }
}
