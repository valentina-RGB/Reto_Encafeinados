USE encafeinados;

INSERT INTO roles (nombreRol) VALUES 
('Administrador Tienda'),
('Proveedor');

INSERT INTO usuarios (idRol, correoUsuario, claveUsuario) VALUES 
(1, 'admin@encafeinados.com', '123456'),
(2, 'proveedor1@correo.com', 'clave123'),
(2, 'proveedor2@correo.com', 'clave123');

INSERT INTO tiendas (idUsuario, nombreTienda, correoTienda, telefonoTienda, direccionTienda) VALUES 
(1,'Encafeinados', 'admin@encafeinados.com', '3166093889', 'Parque El Poblado, Medellín');

INSERT INTO proveedores (idUsuario, nombreProveedor, correoProveedor, telefonoProveedor, direccionProveedor, bancoProveedor, tipoCuenta, numeroCuenta) VALUES 
(2, 'Café Cultivado SAS', 'proveedor1@correo.com', '3201234567', 'Calle 45 #12-34, Medellín', 'Bancolombia', 'Ahorros', '1234567890'),
(3, 'Cafés Premium', 'proveedor2@correo.com', '3211234567', 'Av. 30 #20-15, Manizales', 'Davivienda', 'Ahorros', '9876543210');

INSERT INTO productos (nombreProducto, imagenProducto, categoria, origen, nivelTostion) VALUES 
('Café Excelso', NULL, 'Grano', 'Huila, Colombia', 'Medio'),
('Café Especial', NULL, 'Molido', 'Caldas, Colombia', 'Oscuro'),
('Cápsulas Aromáticas', NULL, 'Cápsula', 'Quindío, Colombia', 'Claro');

INSERT INTO perfilSensorial (idProducto, aroma, acidez, cuerpo, notasSabor) VALUES 
(1, 'Floral', 'Media', 'Completo', 'Notas a chocolate y frutos rojos'),
(2, 'Especiado', 'Alta', 'Medio', 'Notas a canela y frutos secos'),
(3, 'Frutal', 'Baja', 'Suave', 'Notas a cítricos y miel');

INSERT INTO varianteProducto (idProducto, gramaje) VALUES
(1, 500),
(1, 100),
(2, 250);

INSERT INTO consignaciones (idProveedor, fechaDevolucion) VALUES 
(1, '2025-01-31'),
(2, '2025-03-15');

INSERT INTO detalleConsignacion (idConsignacion, idVarianteProducto, cantidadRecibida, fechaTostion, precioCompra, porcentajeGanancia) VALUES 
(1, 1, 10, '2025-01-01', 25000, 30),
(1, 2, 12, '2024-12-26', 12000, 25);

INSERT INTO movimientos (tipoMovimiento, fechaMovimiento) VALUES
('venta', '2025-01-20'),
('devolución', '2025-01-21');

INSERT INTO detalleMovimiento (idMovimiento, idDetalleConsignacion, cantidad) VALUES
(1, 1, 4), -- Venta de 4 unidades
(2, 2, 5);  -- Devolución de 5 unidades

INSERT INTO liquidacionProveedor (idConsignacion, estadoLiquidacion) VALUES
(1, 'PENDIENTE');

INSERT INTO abonoProveedor (idLiquidacionProveedor, monto, metodoPago, referencia) VALUES
(1, 1800, 'TRANSFERENCIA', 'REF123456');

SELECT * FROM vista_liquidaciones;
SELECT * FROM detalleConsignacion WHERE idConsignacion = 1;
SELECT * FROM movimientos;