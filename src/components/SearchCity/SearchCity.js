import React, {Component} from 'react';
import classes from './SearchCity.module.scss';

class SearchCity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            text: this.props.inputValue
        };
    }

    onTextChanged = (event, tagName) => {
        const value = event.target.value;
        let suggestions = [];
        let cities = [];
        const citiesData = this.props.citiesJson;
        
        if(value.length > 0){
            const regex = new RegExp(`${value}`, `i`);
            citiesData.map(city => {
                return cities.push(city.cityName);
            });
            suggestions = cities.sort().filter(citi => regex.test(citi));
        }
        
        this.props.setCategory(value, tagName);
        
        this.setState({
            suggestions: suggestions,
            text: this.props.inputValue
        });
    }

    renderSuggestions() {
        const suggestions = this.state.suggestions;
        if (suggestions.length !== 0) {
            return (
                <ul>
                    {suggestions.map((city, index)=> <li key={index} onClick={(event) => this.suggestionSelected(city, event.target.tagName)}>{city}</li>)}
                </ul>
            );
        }
    }

    suggestionSelected (city, tagName){
        this.props.setCategory(city, tagName);
        
        this.setState({
            suggestions: [],
            text: city
        })
    }

    render() {
        
        return (
            <div className={classes.SearchCity}>
                <input type="text" 
                       onChange={(event) => this.onTextChanged(event, event.target.tagName)}
                       value={this.props.inputValue}
                       placeholder='Add location'/>
                {this.renderSuggestions()}
            </div>
        )
    }

}

export default SearchCity;