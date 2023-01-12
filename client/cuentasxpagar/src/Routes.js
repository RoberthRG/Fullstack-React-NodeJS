import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FuentePagos from "./pages/FuentePagos";
import HistorialdePagos from "./pages/HistorialdePagos";
import ReportePagos from "./pages/ReportePagos";
import ReporteSeguimiento from "./pages/ReporteSeguimiento";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/fuentesdepago">
                <FuentePagos />
            </Route>
            <Route exact path="/historialdepagos">
                <HistorialdePagos />
            </Route>
            <Route exact path="/reporte-pagos">
                <ReportePagos/>
            </Route>
            <Route exact path="/reporte-seguimiento">
                <ReporteSeguimiento/>
            </Route>
        </Switch>
    );
};

export default Routes;
