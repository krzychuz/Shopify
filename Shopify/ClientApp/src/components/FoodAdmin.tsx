import * as React from 'react';
import { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

interface FoodAdminInterface {
}

interface FoodAdminStateInterface {
    unitsOfMeassureloading: boolean;
    unitsOfMeassure: UnitOfMeassureArray;
    ingredientsLoading: boolean;
    ingredinets: IngredientArray;
    dishesLoading: boolean;
    dishes: DishArray;
}

interface UnitOfMeassure {
    id: number;
    name: string;
}

interface UnitOfMeassureArray extends Array<UnitOfMeassure> {}

interface Ingredient {
    id: number;
    name: string;
    unitOfMeassureId: number;
    unitOfMeassure : UnitOfMeassure;
}

interface IngredientArray extends Array<Ingredient> {}

interface FoodIngredient {
    id: number;
    amount: number;
    ingredientId: number;
    ingredient: Ingredient;
}

interface FoodIngredientArray extends Array<FoodIngredient> {}

interface Dish {
    id: number;
    name: string;
    ingredients: FoodIngredientArray;
}

interface DishArray extends Array<Dish> {}

function ingredientsAsString(ingredients: FoodIngredientArray) {
    var string = "";
    ingredients.forEach(element => {
        string += element.ingredient.name + "(" + element.amount + " " + element.ingredient.unitOfMeassure.name + "), "
    });
    return string;
}

export class FoodAdmin extends Component<FoodAdminInterface, FoodAdminStateInterface> {
    constructor(props: any) {
        super(props);
        this.state = { unitsOfMeassureloading: true, unitsOfMeassure: [],
            ingredientsLoading: true, ingredinets: [],
            dishesLoading: true, dishes: [] };
    }

    componentDidMount() {
        this.populateData();
    }

    static renderUnitsOfMeassureTable(data: UnitOfMeassureArray) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(unitOfMeassure =>
                        <tr key={unitOfMeassure.id}>
                            <td>{unitOfMeassure.id}</td>
                            <td>{unitOfMeassure.name}</td>

                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderIngredientsTable(data: IngredientArray) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(ingredient =>
                        <tr key={ingredient.id}>
                            <td>{ingredient.id}</td>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.unitOfMeassure.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderDishesTable(data: DishArray) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Ingredients</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(dish =>
                        <tr key={dish.id}>
                            <td>{dish.id}</td>
                            <td>{dish.name}</td>
                            <td>{ingredientsAsString(dish.ingredients)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }



    render() {
        let unitOfMeassureContents = this.state.unitsOfMeassureloading
            ? <p><em>Loading...</em></p>
            : FoodAdmin.renderUnitsOfMeassureTable(this.state.unitsOfMeassure);

        let ingredientsContents = this.state.ingredientsLoading
            ? <p><em>Loading...</em></p>
            : FoodAdmin.renderIngredientsTable(this.state.ingredinets);

        let dishesContents = this.state.dishesLoading
        ? <p><em>Loading...</em></p>
        : FoodAdmin.renderDishesTable(this.state.dishes);

        return (
            <div>
                <h1 id="tabelLabel" >Food administration</h1>
                <h2>Units of meassure</h2>
                {unitOfMeassureContents}
                <h2>Ingredients</h2>
                {ingredientsContents}
                <h2>Dishes</h2>
                {dishesContents}
            </div>
        );
    }

    async populateData() {
        const token = await authService.getAccessToken();

        await fetch('api/UnitOfMeassures', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` } })
            .then(response => response.json())
            .then(data => {
                this.setState({ unitsOfMeassure: data, unitsOfMeassureloading: false });
            });

        await fetch('api/Ingredients', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` } })
            .then(response => response.json())
            .then(data => {
                this.setState({ ingredinets: data, ingredientsLoading: false });
            });

        await fetch('api/Dishes', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` } })
            .then(response => response.json())
            .then(data => {
                this.setState({ dishes: data, dishesLoading: false });
            });
    }
}
