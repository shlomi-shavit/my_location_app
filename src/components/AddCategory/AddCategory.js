import React from 'react';
import AuxWraper from '../hoc/AuxWraper';
import classes from './addCategory.module.scss';
import SearchCity from '../SearchCity/SearchCity.js';

const AddCategory = (props) => {
    
    const buttonValidation = props.state.inputValue !== '' && 
                             props.state.categorySelect !== '' && 
                             !props.state.errorMessage && 
                             props.state.cityFromInputExist;

    return (
        <AuxWraper>
        
            <div className={classes.add_category_wrapper}>

                <SearchCity 
                    inputValue={props.state.inputValue}
                    setCategory={props.setCategory}
                    citiesJson={props.citiesJson}/>

                <div className={classes.select_wrapper}>
                    <select
                        onChange={(event) => props.setCategory(event.target.value, event.target.tagName, props.state.cityFromInputExist)}
                        value={props.state.categorySelect}>
                       <option>Select category</option>
                       <option>Parkings</option>
                       <option>Hotels</option>
                       <option>Resturants</option>
                    </select>
                </div>

                <button disabled={!buttonValidation} onClick={props.renderCategory}>
                    {props.state.editLocation === '' ? 'Add Category' : 'Change Category'}
                </button>
            </div>

            {props.state.errorMessage ? <div className={classes.errorMessage}>Category allready exist!</div> : null}
        </AuxWraper>
    )
}

export default AddCategory;
