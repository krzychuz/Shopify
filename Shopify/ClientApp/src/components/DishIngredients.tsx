import React from 'react';
import { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import MaterialTable, { Column } from 'material-table';
import { Ingredients } from './Ingredients';

const uri = "api/DishIngredients";

interface Dish {
    id: number;
    name: string;
    dishTypeId: number;
    dishType: DishType;
    dishIngredients: Array<DishIngredient>
}

interface DishType {
    id: number;
    name: string;
}

interface DishIngredient {
    id: number;
    amount: number;
    ingredientId: number;
    ingredient: Ingredient;
    dishId: number;
    dish: Dish;
}

interface Ingredient {
    id: number;
    name: string;
    unitOfMeassureId: number;
    unitOfMeassure: UnitOfMeasure;
}

interface UnitOfMeasure {
    id: number;
    name: string;
}

interface TableState {
    columns: Array<Column<DishIngredient>>;
    data: DishIngredient[];
    uomData: UnitOfMeasure[];
    ingredientsData: Ingredient[];
    dishId: number;
    match: any;
}

function createUomLookup(unitsOfMeasure: UnitOfMeasure[]): object {
    var dynamicObject: {[k: string]: any} = {};

    unitsOfMeasure.forEach(function(element, index, array) {
        dynamicObject[element.id] = element.name;
    });

    return dynamicObject;
}

function createIngredientLookup(unitsOfMeasure: Ingredient[]): object {
    var dynamicObject: {[k: string]: any} = {};

    unitsOfMeasure.forEach(function(element, index, array) {
        dynamicObject[element.id] = element.name;
    });

    return dynamicObject;
} 

export class DishIngredients extends Component<TableState, TableState> {
    constructor(props: any) {
        super(props);
        this.state = { 
            columns: [],
            data: [],
            uomData: [],
            ingredientsData: [],
            dishId: 0,
            match: null
        };
    }

    componentDidMount() {
        this.setState( { dishId: this.props.match.params.dishId } );
        this.populateUomData();
        this.populateIngredientsData();
        this.populateData();
    }

    async populateData() {
        const token = await authService.getAccessToken();

        await fetch(`${uri}/dish/${this.state.dishId}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    data: data,
                    columns:
                    [
                        { title: 'Ingredient', field: 'ingredient.id', lookup: createIngredientLookup(this.state.ingredientsData) },
                        { title: 'Amount', field: 'amount' },
                        { title: 'Unit of measure', field: 'ingredient.unitOfMeassure.id', lookup: createUomLookup(this.state.uomData) } 
                    ]
                });
            });
    }

    async populateUomData() {
        const token = await authService.getAccessToken();

        await fetch('api/UnitOfMeassures', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ uomData: data });
            });
    }

    async populateIngredientsData() {
        const token = await authService.getAccessToken();

        await fetch('api/Ingredients', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ingredientsData: data });
            });
    }

    async handleAdd(row: DishIngredient) {
        row.ingredientId = row.ingredient.id;
        row.ingredient = null;
        row.dishId = this.state.dishId;

        fetch(`${uri}`, {
            method: "POST",
            headers: { "content-type": "application/json"},
            body: JSON.stringify(row)
        })
            .then(() => {
                this.populateData();
            });
    }

    async handleDelete(row: DishIngredient) {
        fetch(`${uri}/${row.id}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(row)
        })
            .then(() => {
                this.populateData();
            });
    }

    async handleModify(row: DishIngredient) {
        fetch(`${uri}/${row.id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(row)
        })
            .then(() => {
                this.populateData();
            });
    }

    render() {
        return (
            <MaterialTable
                title="Ingredients"
                options = {{
                    pageSize: 20
                }}
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    onRowAdd: (newData) => this.handleAdd(newData), 
                    onRowUpdate: (newData) => this.handleModify(newData),
                    onRowDelete: (oldData) => this.handleDelete(oldData),
                }}
            />
        );
    }

}
