import React from 'react';
import Input from "../ui/input/input";

const AddMessageComponent = ({value, onChange, onKeyUp}) => {
    return (
        <div className="fixed b-24 r-24 l-444 message">
            <Input placeholder='Введите сообщение' value={value} onChange={onChange} onKeyUp={onKeyUp}/>
        </div>
    );
};

export default AddMessageComponent;