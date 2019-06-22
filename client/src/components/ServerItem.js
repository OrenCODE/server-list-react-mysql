import React, {Component} from 'react';
import axios from 'axios';


class ServerItem extends Component {
    render() {
        const {server} = this.props;
        return (
            <div className="list-group-item">
                <div>Server Alias: {server.alias}</div>
                <div>On IP: {server.ip}</div>
                {server.status === 1 ? <div>Status: On</div> : <div>Status: Off</div>}
                <div>Host Name:{server.name}</div>
                <button className="btn btn-danger btn-sm right" onClick={() => this.deleteEmail(server.id)}>X</button>
                {server.status === 1 ?
                    <button className="btn btn-outline-danger btn-sm right"
                            onClick={() => this.toggleOffServer(server.id)}>turn off</button> :
                    <button className="btn btn-outline-primary btn-sm right"
                            onClick={() => this.toggleOnServer(server.id)}>turn on</button>
                }
            </div>
        );
    }

    deleteEmail = (id) => {
        const {onDelete} = this.props;
        axios.delete(`http://localhost:4007/servers/${id}`)
            .then(res => {
                if (res.status === 200) {
                    onDelete(id);
                } else {
                    console.error('not deleted')
                }
            })
            .catch(err => console.log(err));
    };

    toggleOffServer = (id) => {
        const {onToggleOff} = this.props;
        const status = 0;

        axios.put(`http://localhost:4007/servers/${id}`, {status})
            .then(res => {
                if (res.status === 200) {
                    onToggleOff();
                    console.log('success server shut down')
                } else {
                    console.error('could not find server')
                }
            })
            .catch(err => console.log(err));
    };

    toggleOnServer = (id) => {
        const {onToggleOn} = this.props;
        const status = 1;

        axios.put(`http://localhost:4007/servers/${id}`, {status})
            .then(res => {
                if (res.status === 200) {
                    onToggleOn();
                    console.log('success server up')
                } else {
                    console.error('could not find server')
                }
            })
            .catch(err => console.log(err));
    };
}

export default ServerItem;