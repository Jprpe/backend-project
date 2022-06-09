import { ObjectId } from "mongodb";

// GET ALL
export const getAllUsersCtrl = async (req, res) => {
    // ir a BBDD y devolver TODOS los estudiantes
    const db = req.app.locals.ddbbClient.db('final-project'); // cojo la BBDD
    const col = db.collection('users'); // cojo la collection
    const students = await col.find().toArray(); // busco TODOS y lo paso a array
    res.json(users); // devuelvo el resultado al cliente
}

export const createUsersCtrl = async (req, res) => {
    const db = req.app.locals.ddbbClient.db('final-project'); // cojo la BBDD
    const col = db.collection('users'); // cojo la collection
    const r = await col.insertOne(req.body); // aqui falta VALIDAR el body
    res.json({ id: r.insertedId }); // devuelvo el ID insertado para que el cliente sepa
}

export const getUsersByIdCtrl = async (req, res) => {
    const { id } = req.params;
    const db = req.app.locals.ddbbClient.db('final-project'); // cojo la BBDD
    const col = db.collection('users'); // cojo la collection
    if (id.length === 12 || id.length === 24 ) {
        const o_id = ObjectId(id); // genero un ObjectId de MongoDB. Controlar el pete del ID
        const user = await col.findOne(o_id);
        if (user === null) {
            res.status(404).json({ error: 'No existe ese usuario' });
        } else {
            res.json(user);
        }
    }else{
        res.status(400).json({ error: 'El ID no tiene el formato correcto'});
    }

}



//PATCH

export const updateUsersByIdCtrl = async (req, res) => {
    const { id } = req.params;
    const db = req.app.locals.ddbbClient.db('final-project'); // cojo la BBDD
    const col = db.collection('users'); // cojo la coleccion
    if(id.length === 12 || id.length === 24){
        // genero un ObjectId de MongoDB, Controlar el pete del ID
        const o_id = ObjectId(id)
        const r = await col.updateOne({_id : o_id}, { $set: req.body }); // busco el estudiante por su ID
            res.status(200).json(r) // devuelvo el resultado del cliente
    }
    else {
        res.status(400).json({ error: 'Invalid ID' });
    }
}



//

export const deleteUsersByIdCtrl = async (req, res) => {
    const { id } = req.params;
    const db = req.app.locals.ddbbClient.db('final-project'); // cojo la BBDD
    const col = db.collection('users'); // cojo la coleccion
    if(id.length === 12 || id.length === 24){
        // genero un ObjectId de MongoDB, Controlar el pete del ID
        const o_id = ObjectId(id)
        const r = await col.deleteOne({_id : o_id}); // busco el estudiante por su ID
            res.status(200).json(r) // devuelvo el resultado del cliente
    }
    else {
        res.status(400).json({ error: 'Invalid ID' });
    }
}
///