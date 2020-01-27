import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                <h1 className="text-monospace text-info display-2">Dashboard</h1>
                <Link to="/add-product" className="btn btn-block btn-warning">Add Product <i class="far fa-money-bill-alt" /> </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
