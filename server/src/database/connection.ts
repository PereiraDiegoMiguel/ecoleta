import knex from 'knex';
import path from 'path';

// conexao com o banco de dados
const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },

    /*pool:{
        afterCreate:(connection:any,done:Function)=>{
            connection.run('PRAGMA foreing_keys =ON', done);
        }

    },*/
    useNullAsDefault: true


});

export default connection;

// Migrations = Historico do banco de dados