import React, {Component} from 'react';
import './App.css';
import Categories from './components/Categories/Categories';

class App extends Component {

    state = {
        inputValue: '',
        categories: [],
        selectedCategory:'',
        editCategory: '',
        errorMessage: false
    };

    setCategoryName = (event) => {
        const inputValue = event.target.value;
        this.setState({
            inputValue: inputValue,
            errorMessage: false
        });
    };

    renderCategory = () => {
        const categoriesList = [...this.state.categories];
        const checkIfCategoryexist = categoriesList.includes(this.state.inputValue);

        this.setState({errorMessage: checkIfCategoryexist});

        if(this.state.inputValue !== '' && !checkIfCategoryexist){

            const categoryIndex = categoriesList.findIndex(category => category === this.state.editCategory);
            categoriesList[categoryIndex] = this.state.inputValue;

            if(!this.state.editCategory){
                categoriesList.push(this.state.inputValue)
            }

            this.setState({
                inputValue: '',
                editCategory: '',
                categories: categoriesList
            });
        }
    };

    selectCategory = (categoryName) => {
        if(categoryName !== this.state.selectedCategory){
            const categoriesList = [...this.state.categories];
            const categoryIndex = categoriesList.findIndex(category => category === categoryName);
            this.setState({selectedCategory: categoriesList[categoryIndex]});
        }else{
            this.setState({selectedCategory: ''});
        }
    }

    deleteCategory = (categoryName) => {
        const categoriesList = [...this.state.categories];
        const categoryIndex = categoriesList.findIndex(category => category === categoryName);
        categoriesList.splice(categoryIndex, 1);
        if(categoryName === this.state.inputValue){
            this.setState({errorMessage: false});
        }
        this.setState({categories: categoriesList});
    }

    editCategory = (categoryName) => {
        const categoriesList = [...this.state.categories];
        const categoryIndex = categoriesList.findIndex(category => category === categoryName);
        this.setState({
            inputValue: categoriesList[categoryIndex],
            editCategory: categoriesList[categoryIndex]
        });
    }

    render() {
        return (
            <div className="App">
                <Categories
                    inputValue={this.state.inputValue}
                    categoriesList={this.state.categories}
                    setCategoryName={this.setCategoryName}
                    renderCategory={this.renderCategory}
                    errorMessage={this.state.errorMessage}
                    selectCategory={this.selectCategory}
                    deleteCategory={this.deleteCategory}
                    editCategory={this.editCategory}
                    highlighted={this.state.selectedCategory}
                    clearInput={this.clearInput}
                />
            </div>
        );
    }
}

export default App;
