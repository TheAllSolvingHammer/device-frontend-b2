import { type RegisterData, type RegisterErrorResponse, registerSchema } from "~/models/auth/auth.models";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { Button } from '../ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { useLocation, useNavigate } from 'react-router'
import useFetch from '~/lib/hooks/use-fetch.hook'
import { cn, getApiUrl } from '~/lib/utils'
import {format} from "date-fns"
import {bg} from "date-fns/locale"
import { Spinner } from "~/components/ui/spinner";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { useState } from "react";
import { ResponseError } from "~/models/response-errors/response-error";

export function RegisterForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { fetch, isLoadingRef } = useFetch<RegisterErrorResponse>();
    const [registerError, setRegisterError] = useState<string | null>(null);

    const form = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            password: '',
            email: '',
            phone: '',
            address: '',
            deviceSerialNumber: '',

        },
    });

    const onSubmit = async (data: RegisterData) => {
        if (isLoadingRef.current) return;
        setRegisterError(null);

        try {
            const apiUrl = getApiUrl('/users/registration');
            await fetch(apiUrl, 'POST', data);
            navigate("/login");
        } catch (error) {
            setRegisterError((error as ResponseError).message);
        }
    };

    const inputClasses = "focus-visible:ring-violet-500 focus-visible:border-violet-500";

    return (
        <div className="flex justify-center items-center min-h-[80vh] p-4">
            <Card className='w-full max-w-2xl shadow-lg border-violet-100'>
                <CardHeader className="space-y-1">
                    <CardTitle className='text-2xl text-center font-bold text-violet-900'>
                        Регистрация
                    </CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        Въведете данните си!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id='register-form' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                            <Controller
                                name='fullName'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="space-y-2">
                                        <FieldLabel htmlFor='fullname'>Име и Фамилия</FieldLabel>
                                        <Input
                                            {...field}
                                            id='fullname'
                                            className={inputClasses}
                                            placeholder='Иван Иванов'
                                            autoComplete='name'
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-rose-500" />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name='email'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="space-y-2">
                                        <FieldLabel htmlFor='email'>Имейл</FieldLabel>
                                        <Input
                                            {...field}
                                            id='email'
                                            // type='email'
                                            className={inputClasses}
                                            placeholder='email@example.com'
                                            autoComplete='email'
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-rose-500" />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name='phone'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="space-y-2">
                                        <FieldLabel htmlFor='phone'>Телефон</FieldLabel>
                                        <Input
                                            {...field}
                                            id='phone'
                                            type='tel'
                                            className={inputClasses}
                                            placeholder='+359 888 123 456'
                                            autoComplete='tel'
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-rose-500" />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name='deviceSerialNumber'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="space-y-2">
                                        <FieldLabel htmlFor='deviceSerialNumber'>Сериен номер</FieldLabel>
                                        <Input
                                            {...field}
                                            id='deviceSerialNumber'
                                            className={inputClasses}
                                            placeholder='SN-XXXXXXXX'
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-rose-500" />}
                                    </Field>
                                )}
                            />


                            <Controller
                                name='address'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="col-span-1 md:col-span-2 space-y-2">
                                        <FieldLabel htmlFor='address'>Адрес за доставка</FieldLabel>
                                        <Input
                                            {...field}
                                            id='address'
                                            className={inputClasses}
                                            placeholder='гр. Варна, бул. Левски'
                                            autoComplete='street-address'
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-rose-500" />}
                                    </Field>
                                )}
                            />


                            <Controller
                                name='purchaseDate'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="flex flex-col space-y-2">
                                        <FieldLabel htmlFor='purchaseDate'>Дата на закупуване</FieldLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal focus-visible:ring-violet-500",
                                                        !field.value && "text-muted-foreground",
                                                        fieldState.invalid && "border-rose-500 text-rose-500"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP", { locale: bg })
                                                    ) : (
                                                        <span>Изберете дата</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-violet-600" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 border-violet-200" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                    classNames={{
                                                        day_selected: "bg-violet-600 text-white hover:bg-violet-700",
                                                        day_today: "bg-violet-100 text-violet-900",
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-rose-500" />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name='password'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="space-y-2">
                                        <FieldLabel htmlFor='password'>Парола</FieldLabel>
                                        <Input
                                            {...field}
                                            id='password'
                                            type='password'
                                            className={inputClasses}
                                            placeholder='******'
                                            autoComplete='new-password'
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-rose-500" />}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Global Error Display */}
                        {registerError && (
                            <div className="mt-6 p-3 bg-rose-50 border border-rose-200 rounded-md flex items-center gap-2 text-rose-700 text-sm animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="h-4 w-4" />
                                <span>{registerError}</span>
                            </div>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="pt-4">
                    <Button
                        className='w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors duration-200'
                        type='submit'
                        size="lg"
                        form='register-form'
                        disabled={form.formState.isSubmitting || isLoadingRef.current}
                    >
                        {(form.formState.isSubmitting || isLoadingRef.current) && <Spinner className="mr-2 h-4 w-4 text-white" />}
                        Регистрация
                    </Button>
                    {/*<Button*/}
                    {/*    className='w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors duration-200'*/}
                    {/*    type='reset'*/}
                    {/*    size="lg"*/}
                    {/*    form='register-form'*/}
                    {/*    onClick={()=>form.reset()}*/}
                    {/*    // disabled={form.formState.isSubmitting || isLoadingRef.current}*/}
                    {/*>*/}
                    {/*    /!*{(form.formState.isSubmitting || isLoadingRef.current) && <Spinner className="mr-2 h-4 w-4 text-white" />}*!/*/}
                    {/*    Изчисти*/}
                    {/*</Button>*/}
                </CardFooter>
            </Card>
        </div>
    )
}