import * as React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FoodAdmin } from './components/FoodAdmin';
import { UnitsOfMeasure } from './components/UnitsOfMeasure';
import { Ingredients } from './components/Ingredients';
//import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import 'typeface-roboto';
import './custom.css'

export default class App extends React.Component {
    static displayName = App;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/food-admin' component={FoodAdmin} />
                <Route path='/units-of-measure' component={UnitsOfMeasure} />
                <Route path='/ingredients' component={Ingredients} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}
