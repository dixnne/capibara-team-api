import admin from './keys/Credentials'

class FirestoreConnection{

    /*Si se ocupa algo adicional y no se cuenta con alguna persona para este codigo
        es posible traerse la conexion con cloud Firestore para su posterior uso
    */
    getDbConnFirestore(){
        let db=admin.firestore()
        return db;
    }

    /*Insertar registros de la base de datos*/
    async addDocument(collection,data){
        let db=admin.firestore()
        const collectionRef = db.collection(collection);
        await collectionRef.add(data)
        return "Agregado correctamente"
    }

    /*Metodos Get para obtener los datos*/
    async getDocumentById(collection,document){
        let db = admin.firestore();
        const collectionRef = db.collection(collection).doc(document);

        try{
            let snapshot = await collectionRef.get();
            if(snapshot.empty){
                return {};
            }
            let data=snapshot.data();
            data={id:snapshot.id,...data}
            return data;
        }catch(error){
            console.log(error)
            return {};
        }
    }

    async getDocumentByField(collection,fieldPath,value){
        let db = admin.firestore();
        const collectionRef = db.collection(collection);

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
        let db=admin.firestore();
        const collectionRef = db.collection(collection);

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
        let db=admin.firestore()
        const collectionRef = db.collection(collection);
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

    /*Eliminar documentos de la base de datos
        Solo se puede eliminar por llave o por algun campo identico en la base de datos
        No existe eliminar por concidencias.
    */
    async deleteDocumentByField(collection,fieldName,fieldData){
        let db=admin.firestore()

        const collectionRef = db.collection(collection);
        
        // Crear una consulta para encontrar documentos con el campo 'last' igual a lastName
        const snapshot = await collectionRef.where(fieldName, '==', fieldData).get();

        if (snapshot.empty) {
            console.log('No se encontraron documentos.');
            return 'No se encontraron documentos.';
        } 

        // Eliminar cada documento que coincide con la consulta
        await snapshot.forEach(async (doc) => {
            await doc.ref.delete();
            message = "Documento eliminado: "+doc.id
        });

    }

    async deleteDocumentById(collection,document){
        let db=admin.firestore()

       try{
        await db.collection(collection).doc(document).delete();
        return "Elemento eliminado";
       }catch(error){
        return error
       }
    }
}

module.exports = FirestoreConnection;