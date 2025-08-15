import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { createCabin } from "../../services/apiCabins"

import Input from "../../ui/Input"
import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"
import FileInput from "../../ui/FileInput"
import Textarea from "../../ui/Textarea"

export default function CreateCabinForm() {

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({

    mutationFn: createCabin,

    onSuccess: () => {
      toast.success("New Cabin Successfully Created");

      queryClient.invalidateQueries({
        queryKey: ["cabin"]
      });

      reset();

    },

    onError: err => toast.error(err.message)

  })


  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  return (

    <Form onSubmit={handleSubmit(onSubmit)}>

      <FormRow label="Cabin Name" error={errors?.name?.message}>

        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This Field İs Required"
          })} />

      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>

        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This Field İs Required",
            min: {
              value: 1,
              message: "Capacity Should Be At Least 1"
            }
          })} />

      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>

        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This Field İs Required",
            min: {
              value: 1,
              message: "Capacity Should Be At Least 1"
            }
          })} />

      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>

        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: "This Field İs Required",

            validate: value => {
              const regularPrice = Number(getValues().regularPrice);
              const discount = Number(value);
              if (!regularPrice) return true;
              return discount <= regularPrice || "Discount Should Be Less Than Regular Price";
            }

          })} />

      </FormRow>

      <FormRow label="Description For Website" error={errors?.description?.message}>

        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "This Field İs Required"
          })} />

      </FormRow>

      <FormRow label="Cabin Photo">

        <FileInput
          type="file"
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image", {
            required: "This Field İs Required"
          })}
        />

      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>

        <Button disabled={isCreating}>Add Cabin</Button>
      </FormRow>

    </Form>

  )

}