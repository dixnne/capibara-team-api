import {admin} from './keys/Credentials';

export class Analytucs{
    getDbConnAnalytics(){
        let db = admin.analytics()
        return db;
    }

}