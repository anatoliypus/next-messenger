'use server';

import { LoginFormState } from '@/lib/types';
import { LoginFormSchema } from '@/lib/zod-schemas';

export async function login(
  prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const validated = LoginFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Invalid email or/and password',
    };
  }
  return {
    errors: {},
    message: 'ok'
  };
}
