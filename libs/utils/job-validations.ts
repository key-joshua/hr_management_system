
type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export const validateRequired = (value: any, fieldName: string): ValidationResult => {
  if (value === undefined || value === null || value === '') {
    return {
      isValid: false,
      message: `${fieldName} is required`
    };
  }
  return { isValid: true };
};

export const validateLength = (
  value: string,
  fieldName: string,
  options: { min?: number; max?: number }
): ValidationResult => {
  if (options.min !== undefined && value.length < options.min) {
    return {
      isValid: false,
      message: `${fieldName} must be at least ${options.min} characters`,
    };
  }

  if (options.max !== undefined && value.length > options.max) {
    return {
      isValid: false,
      message: `${fieldName} must be no more than ${options.max} characters`,
    };
  }

  return { isValid: true };
};

export const validateNumberRange = (
  value: number,
  fieldName: string,
  options: { min?: number; max?: number }
): ValidationResult => {
  if (value < 0) {
    return {
      isValid: false,
      message: `${fieldName} cannot be negative`,
    };
  }

  if (options.min !== undefined && value < options.min) {
    return {
      isValid: false,
      message: `${fieldName} must be at least ${options.min}`,
    };
  }

  if (options.max !== undefined && value > options.max) {
    return {
      isValid: false,
      message: `${fieldName} must be no more than ${options.max}`,
    };
  }

  return { isValid: true };
};

export const validateJob = (
  jobData: {
    job_title: string;
    job_description: string;
    positions_left: number;
    interviewed?: number;
    applications?: number;
    rejections?: number;
    pending_feedback?: number;
    offers?: number;
  },
  options: { validateAllFields?: boolean } = { validateAllFields: false }
): ValidationResult => {
  const titleValidation = [
    validateRequired(jobData.job_title, 'Job title'),
    validateLength(jobData.job_title, 'Job title', { min: 5, max: 100 }),
  ].find(validation => !validation.isValid);

  if (titleValidation) return titleValidation;

  const descriptionValidation = [
    validateRequired(jobData.job_description, 'Job description'),
    validateLength(jobData.job_description, 'Job description', { min: 20, max: 2000 }),
  ].find(validation => !validation.isValid);

  if (descriptionValidation) return descriptionValidation;

  const positionsValidation = [
    validateRequired(jobData.positions_left, 'Number of positions'),
    validateNumberRange(jobData.positions_left, 'Number of positions', { min: 0, max: 1000 }),
  ].find(validation => !validation.isValid);

  if (positionsValidation) return positionsValidation;

  if (!options.validateAllFields) {
    return { isValid: true };
  }

  const getValidations = (validations: (ValidationResult | undefined)[]): ValidationResult[] => {
    return validations.filter((v): v is ValidationResult => v !== undefined);
  };

  if (jobData.applications !== undefined) {
    const applicationsValidation = getValidations([
      validateNumberRange(jobData.applications, 'Number of applications', { min: 0, max: 10000 }),
    ]).find(validation => !validation.isValid);
    if (applicationsValidation) return applicationsValidation;
  }

  if (jobData.interviewed !== undefined) {
    const interviewedValidation = getValidations([
      validateNumberRange(jobData.interviewed, 'Number interviewed', { min: 0, max: 10000 }),
      jobData.applications !== undefined ?
        validateNumberRelation(jobData.interviewed, 'Number interviewed', jobData.applications, 'applications') :
        undefined
    ]).find(validation => !validation.isValid);
    if (interviewedValidation) return interviewedValidation;
  }

  if (jobData.rejections !== undefined) {
    const rejectionsValidation = getValidations([
      validateNumberRange(jobData.rejections, 'Number of rejections', { min: 0, max: 10000 }),
      jobData.interviewed !== undefined ?
        validateNumberRelation(jobData.rejections, 'Number of rejections', jobData.interviewed, 'interviewed') :
        undefined
    ]).find(validation => !validation.isValid);
    if (rejectionsValidation) return rejectionsValidation;
  }

  if (jobData.pending_feedback !== undefined) {
    const pendingFeedbackValidation = getValidations([
      validateNumberRange(jobData.pending_feedback, 'Pending feedback count', { min: 0, max: 10000 }),
      jobData.interviewed !== undefined && jobData.rejections !== undefined && jobData.offers !== undefined ?
        validateNumberRelation(
          jobData.pending_feedback,
          'Pending feedback count',
          jobData.interviewed - jobData.rejections - jobData.offers,
          'interviewed minus rejections and offers'
        ) :
        undefined
    ]).find(validation => !validation.isValid);
    if (pendingFeedbackValidation) return pendingFeedbackValidation;
  }

  if (jobData.offers !== undefined) {
    const offersValidation = getValidations([
      validateNumberRange(jobData.offers, 'Number of offers', { min: 0, max: 10000 }),
      jobData.interviewed !== undefined ?
        validateNumberRelation(jobData.offers, 'Number of offers', jobData.interviewed, 'interviewed') :
        undefined,
      validateNumberRelation(jobData.offers, 'Number of offers', jobData.positions_left, 'positions left', 'lessThanOrEqual')
    ]).find(validation => !validation.isValid);
    if (offersValidation) return offersValidation;
  }

  return { isValid: true };
};

const validateNumberRelation = (
  value: number,
  fieldName: string,
  compareValue: number,
  compareFieldName: string,
  relation: 'lessThanOrEqual' | 'lessThan' | 'equal' | 'greaterThan' | 'greaterThanOrEqual' = 'lessThanOrEqual'
): ValidationResult => {
  let isValid = true;
  let message = '';

  switch (relation) {
    case 'lessThanOrEqual':
      isValid = value <= compareValue;
      message = `${fieldName} must be less than or equal to ${compareFieldName}`;
      break;
    case 'lessThan':
      isValid = value < compareValue;
      message = `${fieldName} must be less than ${compareFieldName}`;
      break;
    case 'equal':
      isValid = value === compareValue;
      message = `${fieldName} must equal ${compareFieldName}`;
      break;
    case 'greaterThan':
      isValid = value > compareValue;
      message = `${fieldName} must be greater than ${compareFieldName}`;
      break;
    case 'greaterThanOrEqual':
      isValid = value >= compareValue;
      message = `${fieldName} must be greater than or equal to ${compareFieldName}`;
      break;
  }

  return isValid
    ? { isValid: true }
    : { isValid: false, message: `${message} (${compareValue})` };
};
