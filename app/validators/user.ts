import vine from '@vinejs/vine'
/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(1).maxLength(100),
    email: vine.string().email().trim(),
    password: vine.string().minLength(3),
  })
)
