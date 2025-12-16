import { z } from 'zod'
import type { User } from '../user.models'

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Потребителското име е задължително.' }),
  password: z
    .string()
    .min(4, { message: 'Паролата трябва да е поне 4 символа.' }),
})

export type LoginData = z.infer<typeof loginSchema>

export type LoginResponse = {
  user: User
  token: string
}


export const registerSchema = z.object({
    fullName: z
        .string()
        .min(2, { message: 'Името трябва да съдържа поне 2 символа.' })
        .max(100, { message: 'Името е твърде дълго.' }),

    password: z
        .string()
        .min(6, { message: 'Паролата трябва да е поне 6 символа.' }),

    email: z

        .email({ message: 'Моля, въведете валиден имейл адрес.' })
        .min(1, { message: 'Имейлът е задължителен.' }),

    phone: z
        .string()
        .min(8, { message: 'Телефонният номер е твърде кратък.' })
        .max(20, { message: 'Телефонният номер е твърде дълъг.' })
        .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, {
            message: 'Моля, въведете валиден телефонен номер.'
        }),

    address: z
        .string()
        .min(10, { message: 'Адресът трябва да бъде поне 10 символа и достатъчно подробен.' }),

    purchaseDate: z
        .date()
        .max(new Date(), { message: 'Датата на покупка не може да бъде в бъдещето.' }),

    deviceSerialNumber: z
        .string()
        .min(1, { message: 'Серийният номер е задължителен.' })
});


export type RegisterData = z.infer<typeof registerSchema>;

export type RegisterErrorResponse = {
    error: string;
    errorCode: number;
    timeStamp: Date;
    type: string;
    validations: Array<string>;
};
