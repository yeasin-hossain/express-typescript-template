import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase } from 'http-status-codes';

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message:
			process.env.NODE_ENV === 'production'
				? 'Internal Server Error!'
				: error.message,
		error: {
			status: getReasonPhrase(statusCode),
			code: statusCode,
			stack: process.env.NODE_ENV === 'production' ? null : error.stack,
			ip: req.ip || null,
			user_agent: req.headers['user-agent'] || null,
			executed_at: Math.round(
				new Date(req.headers.date || Date.now()).getTime() / 1000
			),
		},
	});
};
