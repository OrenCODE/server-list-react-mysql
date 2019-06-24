import React, {Component} from 'react';
import axios from "axios";
import {ValidateIpAddress} from "../utils/validateIpAddress";

class AddServer extends Component {

    state = {
        hosts: [],
        alias: '',
        ip: '',
        hostingId: '',
        hostingName: ''
    };

    componentDidMount() {
        axios.get('http://localhost:4007/hosting')
            .then(res => this.setState({hosts: res.data}))
            .catch(err => console.log(err));
    }

    onServerSelect = (event) => {
        const selectedIndex = event.target.options.selectedIndex;
        const selectedValue = event.target.value;
        this.setState({
            hostingId: selectedIndex,
            hostingName: selectedValue,
        });
        console.log(event.target.options[selectedIndex].getAttribute('data-key'));
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    handleSubmit = (event) => {
        const {alias, ip, hostingId, hostingName} = this.state;
        event.preventDefault();

        const newServer = {
            alias: alias,
            ip: ip,
            hostingName: hostingName,
            hostingId: hostingId
        };

        // Checks if the IP is Valid, if so, add server to the database.
        if (ValidateIpAddress(ip)) {
            this.props.addServer(newServer);
        } else {
            return alert('ip is invalid');
        }
        if (alias && ip && hostingId) {
            this.clearInputFields()
        }
    };

    render() {
        const {alias, ip, hosts} = this.state;
        return (
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control col-5 left" name="alias" type="text" placeholder="Server Alias"
                               value={alias}
                               onChange={this.handleChange}/>
                        <input className="form-control col-5 left" name="ip" type="text" placeholder="IP: 0.0.0.0" value={ip}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <select className="form-control col-10 left" onChange={this.onServerSelect}>
                            <option value="" hidden>Choose Host</option>
                            {hosts.map((host) => (
                                <option key={host.hostingid} data-key={host.hostingid}>{host.name}</option>
                            ))}
                        </select>
                        <button className="btn btn-primary btn-sm col-10" type="submit">Add new Server</button>
                    </div>
                </form>
        );
    }

    clearInputFields() {
        this.setState({
            alias: '',
            ip: ''
        })
    }
}

export default AddServer;