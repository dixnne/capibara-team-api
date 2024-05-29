import {google} from 'googleapis';

export class nalytics{
    #auth=null;
    #analytics=null;
    constructor(privateValue){
        this.#auth=new google.auth.GoogleAuth({
            keyFile: './keys/capibara-team-firebaseTest.json',
            scopes: 'https://www.googleapis.com/auth/analytics.readonly',
        });
    }
    async getDbConnAnalytics(){
        this.#verificaAnalitycs();
        
    }

    #verificaAnalitycs(){
        if(this.#analytics==null){
            this.#analytics=google.analyticsreporting({
                version: 'v4',
                auth: this.#auth.getClient()
            })
        }
    }

}