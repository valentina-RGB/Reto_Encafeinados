export interface depositSupplierType{
    [x: string]: any;
    abonos: any;
    idLiquidacionProveedor: number;
    fechaPago: Date;
    monto: number;
    metodoPago: string;
    referencia: string;
}