// @flow

export const simpleValidateField = (
  fieldName: string,
  error: Object | string,
) => (errors: Object, fields: Object) => {
  const field = fields[fieldName];
  if (!field) {
    errors = { ...errors, [fieldName]: error };
  }
  return errors;
};
