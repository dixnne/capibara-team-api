import {admin} from './keys/Credentials.js'

export class FirestoreConnection{
    #db=null;
    constructor(){
        this.#db=admin.firestore()
    }
    /*
        Si se ocupa algo adicional y no se cuenta con alguna persona para este codigo
        es posible traerse la conexion con cloud Firestore para su posterior uso
    */
    getDbConnFirestore(){
        return this.#db;
    }

    /*Insertar registros de la base de datos*/
    async addDocument(collection, data){
        const collectionRef = this.#db.collection(collection);
        await collectionRef.add(data);
        return "Document added successfully.";
    }

    /*Metodos Get para obtener los datos*/
    async getDocumentById(collection,document){
        const collectionRef = this.#db.collection(collection).doc(document);

        try{
            let snapshot = await collectionRef.get();
            if(snapshot.empty){
                return {};
            }
            let data=snapshot.data();
            data={id:snapshot.id,...data};
            return data;
        }catch(error){
            console.log(error);
            return {};
        }
    }

    async getDocumentByField(collection,fieldPath,value){
        const collectionRef = this.#db.collection(collection);

        try{
            let snapshot = await collectionRef.where(fieldPath,'==',value).get();
            if(snapshot.empty){
                return [];
            }
            let documents = [];
            snapshot.forEach(doc => {
                let data=doc.data();
                data = {id:doc.id,...data}
                documents.push(data);
            });
            return documents;
        }catch(error){
            console.log(error)
        }
    }

    async getSuggestionsByField(collection,fieldPath,value){
        const collectionRef = this.#db.collection(collection);
        try{
            const snapshot = await collectionRef.get();
            if(snapshot.empty){
                console.log(collection,fieldPath,'array-contains',value)
                return [];
            }
            let documents = [];
            snapshot.forEach(doc => {
                let data=doc.data();
                if (data[fieldPath].toLowerCase().includes(value.toLowerCase())){
                    data = {id:doc.id,...data}
                    documents.push(data);
                }
            });
            return documents;
        }catch(error){
            console.log(error);
            return [];
        }
    }

    async getCollection(collection){
        const collectionRef = this.#db.collection(collection);
        try {
            const snapshot = await collectionRef.get();
            if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
            }
            let documents = [];
            snapshot.forEach(doc => {
                let data=doc.data();
                data = {id:doc.id,...data}
                documents.push(data);
            });
            return documents;
        } catch (error) {
            console.error('Error getting collection:', error);
            return [];
        }
    }

    /*
        Eliminar documentos de la base de datos
        Solo se puede eliminar por llave o por algun campo identico en la base de datos
        No existe eliminar por concidencias.
    */
    async deleteDocumentByField(collection,fieldName,fieldData){

        const collectionRef = this.#db.collection(collection);
        
        // Crear una consulta para encontrar documentos con el campo 'last' igual a lastName
        const snapshot = await collectionRef.where(fieldName, '==', fieldData).get();

        if (snapshot.empty) {
            return 'No documents found.';
        } 

        // Eliminar cada documento que coincide con la consulta
        await snapshot.forEach(async (doc) => {
            await doc.ref.delete();
            message = "Documento eliminado: "+doc.id
            return 'Document successfully deleted';
        });

    }

    async deleteDocumentById(collection,document){

       try{
            await this.#db.collection(collection).doc(document).delete();
            return "Elemento eliminado";
       }catch(error){
            return error;
       }
    }
}