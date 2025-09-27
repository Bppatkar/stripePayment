import { raw } from 'express';

const stripeRawBody = raw({ type: 'application/json' });

export default stripeRawBody;