const { response } = require('express');
const req = require('express/lib/request')
const { db } = require('../configure/conecction')


const getAllPago = async (req, res) => {

    try {
        const cabecera = await db.any(`SELECT*FROM public.cp_cabecera where cab_estado=true;`);
        let response = [];
        for (let i = 0; i < cabecera.length; i++) {
            let detallePago = await db.any(`SELECT det.* from cp_cabecera cab, cp_detalle det where cab.id_cabecera = det.id_cabecera and
             det.id_cabecera = $1;`, [cabecera[i].id_cabecera]);
            cabecera[i].cab_detalle = detallePago
            response.push(cabecera[i])
        }
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }
}

const getPago = async (req, res) => {
    try {
        const id_cabecera = req.params.id_cabecera
        console.log('ds', req.params.id_cabecera)
        const cabecera = await db.one(`SELECT*FROM public.cp_cabecera where id_cabecera = $1;`, [id_cabecera]);
        let response = [];
        let detallePago = await db.any(`SELECT det.* from cp_cabecera cab, cp_detalle det where cab.id_cabecera = det.id_cabecera and
            det.id_cabecera = $1;`, [cabecera.id_cabecera]);
        cabecera.cab_detalle = detallePago
        response.push(cabecera)
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }


}

const createPagoDetalle = async (req, res) => {
    const { id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total, detalles } = req.body
    try {
        const cabecera = await db.one(`INSERT INTO public.cp_cabecera(
            id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total,cab_estado)
            VALUES ($1, $2, $3, $4, $5, $6,true)  returning*;`, [id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total, total])

        //Insercion del detalle
        let detalle = []
        for (let i = 0; i < detalles.length; i++) {
            const response = await db.one(`INSERT INTO public.cp_detalle(id_cabecera, cantidad_a_pagar, fcom_id)
                    VALUES ( $1, $2, $3) returning* ;`, [cabecera.id_cabecera, detalles[i].cantidad_a_pagar, detalles[i].fcom_id])
            detalle.push(response)
        }
        cabecera.cab_detalle = detalle
        res.json(cabecera)

    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }
}

const deletePago = async (req, res) => {
    try {
        const id_cabecera = req.params.id_cabecera
        console.log('ds', req.params.id_cabecera)
        const cabecera = await db.one(`UPDATE public.cp_cabecera SET cab_estado=false WHERE id_cabecera=$1 RETURNING*;`, [id_cabecera]);
        res.json(cabecera)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }

}

const updatePago = async (req, res) => {
    const { id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total, detalles } = req.body
    try {
        //Insercion del cabecera
        const cabecera = await db.one(`UPDATE public.cp_cabecera SET   descripcion_pago=$2, ruc_proveedor=$3, 
        cdgo_tipo_pago=$4,fecha_pago=$5,total=$6 WHERE id_cabecera=$1 RETURNING*;`, 
        [id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total])
            

        await db.none(`DELETE FROM public.cp_detalle WHERE id_cabecera=$1;`, [id_cabecera])

        //Insercion del detalle
        let detalle = [];
        for (let i = 0; i < detalles.length; i++) {
            const response = await db.one(`INSERT INTO public.cp_detalle(id_cabecera, cantidad_a_pagar, fcom_id)
                    VALUES ( $1, $2, $3) returning* ;`, [cabecera.id_cabecera, detalles[i].cantidad_a_pagar, detalles[i].fcom_id])
            detalle.push(response)
        }

        cabecera.cp_detalle = response
        res.json(cabecera)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }

}

module.exports = {
    getAllPago,
    getPago,
    createPagoDetalle,
    deletePago,
    updatePago
}