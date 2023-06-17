import React, {useState} from "react";

import 'components/NewToy/Form/style.css'

const EditForm = ({onSubmit, mess}) => {
    const [message, setState] = useState(mess);
    return <form className="toy__form" onSubmit={(e) => {
        e.preventDefault();
        onSubmit(message)
    }}>
        <div className="toy__form-field">
        <span className="toy__form-title">Напишите свое пожелание</span>
        <textarea onChange={e => setState(e.target.value)} value={message}/>
        </div>
        <button type="submit">Сохранить</button>
    </form>
}
export default EditForm;
