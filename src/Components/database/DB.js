import React, { Component } from 'react';

import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "Test.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;
let db;

class DB extends Component{
    constructor(props){
        super(props);

    }

    // componentWillUnmount = () => {
    //     this.closeDatabase();
    //   }
    //   closeDatabase = () => {
    //     if (db) {
    //       console.log("Closing database ...");
    //       db.close(this.closeCB,this.errorCB);
    //     } else {
    //         console.log("Database was not OPENED");
    //     }
    //   }
    
    
      errorCB = (err) => {
        console.log("error: ",err);
        return false;
      }
    
      successCB = () => {
        console.log("SQL executed ...");
      }
    
      openCB = () => {
        console.log("Database OPEN");
      }
    
      closeCB = () => {
        console.log("Database CLOSED");
      }

      populateDB =(tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS User( '
        + 'User_id INTEGER PRIMARY KEY NOT NULL, '
        + 'name VARCHAR(20), '
        + 'pass TEXT ) ; ', [], this.successCB, this.errorCB);
      }

      loadAndQueryDB(){
        console.log("Opening database ...",true);
        db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
        this.populateDatabase(db);
      }

}
export default new DB();