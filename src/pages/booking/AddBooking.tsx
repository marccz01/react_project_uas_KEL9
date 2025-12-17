import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"

interface FromBooking {
    tempat : string,
    namaRuangan : string,
    waktu : string,
    statusPemesanan : string
}

function AddBooking() {
    const [form, setForm] = useState<FromBooking>({
        tempat : "",
        namaRuangan : "",
        waktu : "",
        statusPemesanan : ""
    })

    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSumbit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await ApiClient.post("/booking", form);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between my-3">
        <h4>Add Booking Page</h4>
        <NavLink to="/booking" className="btn btn-primary">List Booking</NavLink>
        </div>
    <div>
        <Form onSubmit={handleSumbit}>
            <Form.Group className="mb-3" controlId="formTempat">
                <Form.Label>Tempat</Form.Label>
                <Form.Control
                    value={form.tempat}
                    onChange={handleInputChange}
                    name="tempat"
                    type="text"
                    placeholder="Tempat"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNamaRuangan">
                <Form.Label>Nama Ruangan</Form.Label>
                <Form.Control
                    value={form.namaRuangan}
                    onChange={handleInputChange}
                    name="namaRuangan"
                    type="text"
                    placeholder="Nama Ruangan"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWaktu">
                <Form.Label>Waktu</Form.Label>
                <Form.Control
                    value={form.waktu}
                    onChange={handleInputChange}
                    name="waktu"
                    type="text"
                    placeholder="Waktu"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatusPemesanan">
                <Form.Label>Status Pemesanan</Form.Label>
                <Form.Control
                    value={form.statusPemesanan}
                    onChange={handleInputChange}
                    name="statusPemesanan"
                    type="text"
                    placeholder="Status Pemesanan"/>
            </Form.Group>

            <Button type="submit" variant="primary">
                SUBMIT
            </Button>
        </Form>
    </div>
</div>
}
export default AddBooking