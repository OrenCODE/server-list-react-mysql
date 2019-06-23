import React, {Component} from 'react';
import axios from 'axios';

import AddServer from './components/AddServer';
import ServerList from './components/ServerList';

import "react-datepicker/dist/react-datepicker.css";
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            servers: [],
            filterActiveServers: false,
            currentServers: [],
            errors: {}
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:4007/servers')
            .then(res => this.setState({
                servers: res.data,
                filterActiveServers: false
            }))
            .catch(err => console.log(err.response.data));
    };

    showActiveServers = () => {
        const {servers} = this.state;
        const serversAfterActive = servers.filter(server => server.status !== 0);
        this.setState({
            currentServers: servers,
            servers: serversAfterActive,
            filterActiveServers: true
        });
    };

    showAllServers = () => {
        const {currentServers} = this.state;
        this.setState({
            servers: currentServers,
            filterActiveServers: false
        })
    };

    turnOffServer = (id) => {
        const {servers} = this.state;
        const server = servers.find(server => server.id === id);
        server.status = 0;
        this.setState({
            servers: Object.assign(servers, server.status)
        })


    };

    turnOnServer = (id) => {
        const {servers} = this.state;
        const server = servers.find(server => server.id === id);
        server.status = 1;
        this.setState({
            servers: Object.assign(servers, server.status)
        })
    };

    addServer = (serverItem) => {
        const {servers} = this.state;
        const alias = serverItem.alias;
        const ip = serverItem.ip;
        const hostingId = serverItem.hostingId;
        const name = serverItem.hostingName;
        const status = 1;

        axios.post(`http://localhost:4007/servers/`, {alias, ip, status, hostingId})
            .then((res) => {
                const id = res.data.id;
                const newServer = {id, alias, ip, status, hostingId, name};
                this.setState({servers: servers.concat(newServer)})
            }).catch(err => this.setState({errors: err.response.data}))

    };

    deleteServer = (id) => {
        const {servers} = this.state;
        const serversAfterDelete = servers.filter(server => server.id !== id);
        this.setState({
            servers: serversAfterDelete
        });
    };

    render() {
        const {servers, hosts, filterActiveServers} = this.state;
        return (
            <div className="container">
                <h3>Servers App</h3>
                <AddServer servers={servers} hosts={hosts} addServer={this.addServer}/>
                {filterActiveServers ?
                    <button className="btn btn-outline-secondary btn-sm" onClick={this.showAllServers}>Show All
                        servers</button> :
                    <button className="btn btn-outline-success btn-sm" onClick={this.showActiveServers}>Show active
                        servers</button>
                }
                <ServerList servers={servers} deleteServer={this.deleteServer} turnOffServer={this.turnOffServer}
                            turnOnServer={this.turnOnServer}/>
            </div>
        );
    }
}

export default App;