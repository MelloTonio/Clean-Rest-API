import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missign-param-error'
import { badRequest } from '../helper/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        // Loops over the request.body searching for a missing required field
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
