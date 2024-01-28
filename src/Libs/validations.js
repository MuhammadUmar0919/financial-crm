// yup import
import {
    showErrors
} from 'Utils/showErrors';
import {
    PWD_REGEX,
    EMAIL_REGEX,
    PHONE_REGEX,
} from 'Utils/validators';
import * as yup from 'yup';

export const simpleSchema = yup.object().shape({
    fullName: yup.string().required(),
    username: yup.string().required(),
    email: yup
        .string()
        .email()
        .required()
        .matches(EMAIL_REGEX, 'Email is not valid'),
    age: yup.string().required(),
    address: yup.string().required(),
    phoneNumber: yup
        .string()
        .required()
        .matches(PHONE_REGEX, 'Phone number is not valid'),
});

export const clientSchema = yup.object().shape({
    address: yup.string().max(120).required(),
    fullName: yup.string().required(),
    country: yup.string().required(),
    companyEmail: yup
        .string()
        .email()
        .required()
        .matches(EMAIL_REGEX, 'Company email is not valid'),
    companyName: yup.string().required(),
    phoneNumber: yup
        .string()
        .required()
        .matches(PHONE_REGEX, 'Phone number is not valid'),
});

export const loginChema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required()
        .matches(EMAIL_REGEX, 'You have entered an incorrect email!'),
    password: yup
        .string()
        .required()
        .matches(PWD_REGEX, 'You entered the wrong password!')
        .min(8, (obj) => showErrors('Password', obj.value.length, obj.min)),
});

export const serviceChema = yup.object().shape({
    serviceName: yup
        .string()
        .required(),
    status: yup
        .string()
        .required()
});

export const statusChema = yup.object().shape({
    categoryName: yup
        .string()
        .required(),
    statusName: yup
        .string()
        .required()
});