interface HttpError extends Error {
	errno?: number;
	code?: string;
	path?: string;
	syscall?: string;
	stack?: string;
}

export const onError = (error: HttpError, port: string | number | false) => {
	if (error.syscall !== 'listen') throw error;

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
};

export const onListening = (port: number) => {
	console.log('Server booted on %o', port);
};
