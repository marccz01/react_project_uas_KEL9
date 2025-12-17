import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"
import { useParams, useNavigate } from "react-router"

interface FromBooking {
    tempat : string,
    namaRuangan : string,
    waktu : string,
    statusPemesanan : string
}

interface ResponseData {
    data : {
        _id : string,
        tempat : string,
        namaRuangan : string,
        waktu : string,
        statusPemesanan : string,
        createdBy : string,
        createdAt : string,
        updateAt : string,
        _v : string
    },
    message : string
}

function EditBooking() {
    const params = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState<FromBooking>({
        tempat : "",
        namaRuangan : "",
        waktu : "",
        statusPemesanan : ""

    })

    const fetchBooking = useCallback(async() => {
        const response = await ApiClient.get(`/booking/${params.id}`)
        
        if(response.status === 200) {
            const responseData : ResponseData = response.data
            setForm({
                tempat : responseData.data.tempat,
                namaRuangan : responseData.data.namaRuangan,
                waktu : responseData.data.waktu,
                statusPemesanan : responseData.data.statusPemesanan
            })
        }
    }, [params])

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
            const response = await ApiClient.put(`/booking/${params.id}`, form);
            navigate("/booking", {
                replace : true
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between my-3">
        <h4>Edit Booking Page</h4>
        <NavLink to="/booking" className="btn btn-primary">List Booking</NavLink>
        </div>
    <div>
        <Form onSubmit={handleSumbit}>
            <Form.Group className="mb-3" controlId="formTempat">
                <Form.Label>Tempat</Form.Label>
                <Form.Control
                    value={form.tempat}
                    onChange={handleInputChange}
                    name="Tempat"
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
                Submit
            </Button>
        </Form>
    </div>
</div>
}
export default EditBooking

function useCallbBack(arg0: () => Promise<void>, arg1: any[]) {
    throw new Error("Function not implemented.")
}
