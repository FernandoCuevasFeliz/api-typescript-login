import { connect, connection } from 'mongoose';
import { URI, configDB } from './key';

connect(URI, configDB);

connection.once('open', () => console.log(`DB is connect ${URI}`));
connection.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
