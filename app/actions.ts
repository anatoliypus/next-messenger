'use server';

import { z } from 'zod';

import { FormState, LoginFormState, RegisterFormState } from '@/lib/types';
import { LoginFormSchema, RegisterFormSchema } from '@/lib/zod-schemas';

async function validateForm(
  formData: FormData,
  schema: z.ZodSchema,
  errorMesssage = 'Invaild data',
  okMessage = 'OK',
): Promise<FormState> {
  const validated = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: errorMesssage,
    };
  }
  return {
    errors: {},
    message: okMessage,
  };
}

export async function login(
  previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  return validateForm(formData, LoginFormSchema, 'Invalid email or/and password', 'ok');
}

export async function register(
  state: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  return validateForm(formData, RegisterFormSchema, 'Please fill all the fields properly', 'ok');
}
