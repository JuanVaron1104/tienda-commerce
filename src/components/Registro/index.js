import { useState, useEffect } from "react";
import StepOneRegister from "./StepOneRegister";
import StepTwoRegister from "./StepTwoRegister";
import axios from 'axios'

function RegisterComponent({ title, showLoginLabel=true, registerData, handleChange, sendRegister }) {

    const [step, setStep] = useState(0)
    const [ciudades, setCiudades] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        obtenerCiudades()
    }, [])

    const obtenerCiudades = async () => {
        const { data: ciudades } = await axios.get("http://localhost:5000/Ciudades")
        setCiudades(ciudades)
        setLoading(false)
    }

    const nextStep = () => {
        if (step < 1) {
            setStep(step + 1)
        }
    }

    const backStep = () => {
        if (step > 0) {
            setStep(step - 1)
        }
    }

    if (loading) {
        return <h1>Loading</h1>
    }

    if (step === 0) {
        return <StepOneRegister
            title={title}
            showLoginLabel={showLoginLabel}
            ciudades={ciudades}
            nextStep={nextStep}
            handleChange={handleChange}
            registerData={registerData}
        />
    } else {
        return <StepTwoRegister
            title={title}
            ciudades={ciudades}
            backStep={backStep}
            registerData={registerData}
            handleChange={handleChange}
            sendRegister={sendRegister}
        />
    }
}

export default RegisterComponent
