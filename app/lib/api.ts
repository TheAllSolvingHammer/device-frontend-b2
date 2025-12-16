import type { FetchMethod } from '~/models/fetch/fetch.models'
import { UnauthorizedError } from '~/models/response-errors/unauthorized-error'
import type {RegisterErrorResponse} from "~/models/auth/auth.models";
import {string} from "zod";

export async function fetchApi<TData = unknown>(
  input: URL | RequestInfo,
  method: FetchMethod = 'GET',
  token: string | null,
  body?: Record<string, unknown>,
  init?: RequestInit | undefined
) {
  const internalInit: RequestInit = {
    ...(init ?? {}),
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(init?.headers ?? {}),
    },
    method,
  }

  if (body) {
    internalInit.body = JSON.stringify(body)
  }

  const response = await fetch(input, internalInit)

  if (response.status === 401) {
    throw new UnauthorizedError()
  }

  const data = (await response.json()) as TData | RegisterErrorResponse

  if (!response.ok) {
      const errorData=data as RegisterErrorResponse;
      if(errorData && errorData.validations.length>0) {
          let message="";
          const strs=errorData.validations;
          for (const key in strs) {
              message+=`${key}: ${errorData.validations[key]}\n`
          }
          console.log(message);
          throw new Error(message)
      }
    throw new Error('Request failed')
  }

  return data
}
