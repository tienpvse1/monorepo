export const isPhoneNumber = {
  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
  message: 'Must be phone number',
}

export const isEmail: any = {
  type: 'email',
  message: 'The input is not valid E-mail!',
}

export const isRequired = (message: string) => (
  {
    required: true,
    message: message,
  }
)

export const isTaxId = {
  pattern: /(^[0-9]{10,13}$)/,
  message: 'Tax id is a number that must have 10 to 13 characters'
}

export const isPostalCode = {
  pattern: /(^[0-9]{5}$)/,
  message: 'Postal code consists of 5 numeric characters.'
}

export const isQuantity: any = {
  type: 'number',
  min: 1,
  max: 99,
  message: 'Quantity must be between 1 and 99'
}