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

export class FoodAdmin extends Component<FoodAdminInterface, FoodAdminStateInterface> {
    constructor(props: any) {
        super(props);
        this.state = { unitsOfMeassureloading: true, unitsOfMeassure: [],
            ingredientsLoading: true, ingredinets: [] };
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
                    {data.map(forecast =>
                        <tr key={forecast.id}>
                            <td>{forecast.id}</td>
                            <td>{forecast.name}</td>

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
                    </tr>
                </thead>
                <tbody>
                    {data.map(forecast =>
                        <tr key={forecast.id}>
                            <td>{forecast.id}</td>
                            <td>{forecast.name}</td>

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

        return (
            <div>
                <h1 id="tabelLabel" >Food administration</h1>
                <h2>Units of meassure</h2>
                {unitOfMeassureContents}
                <h2>Ingredients</h2>
                {ingredientsContents}
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

        await fetch('api/Ingridients', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` } })
            .then(response => response.json())
            .then(data => {
                this.setState({ ingredinets: data, ingredientsLoading: false });
            });
    }
}
