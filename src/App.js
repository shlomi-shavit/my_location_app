import React, {Component} from 'react';
import classes from './App.module.scss';
import AddCategory from './components/AddCategory/AddCategory';
import Categories from './components/Categories/Categories';
import citiesJson from './json/cities-data.json';
import Map from './components/Map/Map';

class App extends Component {

    state = {
        inputValue: '',
        categorySelect: '',
        locations: [],
        categories: [],
        selectedCategory:'',
        editLocation: '',
        editCategory: '',
        errorMessage: false,
        currentCategoryID: '',
        cityCoordinates:'',
        categoriesCoordinates: []
    };

    fieldValidation = () => {
        const locationsList = [...this.state.locations];
        const categoriesList = [...this.state.categories];
        
        for(let i=0; i < locationsList.length; i++){
            const checkIflocationExist = locationsList[i] === this.state.inputValue;
            const checkIfCategoryExist = categoriesList[i] === this.state.categorySelect;

            if(checkIflocationExist && checkIfCategoryExist){
                this.setState({errorMessage: true});
                break;
            }else{
                this.setState({errorMessage: false});
            }
        }
    }
    
    setCategoryHandler = (value, tagName) => {
        if(tagName === 'LI' || tagName === 'INPUT'){
            this.setState({inputValue: value, editCategory: ''}, this.fieldValidation.bind(this));
        }else{
            this.setState({categorySelect: value}, this.fieldValidation.bind(this));
        }
    };

    renderCategoryHandler = () => {
        const locationsList = [...this.state.locations];
        const categoriesList = [...this.state.categories];   
        const currentCategoryID = this.state.currentCategoryID;
        
        if(this.state.editLocation === '' && this.state.editCategory === ''){
            locationsList.push(this.state.inputValue);
            categoriesList.push(this.state.categorySelect);
        }else {
            locationsList[currentCategoryID] = (this.state.inputValue);
            categoriesList[currentCategoryID] = (this.state.categorySelect);
        }
        
        this.setState({
            inputValue: '',
            categorySelect: '',
            selectedCategory: '',
            editLocation: '',
            locations: locationsList,
            categories: categoriesList,
            currentCategoryID: ''
        });
    };

    selectCategoryHandler = (index) => {
        const locationsList = [...this.state.locations];
        const currentCategoryID = index;
        
        if(this.state.selectedCategory === ''){
            this.setState({
                currentCategoryID: index,
                selectedCategory: locationsList[currentCategoryID]
            });    
        
        }else{
            this.setState({
                inputValue: '',
                categorySelect: '',
                selectedCategory: '',
                editLocation: '',
                editCategory: '',
                errorMessage: '',
                currentCategoryID: ''
            });    
        }
    }

    deleteCategoryHandler = () => {
        const categoriesList = [...this.state.locations];
        const currentCategoryID = this.state.currentCategoryID;
        
        categoriesList.splice(currentCategoryID, 1);
        
        this.setState({
            inputValue: '',
            editLocation: '',
            locations: categoriesList,
            currentCategoryID: '',
            errorMessage: false
        });
    }

    editCategoryHandler = (index) => {
        const locationsList = [...this.state.locations];
        const categoriesList = [...this.state.categories];
        const currentCategoryID = this.state.currentCategoryID;
        
        this.setState({
            inputValue: locationsList[currentCategoryID],
            editLocation: locationsList[currentCategoryID],
            categorySelect: categoriesList[currentCategoryID],
            editCategory: categoriesList[currentCategoryID]
        });
    }

    setCoordinatesHandler = (currentCategoryID) => {
        const locationsList = [...this.state.locations];
        const categoriesList = [...this.state.categories];
        const cityName = locationsList[currentCategoryID];
        const categoryName = categoriesList[currentCategoryID];
        let cityData = citiesJson.filter(data => data.cityName === cityName)[0];
        let categoryCoordinates = cityData.categories.filter(data => data.category === categoryName)[0].coordinates;
        
        this.setState({
            cityCoordinates: cityData.coordinates,
            categoriesCoordinates: categoryCoordinates
            
        });
        
        setTimeout(() => {
            this.setState({cityCoordinates: ""});
        },100)
    }
    
    render() {
        const editClasses = this.state.editLocation !== '' ? 'edit' : '';
        const errorClasses = this.state.errorMessage ? 'error' : '';
        
        return (
            <div className={classes.App}>
            
                <div className={[classes.category_bar, editClasses, errorClasses].join(' ')}>
                    <AddCategory 
                        state={this.state}
                        setCategory={this.setCategoryHandler}
                        renderCategory={this.renderCategoryHandler}
                        citiesJson={citiesJson}/>
            
                    <Categories
                        state={this.state}
                        selectCategoryHandler={this.selectCategoryHandler}
                        deleteCategoryHandler={this.deleteCategoryHandler}
                        editCategoryHandler={this.editCategoryHandler}
                        setCoordinatesHandler={this.setCoordinatesHandler}/>
                </div>
            
                <Map 
                    cityCoordinates={this.state.cityCoordinates}
                    categoriesCoordinates={this.state.categoriesCoordinates}
                    citiesJson={citiesJson}
                    categoriesMarker={this.categoriesCoordinates}/>
            
            </div>
        );
    }
}

export default App;
