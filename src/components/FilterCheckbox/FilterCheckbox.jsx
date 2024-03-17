import {useState} from "react";

export default function FilterCheckbox({handleSetSearchTumbler, searchTumbler}) {
    const checkBox = searchTumbler;

    const checkBoxToggleClassName = `checkbox__label ${!checkBox ? "checkbox__label_inactive" : "checkbox__label_active"}`
    function toggleCheckBox() {
        handleSetSearchTumbler();
    }

    return (
        <div className="checkbox">
            <button
                    className={checkBoxToggleClassName}
                    onClick={toggleCheckBox}/>
            <p className="checkbox__title">Короткометражки</p>
        </div>
    )
}