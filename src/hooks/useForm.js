import {useState} from "react";

export function useForm() {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)

    function handleChangeInput(e) {
        const{name , value, validationMessage} = e.target;
        
        setValues({...values, [name]: value});
        
        if (name === "email") {
            const isEmail = (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            console.log("isemail", isEmail(value));
             
            if (!isEmail(value)) {
                e.target.setCustomValidity('Некорректный формат почты'); 
                setErrors({...errors, [name]: 'Некорректный формат почты'});
            } else {
                e.target.setCustomValidity('');
                setErrors({...errors, [name]: ''});
            }

            setIsFormValid(e.target.closest('form').checkValidity() && isEmail(value));
            return;
        }

        setErrors({...errors, [name]: validationMessage}); 
        setIsFormValid(e.target.closest('form').checkValidity());
    }

    return {
        values,
        errors,
        isFormValid,
        handleChangeInput
    }
}