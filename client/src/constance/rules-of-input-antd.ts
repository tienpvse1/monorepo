
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