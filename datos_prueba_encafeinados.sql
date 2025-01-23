USE encafeinados;

-- Insertar roles
INSERT INTO roles (nombreRol) VALUES ('Administrador'), ('Proveedor');

-- Insertar usuarios
INSERT INTO usuarios (idRol, correoUsuario, claveUsuario) VALUES 
(1, 'admin@encafeinados.com', 'admin123'), 
(2, 'proveedor1@gmail.com', 'proveedor123');

-- Insertar tiendas
INSERT INTO tiendas (idUsuario, nombreTienda, correoTienda, telefonoTienda, direccionTienda) VALUES 
(1, 'Café Central', 'contacto@cafecentral.com', '1234567890', 'Av. Principal #123');

-- Insertar proveedores
INSERT INTO proveedores (idUsuario, nombreProveedor, correoProveedor, telefonoProveedor, direccionProveedor, bancoProveedor, tipoCuenta, numeroCuenta) VALUES 
(2, 'Café Santa Barbara', 'ventas@cafesb.com', '0987654321', 'Carrera 45 #67', 'Banco X', 'Ahorros', '123456789');

-- Insertar productos
INSERT INTO productos (nombreProducto, imagenProducto, categoria, origen, nivelTostion) VALUES 
('Café Santa Barbara', NULL, 'Grano', 'Colombia', 'Medio'),
('Café San Alberto', NULL, 'Molido', 'Colombia', 'Oscuro');

-- Insertar perfil sensorial
INSERT INTO perfilSensorial (idProducto, aroma, acidez, cuerpo, notasSabor) VALUES 
(1, 'Frutal', 'Media', 'Completo', 'Notas de chocolate y frutos rojos'),
(2, 'Floral', 'Alta', 'Ligero', 'Notas de cítricos y flores');

-- Insertar variantes de producto
INSERT INTO varianteProducto (idProducto, imagenVariante, gramaje) VALUES 
(1, NULL, 250), 
(1, NULL, 500), 
(2, NULL, 250);

-- Insertar consignaciones
INSERT INTO consignaciones (idProveedor, fechaDevolucion) VALUES 
(1, '2025-02-01');

-- Insertar detalle de consignaciones
INSERT INTO detalleConsignacion (idConsignacion, idVarianteProducto, cantidadRecibida, fechaTostion, precioCompra, porcentajeGanancia) VALUES 
(1, 1, 100, '2024-12-01', 2000, 50), 
(1, 2, 50, '2024-12-15', 4000, 60);

-- Esta debe fallar si la fecha es anterior a 3 meses
-- INSERT INTO detalleConsignacion  (idConsignacion, idVarianteProducto, cantidadRecibida, precioCompra, porcentajeGanancia, fechaTostion) 
-- VALUES (1, 1, 100, 2000, 30, DATE_SUB(CURDATE(), INTERVAL 4 MONTH));
select * from consignaciones;
select * from detalleConsignacion;

-- Insertar liquidación de proveedor
INSERT INTO liquidacionProveedor (idProveedor) VALUES (1);

select * from liquidacionProveedor;

-- Insertar movimientos
INSERT INTO movimientos (tipoMovimiento, fechaMovimiento) VALUES 
('Venta', '2025-01-20'), 
('Devolución', '2025-01-22');

-- Insertar detalle de movimientos
INSERT INTO detalleMovimiento (idMovimiento, idDetalleConsignacion, cantidad) VALUES 
(1, 1, 10), 
(1, 2, 5), 
(2, 1, 5);

select * from movimientos; 
select * from detalleMovimiento;
select * from consignaciones;
select * from detalleConsignacion;
select * from liquidacionProveedor;

-- Insertar abonos a proveedores
INSERT INTO abonoProveedor (idLiquidacionProveedor, monto, metodoPago, referencia) VALUES 
(1, 30000, 'TRANSFERENCIA', '12345');

select * from abonoProveedor; 
select * from liquidacionProveedor;