import { z } from 'zod';

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 15;
export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 20;

export const REQUIRED_ERROR = (fieldName: string) => `${fieldName} is required`;
export const MUST_BE_STRING_ERROR = (fieldName: string) => `${fieldName} must be a string`;

export const INVALID_EMAIL_ERROR = 'Invalid email address';

export const PASSWORD_MIN_LENGTH_ERROR = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
export const PASSWORD_MAX_LENGTH_ERROR = `Password must be at most ${MAX_PASSWORD_LENGTH} characters long`;
export const PASSWORD_UPPERCASE_ERROR = 'Password must contain at least one uppercase letter';
export const PASSWORD_LOWERCASE_ERROR = 'Password must contain at least one lowercase letter';
export const PASSWORD_NUMBER_ERROR = 'Password must contain at least one number';
export const PASSWORD_MISMATCH_ERROR = 'Passwords must be equal';

// Primitives validation

export const EmailSchema = z
  .string({
    required_error: REQUIRED_ERROR('Email'),
    invalid_type_error: MUST_BE_STRING_ERROR('Email'),
  })
  .email({ message: INVALID_EMAIL_ERROR })
  .trim()
  .toLowerCase();

export const PasswordLoginSchema = z
  .string({
    required_error: REQUIRED_ERROR('Password'),
    invalid_type_error: MUST_BE_STRING_ERROR('Password'),
  })
  .min(MIN_PASSWORD_LENGTH, { message: PASSWORD_MIN_LENGTH_ERROR })
  .max(MAX_PASSWORD_LENGTH, { message: PASSWORD_MAX_LENGTH_ERROR });

export const PasswordRegisterSchema = PasswordLoginSchema.refine(
  (password) => /[A-Z]/.test(password),
  {
    message: PASSWORD_UPPERCASE_ERROR,
  },
)
  .refine((password) => /[a-z]/.test(password), {
    message: PASSWORD_LOWERCASE_ERROR,
  })
  .refine((password) => /[0-9]/.test(password), {
    message: PASSWORD_NUMBER_ERROR,
  });

export const UserNameSchema = z
  .string({
    required_error: REQUIRED_ERROR('Profile name'),
    invalid_type_error: MUST_BE_STRING_ERROR('Profile name'),
  })
  .min(MIN_USERNAME_LENGTH)
  .max(MAX_USERNAME_LENGTH)
  .trim();

// Form validation

export const LoginFormSchema = z.object({
  email: EmailSchema,
  password: PasswordLoginSchema,
});

export const RegisterFormSchema = z
  .object({
    name: UserNameSchema,
    email: EmailSchema,
    password: PasswordRegisterSchema,
    confirmPassword: PasswordLoginSchema,
  })
  .refine((object) => object.password === object.confirmPassword, {
    message: PASSWORD_MISMATCH_ERROR,
    path: ['confirmPassword'],
  });
