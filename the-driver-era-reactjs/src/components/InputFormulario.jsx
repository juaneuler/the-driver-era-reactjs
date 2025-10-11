import React from "react";

const InputFormulario = ({ 
    label, 
    name, 
    register, 
    errors, 
    type = "text", 
    placeholder, 
    validation 
}) => {
    const tieneError = !!errors[name];

    return (
        <div className="campoFormulario">
            <input
                type={type}
                placeholder={placeholder || label}
                className={tieneError ? "inputError" : ""}
                {...register(name, validation)}
            />
            {tieneError && <p className="mensajeError">{errors[name]?.message}</p>}
        </div>
    );
};

export default InputFormulario;