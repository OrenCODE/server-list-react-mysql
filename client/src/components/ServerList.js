import React, {Component} from 'react';
import ServerItem from './ServerItem';

class ServerList extends Component {

    onDelete = (id) => {
        this.props.deleteServer(id)
    };

    onToggleOff = (id) => {
        this.props.turnOffServer(id)
    };

    onToggleOn = (id) => {
        this.props.turnOnServer(id)
    };

    render() {
        const {servers} = this.props;
        return (
            <div className="card">
                <ul className="list-group list-group-flush">
                    {servers.map((server) => {
                        return (
                            <ServerItem key={server.id} server={server} onToggleOff={this.onToggleOff}
                                        onToggleOn={this.onToggleOn} onDelete={this.onDelete}/>
                        )
                    })}
                </ul>
            </div>

        );
    }
}

export default ServerList;