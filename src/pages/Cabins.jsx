import { useState } from "react"
import Row from "../ui/Row"
import Heading from "../ui/Heading"
import Button from "../ui/Button"
import CabinTable from "../features/cabins/CabinTable"
import CreateCabinForm from "../features/cabins/CreateCabinForm"

export default function Cabins() {

  const [showForm, setShowForm] = useState(false);

  return (

    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        <Button
          onClick={() => setShowForm(show => !show)}
        >Add New Cabin
        </Button>

        {showForm && <CreateCabinForm />}

      </Row>
    </>

  )

}