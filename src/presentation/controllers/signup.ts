import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missign-param-error'
import { badRequest } from '../helper/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    return badRequest(new MissingParamError('email'))
  }
}
