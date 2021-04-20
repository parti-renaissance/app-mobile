import { FormViolation } from '../entities/DetailedProfile'

export class CredentialsInvalidError extends Error {}
export class ServerTimeoutError extends Error {}
export class BadRequestError extends Error {}
export class UnauthorizedError extends Error {}
export class ForbiddenError extends Error {}
export class NotFoundError extends Error {}
export class InternalServerError extends Error {}
export class RefreshTokenPermanentlyInvalidatedError extends Error {}
export class DepartmentNotFoundError extends Error {}
export class CacheMissError extends Error {}
export class ProfileFormError extends Error {
  violations: Array<FormViolation>
  constructor(violations: Array<FormViolation>) {
    super()
    this.violations = violations
  }
}
export class EventSubscriptionError extends Error {}
