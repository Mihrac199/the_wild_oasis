import { useForm } from "react-hook-form"
import { useCreateCabin } from "./useCreateCabin"
import { useEditCabin } from "./useEditCabin"

import Input from "../../ui/Input"
import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"
import FileInput from "../../ui/FileInput"
import Textarea from "../../ui/Textarea"

export default function CreateCabinForm({ cabinToEdit = {} }) {

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId }, {
        onSuccess: () => reset(data)
      });
    }
    else createCabin({ ...data, image: image }, {
      onSuccess: () => reset(data)
    });

  }

  return (

    <Form onSubmit={handleSubmit(onSubmit)}>

      <FormRow label="Cabin Name" error={errors?.name?.message}>

        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This Field İs Required"
          })} />

      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>

        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("description", {
            required: "This Field İs Required"
          })} />

      </FormRow>

      <FormRow label="Cabin Photo">

        <FileInput
          type="file"
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This Field İs Required"
          })}
        />

      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>

        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create New Cabin"}</Button>
      </FormRow>

    </Form>

  )

}