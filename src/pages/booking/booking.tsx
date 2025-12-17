import { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router"
import ApiClient from "../../utils/Apiclient.ts"
import { Button, Table } from "react-bootstrap"

interface Booking {
    _id : string,
    tempat : string,
    namaRuangan : string,
    waktu : string,
    statusPemesanan : string,
    createdAt : string,
    updateAt : string
}

function Booking() {
    const [booking, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchBooking = useCallback(async() => {
        setLoading(true)
        const response = await ApiClient.get("/booking")

        if(response.status == 200) {
            setBookings(response.data.data)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])

    const handleDelete = async (bookingId : string) => {
        const response = await ApiClient.delete(`/booking/${bookingId}`)
        if(response.status == 200) {
            fetchBooking()
        }
    }

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between my-3">
            <h4>Booking Page</h4>
            <NavLink to="/booking/add-booking" className="btn btn-primary">Add Booking</NavLink>
        </div>
        <div>
             <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tempat</th>
                        <th>Nama Ruangan</th>
                        <th>Waktu</th>
                        <th>Status Pemesanan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading && <tr>
                            <td colSpan={5} className="text-center">Loading...</td>
                        </tr>
                    }
                    {
                        booking.length > 0 && booking.map((booking, index) => {
                            return <tr key={booking._id}>
                                <td>{index + 1}</td>
                                <td>{booking.tempat}</td>
                                <td>{booking.namaRuangan}</td>
                                <td>{booking.waktu}</td>
                                <td>{booking.statusPemesanan}</td>
                                <td>
                                    <NavLink to={`/booking/edit-booking/${booking._id}`}
                                    className="btn btn-warning me-2">Edit</NavLink>
                                    <Button className="btn btn-danger" onClick={() => handleDelete(booking._id)}>Delete</Button> 
                                </td> 
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    </div>
}
export default Booking