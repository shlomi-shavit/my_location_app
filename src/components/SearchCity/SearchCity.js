import React, {Component} from 'react';
import classes from './SearchCity.module.scss';

class SearchCity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            citiesList: [],
            text: this.props.inputValue
        };
    }

    onTextChanged = (event, tagName) => {
        const value = event.target.value;
        let citiesList = [];
        let cities = [];
        const citiesData = this.props.citiesJson;
        let cityExist;
        
        if(value.length > 0){
            const regex = new RegExp(`${value}`, `i`);
            citiesData.map(city => {
                return cities.push(city.cityName.toLowerCase());
            });
            citiesList = cities.sort().filter(citi => regex.test(citi));
            cityExist = citiesList.includes(value);
        }
        
        this.props.setCategory(value, tagName, cityExist);
        
        this.setState({
            citiesList: citiesList,
            text: this.props.inputValue
        });
    }

    renderCitiesList() {
        const citiesList = this.state.citiesList;
        if (citiesList.length !== 0) {
            return (
                <div>
                    <div className={classes.resultsBG} onClick={this.closeCitiesResults.bind(this)}></div>
                    <ul>
                        {citiesList.map((city, index)=> <li key={index} onClick={(event) => this.citySelected(city, event.target.tagName)}>{city}</li>)}
                    </ul>
                </div>
            );
        }
    }

    citySelected (city, tagName){
        const cityExist = this.state.citiesList.includes(city);
        this.props.setCategory(city, tagName, cityExist);
        
        this.setState({
            citiesList: [],
            text: city
        })
    }

    closeCitiesResults (){
        this.setState({
            citiesList: []
        });
    }

    render() {
        
        return (
            <div className={classes.SearchCity}>
                <input type="text" 
                       onChange={(event) => this.onTextChanged(event, event.target.tagName)}
                       value={this.props.inputValue}
                       placeholder='Add location'/>
                {this.renderCitiesList()}
            </div>
        )
    }

}

export default SearchCity;