'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import { register } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input, InputDescription, InputError } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RegisterForm() {
  const [state, formAction] = useActionState(register, {});
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>Enter your personal data to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="email">Profile name</Label>
            <Input id="name" name="name" type="text" placeholder="Ivan Ivanov" required />
            <InputDescription>This name will be displayed with your profile</InputDescription>
            <InputError errors={state?.errors?.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            <InputError errors={state?.errors?.email} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
            />
            <InputDescription>A password must contain letters and digits</InputDescription>
            <InputError errors={state?.errors?.password} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Confirm password</Label>
            <Input
              id="confirm_password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
            />
            <InputError errors={state?.errors?.confirmPassword} />
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
