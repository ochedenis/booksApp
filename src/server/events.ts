import * as http from 'http';

interface AddressInfo {
    port: number | string;
    family: string;
    address: string;
}

/* eslint-disable no-console */
export class Events {
    private server: http.Server;

    private port: number | string | boolean;

    constructor(server: http.Server, port: number | string | boolean) {
        this.server = server;
        this.port = port;
    }

    /**
    * @function
    * @param  {NodeJS.ErrnoException} error
    * @param  {number|string|boolean} port
    * @returns throw error
    */
    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bindPort: string = typeof this.port === 'string' ? `Pipe ${this.port}` : `Port ${this.port}`;

        /* eslint-disable no-fallthrough */
        switch (error.code) {
            case 'EACCES':
                console.error(`${bindPort} requires elevated privileges`);
                process.exit(1);
            case 'EADDRINUSE':
                console.error(`${bindPort} is already in use`);
                process.exit(1);
            default:
                throw error;
        }
    }

    /**
    * @function
    * @inner
    */
    public bind(): void {
        this.server.on('error', (error: Error): void => this.onError(error));
        this.server.on('listening', (): void => { this.onListening(); });
    }

    /**
    * @function
    * @inner
    * @description log port to console
    */
    private onListening(): void {
        const addr: string | AddressInfo = this.server.address();
        const bindPort: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

        console.log(`Listening on ${bindPort}`);
    }
}
