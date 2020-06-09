import { AccountModel } from '../models/account'

// The software in this layer contains application specific business rules.
// It encapsulates and implements all of the use cases of the system.
// These use cases orchestrate the flow of data to and from the entities,
// and direct those entities to use their enterprise wide business rules
// to achieve the goals of the use case.

// What should i receive on my application? Name,email,password -> then another method(AccountModel) should
// deal with id
export interface AddAccountModel{
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel>
}
