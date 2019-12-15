import React from 'react';
import classes from './categories.module.scss';

const categories = (props) => {
    //console.log(props;)

    let inputEl = React.createRef();
    let currentLi = React.createRef();

    function editCategory(category) {
        inputEl.current.focus();
        props.editCategory(category)
    }

    function inputBlur(){
        props.clearInput()
        console.log('blur')
    }

    return (
        <div className={classes.categories_navigation}>
            <div className={classes.add_category_wrapper}>
                <input type="text"
                       value={props.inputValue}
                       onChange={(event) => props.setCategoryName(event)}
                       ref={inputEl}
                       onBlur={inputBlur}/>
                <button disabled={props.inputValue === ''} onClick={props.renderCategory}>Add Category</button>
            </div>

            {props.errorMessage ? <div className={classes.errorMessage}>Category allready exist!</div> : null}

            <div className={classes.categories_wrapper}>
                <ul>
                    {props.categoriesList.map((category, index) => {
                        return <li
                            key={index}
                            onClick={() => props.selectCategory(category)}
                            className={category === props.highlighted ? classes.highlight : null}
                            ref={currentLi}>
                            {category}
                            {category === props.highlighted ?
                                <div className={classes.manage_category}>
                                    <ul>
                                        <li onClick={() => props.deleteCategory(category)}>delete</li>
                                        <li onClick={() => editCategory(category)}>edit</li>
                                        <li>view deteils</li>
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
