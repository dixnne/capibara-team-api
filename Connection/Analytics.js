import admin from './keys/Credentials';

class Analytucs{
    getDbConnAnalytics(){
        let db = admin.analytics()
        return db;
    }

}


module.exports = Analytucs;