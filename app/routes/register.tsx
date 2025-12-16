import type {Route} from "./+types/register"
import {RegisterForm} from "~/components/auth/register-form";


export function meta({}: Route.MetaArgs) {
    return [
        { title: 'React Router App' },
        { name: 'description', content: 'Register page' },
    ]
}

export default function Register() {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <RegisterForm />
        </div>
    )
}