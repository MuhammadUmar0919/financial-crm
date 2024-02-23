import * as z from 'zod';
import {
    showErrors
} from '@/Utils/showErrors';
import {
    EMAIL_REGEX,
    PHONE_REGEX,
    PWD_REGEX
} from '@/Utils/validators';

// Simple schema
export const simpleSchema = z.object({
    fullName: z.string(),
    username: z.string(),
    email: z.string().email().regex(EMAIL_REGEX, {
        message: 'Email is not valid'
    }),
    age: z.string(),
    address: z.string(),
    phoneNumber: z.string().regex(PHONE_REGEX, {
        message: 'Phone number is not valid'
    }),
});

// Client schema
export const clientSchema = z.object({
    address: z.string().max(120),
    fullName: z.string(),
    country: z.string(),
    companyEmail: z.string().email().regex(EMAIL_REGEX, {
        message: 'Company email is not valid'
    }),
    companyName: z.string(),
    phoneNumber: z.string().regex(PHONE_REGEX, {
        message: 'Phone number is not valid'
    }),
});

// Login schema
export const loginSchema = z.object({
    email: z.string().email().regex(EMAIL_REGEX, {
        message: 'You have entered an incorrect email!'
    }),
    password: z.string().regex(PWD_REGEX, {
        message: 'You entered the wrong password!'
    }).min(8, (obj) => showErrors('Password', obj.value.length, obj.min)),
});

// Service schema
export const serviceSchema = z.object({
    serviceName: z.string(),
    status: z.string(),
    price: z.string(),
});

// Status schema
export const statusSchema = z.object({
    categoryName: z.string(),
    statusName: z.string(),
});