export interface appropriations { 
    idConsignacion: number;
    idProveedor: number;
    fechaIngreso: Date;
    fechaDevolucion: Date;
    estadoConsignacion: number;
}


export interface  appropriationsDetails {
    idConsignacion: number;
    idVarianteProducto: number;
    cantidadRecibida: number;
    cantidadVendida: number;
    cantidadDevuelta: number;
    fechaTostion: Date;
    precioCompra: number;
    porcentajeGanancia: number;
    precioVenta: Date;
    subtotal: number;
}

export interface depositSupplier {
    idALiquidacionProveedor: number;
    fechaPago: Date;
    monto: number;
    metodoPago: number;
    referencia: number;
}


export interface movementDetails {
    idDetalleMoviento: number;
    idMovimiento: number;
    idDetalleConsignacion: number;
    cantidad: number;
    precioCompra: number;
    precioVenta: number;
    total:number;
}


export interface supplierLiquidation {
    idConsignacion: number;
    estadoLiquidacion: number;
}

export interface movement {
    idMovimiento: number;
    tipoMovimiento: string;
    fechaMovimiento: Date;
    estadoMovimiento: number;
}

export interface sensoryProfile {
    idProducto: number;
    aroma: string;
    acidez: string;
    cuerpo: string;
    notasSabor: string;
}

export interface sensoryProfile {
    idProducto: number;
    aroma: string;
    acidez: string;
    cuerpo: string;
    notasSabor: string;
}

export interface product {
    
}