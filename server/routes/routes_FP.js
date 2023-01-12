const { Router } = require("express")
const { getAllTiposPago, getAllFuentesPago, postCreateFuente, putUpdateFuente, deleteFuente
} = require('../controllers/fuentesPago_Controller')
const { getAllPago, getPago, deletePago, updatePago, createPagoDetalle
} = require('../controllers/pagos.controller')


const router = Router();

router.get('/tipoPago', getAllTiposPago);
router.get('/menuFuentesPago', getAllFuentesPago);
router.post('/agregarFuente', postCreateFuente);
router.put('/editarFuente', putUpdateFuente);
router.put('/eliminarFuente', deleteFuente);
router.get('/pago', getAllPago)
router.get('/pago/:id_cabecera', getPago)
router.post('/pago', createPagoDetalle)
router.put('/pago/:id_cabecera', deletePago)
router.put('/pago', updatePago)

module.exports = router