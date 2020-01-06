import React from 'react';
import classes from './categories.module.scss';

const categories = (props) => {

    const currentCategoryID = props.state.currentCategoryID;
    const editHandler = (event, index) => {
        event.stopPropagation()
        props.editCategoryHandler(index)
    }
    
    return (
        <div className={classes.categories_navigation}>
    
            <div className={classes.categories_wrapper}>
                <ul>
                    {props.state.locations.map((location, index) => {
                        return <li
                            key={index}
                            id={index}
                            onClick={() => props.selectCategoryHandler(index)}
                            className={currentCategoryID === index ? classes.highlight : null}>
                            
                                {props.state.categories[index]} at {location}
                            
                            {currentCategoryID === index ?
                                <div className={classes.manage_location}>
                                    <ul>
                                        <li onClick={() => props.deleteCategoryHandler(index)}>delete</li>
                                        <li onClick={(event) => editHandler(event, index)}>edit</li>
                                        <li onClick={(event) => props.setCoordinatesHandler(currentCategoryID)}>view deteils</li>
                                    </ul>
                                </div>
                            : null}
        
                        </li>
                    })}
                </ul>
            </div>

        </div>
    )
}

export default categories;
