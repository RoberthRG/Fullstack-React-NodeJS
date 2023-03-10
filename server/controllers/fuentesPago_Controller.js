const { response } = require('express');
const req = require('express/lib/request')
const { db } = require('../configure/conecction')

const getAllTiposPago = async (req, res) => {
    try {
        const response = await db.any(`SELECT tp_descripcion FROM cp_tipo_pago ORDER BY cdgo_tipo_pago;`)
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }
}

const getAllFuentesPago = async (req, res) => {
    try {
        const response = await db.any(`SELECT
    FP.id_fuentes_pago,
    FP.fp_descripcion,
    TP.tp_descripcion,
	FP.nro_cuenta_bancaria,
	FP.estado
FROM
    cp_fuentes_pago FP INNER JOIN cp_tipo_pago TP 
    ON FP.cdgo_tipo_pago = TP.cdgo_tipo_pago ORDER BY TP.tp_descripcion;`)
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }
}

const postCreateFuente = async (req, res) => {
    try {
        const { fp_descripcion, cdgo_tipo_pago, nro_cuenta_bancaria } = req.body
        const response = await db.one(`INSERT INTO public.cp_fuentes_pago (fp_descripcion,cdgo_tipo_pago,nro_cuenta_bancaria,estado)
                                    VALUES ($1, $2, $3, true) returning*;`, [fp_descripcion, cdgo_tipo_pago, nro_cuenta_bancaria])
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }
}

const putUpdateFuente = async (req, res) => {
    try {
        const { id_fuentes_pago, fp_descripcion, cdgo_tipo_pago, nro_cuenta_bancaria } = req.body
        const response = await db.one(`UPDATE public.cp_fuentes_pago SET fp_descripcion=$2, cdgo_tipo_pago=$3, 
        nro_cuenta_bancaria=$4 WHERE id_fuentes_pago=$1 returning*;`, [id_fuentes_pago, fp_descripcion, cdgo_tipo_pago, nro_cuenta_bancaria])
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }
}

const deleteFuente = async (req, res) => {
    try {
        const { id_fuentes_pago } = req.body
        const response = await db.one(`UPDATE public.cp_fuentes_pago SET estado=false WHERE id_fuentes_pago=$1 returning*;`, [id_fuentes_pago])
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }
}

module.exports = {
    getAllTiposPago,
    getAllFuentesPago,
    postCreateFuente,
    putUpdateFuente,
    deleteFuente
}