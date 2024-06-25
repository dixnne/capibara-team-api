import {google} from 'googleapis';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export class Analytics{
    #auth=null;
    #analytics=null;
    #client=null;
    
    constructor(privateValue){
        this.#auth=new google.auth.GoogleAuth({
            keyFile: './Connection/keys/capibara-team-firebase.json',
            scopes: 'https://www.googleapis.com/auth/analytics.readonly',
        });
        this.#client = new BetaAnalyticsDataClient({auth: this.#auth})
        //this.#auth = new google.auth.JWT(key.client_email,null,key.private_key,'https://www.googleapis.com/auth/analytics.readonly')
        
    }
    async getReport(date,res){
        const [year, month] = date.split('-').map(Number);
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // Último día del mes
    
        const startDateString = startDate.toISOString().split('T')[0];
        const endDateString = endDate.toISOString().split('T')[0];
        let propertyId='441636822';
        const requests = {
            property: `properties/${propertyId}`,
            requests: [
                {
                    property: `properties/${propertyId}`,
                    dimensions: [{ name: 'date' }, { name: 'country' }],
                    metrics: [{ expression: 'sessions', name: '_Sessions' }],
                    dateRanges: [
                        {
                            startDate: startDateString,
                            endDate: endDateString,
                        },
                    ],
                },
                {
                    property: `properties/${propertyId}`,
                    dimensions: [{ name: 'day' }, { name: 'country' }],
                    metrics: [{ expression: 'screenPageViews', name: '_ScreenPageViews' }],
                    dateRanges: [
                        {
                            startDate: startDateString,
                            endDate: endDateString,
                        },
                    ],
                },
                {
                    property: `properties/${propertyId}`,
                    dimensions: [{ name: 'date' }, { name: 'country' }],
                    metrics: [{ expression: 'newUsers', name: '_NewUsers' }],
                    dateRanges: [
                        {
                            startDate: startDateString,
                            endDate: endDateString,
                        },
                    ],
                },
            ],
        };
        
        try {
            // Realizar la solicitud
            
            const [response] = await this.#client.batchRunReports(requests);
            // Procesar la respuesta para cada reporte
            const data = {
                sessions: [],
                screenPageViews: [],
                newUsers: [],
            };
        
            response.reports.forEach((report) => {
                //console.log(report);
                report.rows.forEach((row) => {
                     
                    const date = row.dimensionValues[0].value;
                    const country = row.dimensionValues[1].value || 'Total'; // Si no hay país, se asigna 'Total'
                    const metricValue = row.metricValues[0]?.value || 0;
    
                    if (report.metricHeaders[0]?.name === '_Sessions') {
                        data.sessions.push({ date, country, value: metricValue });
                    } else if (report.metricHeaders[0]?.name === '_ScreenPageViews') {
                        data.screenPageViews.push({ date, country, value: metricValue });
                    } else if (report.metricHeaders[0]?.name === '_NewUsers') {
                        data.newUsers.push({ date, country, value: metricValue });
                    }
                });
            });
        
            res.json({
                screenPageViews: data.screenPageViews,
                newUsers: data.newUsers,
                message: 'My Analytics page.',
            })
        
        } catch (err) {
            console.log('error', { errorMessage: err.message });
        }
            
        

        //console.log(report);
    }

}