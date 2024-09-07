import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react'
import { MensajeInformativo } from '../../../common/Alerts';
import axios from 'axios';

function GananciasPorDia() {
    const [loading, setLoading] = useState(true)
    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])

    const state = {
        labels: labels,
        datasets: [
            {
                label: 'VENTA DIARIA',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: data
            }
        ]
    }

    useEffect(() => {
        getComprasPorDia()
    }, [])

    const getComprasPorDia = async () => {
        try {
            let datos = []
            let label = []
            const { data } = await axios.get("http://localhost:5000/Reportes/VentasPorDia")

            data.forEach(dato => {
                label.push(dato.Dia)
                datos.push(dato.Numero)
            });

            setData(datos)
            setLabels(label)

            setLoading(false)
        } catch (error) {
            console.log(error)
            console.log(error.response)
            return MensajeInformativo('ERROR', error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        loading ? <h1>Cargando...</h1>
            :
            <Line
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
    )
}

export default GananciasPorDia
