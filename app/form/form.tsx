"use client"
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { SubmitHandler, useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "./validation";
import { useRouter } from 'next/navigation'
 
import {reactLocalStorage} from 'reactjs-localstorage'; 

  export function SimpleRegistrationForm() {

    const router = useRouter();
 

    const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {  },
    });
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors, isSubmitting },
    } = form;
    const onSubmitForm: SubmitHandler<FormSchema> =  (data) => {
      // call the server action
      //await onSubmitForm(data);
      reactLocalStorage.set("currentPlayerName",data.name);
      reactLocalStorage.set("currentPlayerDepartment",data.department);
      console.log("Form Data:",data);
      router.push('/game', { scroll: false });
    };
  
    return (
       <Card color="white" shadow={true} className="p-6">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Game Time
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Nice to meet you! Enter your details to play.
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              type="text"
              size="lg"
              {...register("name")}
              placeholder="Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <p className="error">{errors.name && errors.name.message}</p>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Department
            </Typography>
            <Input
              type="text"
              {...register("department")}
              size="lg"
              placeholder="Department"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <p className="error">{errors.department && errors.department.message}</p>
            </div>
          <Button type="submit" className="mt-6" color="green" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Loading" : "Play Game"}
          </Button>
        </form>
      </Card>
    );
  }