export function extractErrors(error: any) {
  error = error.data;

  const errors: string[] = [];

  if (error.errors) {
    for (const key in error.errors) {
      errors.push(...error.errors[key]);
    }
  }
  else {
    errors.push(error.message);
  }

  return errors;
}