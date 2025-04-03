import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = ({ target: { name, type, files, value } }) => {
        setValues(prevValues => ({
            ...prevValues,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit,
        values
    };
};
