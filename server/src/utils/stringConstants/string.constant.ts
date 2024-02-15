import { HttpStatus } from '@nestjs/common'

export const saltOrRounds = 10
export const DESCENDING_ORDER = 'desc'
export const ROLES_KEY = 'roles'
export const JWT_SECRET = 'JWT_SECRET'
export const JWT_EXPIRES_TIME = '5d'
export const CLOUDINARY = 'Cloudinary'

export const SUCCESS_MESSAGES = {
  AUCTION_STATUS_UPDATED: 'Auction Status Updated Successfully',
  CREATEMESSAGE: (name: string) => `${name} has been created Successfully`,
  UPDATEMESSAGE: (name: string) => `${name} has been updated Successfully`,
  DELETEMESSAGE: (name: string) => `${name} has been deleted Successfully`
}
export const ERROR_MESSAGES = {
  EMAIL_TAKEN: 'Email ALready Taken',
  NOT_FOUND: 'No record found for given ID',
  NOT_REGISTERED: 'You are Not Registered User',
  PASSWORD_EMAIL_INVALID: 'Email or Password is Invalid',
  SESSION_EXPIRED: 'Your Session has expired! Please sign In',
  PERMISSION_DENIED: 'You are not Authorized to perform this Action',
  FOREIGN_KEY_VIOLATION: 'Foreign key constraint violation.',
  TRANSACTION_ROLLBACK: 'Transaction rollback.',
  INVALID_INPUT_VALUE: 'Invalid input value.',
  RECORD_EXIST: 'Record Already Exist with this value',
  AUCTION_NAME_ALREADY_TAKEN: 'Auction name already Taken. Please Choose Different name',
  PRODUCT_DOES_NOT_EXIST: 'Product Does not Exist',
  BIDDING_AMOUNT_MUST_BE_GREATER: 'Biding Amount must be greater than Minimum Bid',
  FAILED_RUNNING_BID_JOB: 'Failed running Bid Job',
  AUCTION_HAS_ENDED: 'Auction has ended',
  BID_MUST_BE_HIGHER: 'Biding amount must be Higher than Maximum Bid',
  UPLOAD_IMAGE_FAILED: 'Upload Image Failed'
}

export const MESSAGES = {
  PRODUCT: 'Product',
  AUCTION: 'Auction',
  USER: 'User'
}

export const PRISMA_ERROR_MAP: Record<string, { status: number; message: string }> = {
  P2002: { status: HttpStatus.CONFLICT, message: ERROR_MESSAGES.RECORD_EXIST },
  P2003: { status: HttpStatus.BAD_REQUEST, message: ERROR_MESSAGES.FOREIGN_KEY_VIOLATION },
  P2016: { status: HttpStatus.NOT_FOUND, message: ERROR_MESSAGES.NOT_FOUND },
  P2020: { status: HttpStatus.BAD_REQUEST, message: ERROR_MESSAGES.INVALID_INPUT_VALUE },
  P4001: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: ERROR_MESSAGES.TRANSACTION_ROLLBACK }
}

export const HTTP_METHOD = {
  POST: 'POST',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  GET: 'GET'
}
