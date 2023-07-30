import { Regex } from './regex'

const required = 'Обязательное поле'

const Auth = {
  Username: {
    required,
    pattern: {
      value: Regex.Username,
      message: 'Некорректный формат имени пользователя.',
    },
    maxLength: {
      value: 29,
      message: 'Максимум 29 символов',
    },
    minLength: {
      value: 4,
      message: 'Минимум 4 символа',
    },
  },
  Email: {
    required,
    pattern: {
      value: Regex.Email,
      message: 'Некорректный формат почты',
    },
  },
  Password: {
    required: 'Обязательное поле',
    minLength: {
      value: 8,
      message: 'Минимум 8 символов',
    },
    maxLength: {
      value: 30,
      message: 'Максимум 30 символов',
    },
  },
  Identity: {
    required,
    maxLength: {
      value: 29,
      message: 'Максимум 29 символов',
    },
    minLength: {
      value: 4,
      message: 'Минимум 4 символа',
    },
  },
}

const Posts = {
  Title: {
    required,
    minLength: {
      value: 3,
      message: 'Минимум 3 символа',
    },
    maxLength: {
      value: 100,
      message: 'Максимум 100 символов',
    },
  },
  Description: {
    minLength: {
      value: 3,
      message: 'Минимум 3 символа',
    },
    maxLength: {
      value: 3000,
      message: 'Максимум 3000 символов',
    },
  },
  Location: {
    maxLength: {
      value: 50,
      message: 'Максимум 50 символов',
    },
  },
  Images: {
    required,
  },
}

export const Rules = {
  Auth,
  Posts,
}