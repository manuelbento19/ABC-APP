import mysql from 'mysql2/promise';
import { configuration } from '../config';

export const database = mysql.createPool(configuration.database);
