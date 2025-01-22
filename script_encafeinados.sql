CREATE DATABASE encafeinados;
USE encafeinados;

-- Tabla para gestionar los roles de la tienda (Tienda, Proveedor)
CREATE TABLE roles (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    nombreRol VARCHAR(50) NOT NULL UNIQUE,
    estadoRol TINYINT(1) NOT NULL DEFAULT true,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla para gestionar los usuarios que pueden acceder al aplicativo
CREATE TABLE usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    idRol INT,
    correoUsuario VARCHAR(50) NOT NULL UNIQUE,
    claveUsuario VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idRol) REFERENCES roles(idRol)
);

-- Tabla para gestionar las diferentes teindas que utilizarán el aplicativo
CREATE TABLE tiendas (
    idTienda INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNIQUE,
    nombreTienda VARCHAR(100) NOT NULL,
    correoTienda VARCHAR(100) NOT NULL,
    telefonoTienda VARCHAR (12) NOT NULL,
    direccionTienda VARCHAR(200) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) 
    );

-- Para gestionar los proveedores de la tienda
CREATE TABLE proveedores (
    idProveedor INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNIQUE,
    nombreProveedor VARCHAR(100) NOT NULL,
	correoProveedor VARCHAR(100) NOT NULL,
    telefonoProveedor VARCHAR(12) UNIQUE,
    direccionProveedor VARCHAR(200),
    bancoProveedor VARCHAR(60),
    tipoCuenta VARCHAR(20),
    numeroCuenta VARCHAR(20) UNIQUE,
    estadoProveedor TINYINT(1) NOT NULL DEFAULT true,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) );

-- Para gestionar el producto base (ejemplo: Café Santa Barbara)
CREATE TABLE productos (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombreProducto VARCHAR(100) NOT NULL,
    imagenProducto VARCHAR(255),
    categoria ENUM('Grano', 'Molido', 'Cápsula'),
    origen VARCHAR(255),
    nivelTostion VARCHAR(50), -- Claro, medio, oscuro
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estadoProducto TINYINT(1) NOT NULL DEFAULT true
);

-- Para gestionar el perfil sensorial de cada café
CREATE TABLE perfilSensorial (
    idPerfilSensorial INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT,
    aroma VARCHAR(50),
    acidez VARCHAR(50),
    cuerpo VARCHAR(50),
    notasSabor TEXT,
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto) ON DELETE CASCADE
);

-- Para administrar los tipos de café (Sta Barbara 250g o Sta Barbara 500g)
CREATE TABLE varianteProducto (
    idVariante INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT,
    gramaje INT NOT NULL,
    estadoVariante TINYINT(1) NOT NULL DEFAULT true,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto) );

-- Gestiona las entradas de los productos al aplicativo
CREATE TABLE consignaciones (
    idConsignacion INT AUTO_INCREMENT PRIMARY KEY,
    idProveedor INT,
    fechaIngreso DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaDevolucion DATE,
    estadoConsignacion ENUM('ACTIVA', 'FINALIZADA', 'DEVUELTA') NOT NULL DEFAULT 'ACTIVA',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor) );

-- Gestiona la entrada especifica de cada producto
CREATE TABLE detalleConsignacion (
    idDetalleConsignacion INT AUTO_INCREMENT PRIMARY KEY,
    idConsignacion INT,
    idVarianteProducto INT,
    
    cantidadRecibida INT NOT NULL,
    cantidadVendida INT NOT NULL DEFAULT 0,
    cantidadDevuelta INT NOT NULL DEFAULT 0,
    
    fechaTostion DATE,
    precioCompra DECIMAL(10, 2),
    
	porcentajeGanancia DECIMAL(5, 2) NOT NULL,
	precioVenta DECIMAL(10, 2) GENERATED ALWAYS AS (precioCompra * (1 + porcentajeGanancia / 100)) STORED,

    subtotal DECIMAL(10, 2) GENERATED ALWAYS AS (precioCompra * cantidadRecibida) STORED,
    FOREIGN KEY (idConsignacion) REFERENCES consignaciones(idConsignacion) ON DELETE SET NULL,
    FOREIGN KEY (idVarianteProducto) REFERENCES varianteProducto(idVariante) ON DELETE SET NULL,
    CONSTRAINT chk_cantidad_positiva CHECK (cantidadRecibida > 0),
    CONSTRAINT chk_precio_unitario_positivo CHECK (precioCompra > 0),
    CONSTRAINT chk_porcentajeGanancia CHECK (porcentajeGanancia BETWEEN 0 AND 100),
    CONSTRAINT chk_cantidad_devuelta_valida CHECK (cantidadDevuelta <= cantidadRecibida - cantidadVendida)
);

-- Administra las salidas de los productos (Devolución, Venta o Ajuste)
CREATE TABLE movimientos (
    idMovimiento INT AUTO_INCREMENT PRIMARY KEY,
    tipoMovimiento ENUM('Venta', 'Devolución', 'Ajuste') NOT NULL,
    fechaMovimiento DATE,
    estadoMovimiento TINYINT DEFAULT true,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Se especifica cada producto que sale
CREATE TABLE detalleMovimiento (
    idDetalleMovimiento INT AUTO_INCREMENT PRIMARY KEY,
    idMovimiento INT NOT NULL,
    idDetalleConsignacion INT NOT NULL,
    cantidad INT NOT NULL,
    precioCompra DECIMAL(10, 2) NULL,
    precioVenta DECIMAL(10, 2) NULL,
    total DECIMAL(10, 2) NULL,
    FOREIGN KEY (idMovimiento) REFERENCES movimientos(idMovimiento),
    FOREIGN KEY (idDetalleConsignacion) REFERENCES detalleConsignacion(idDetalleConsignacion),
    CONSTRAINT chk_cantidad_mov_positiva CHECK (cantidad > 0)
);

-- Tabla para visualizar el estado de pago del proveedor
CREATE TABLE liquidacionProveedor (
    idLiquidacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idConsignacion INT,
    estadoLiquidacion ENUM('PENDIENTE', 'PAGADA') NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idConsignacion) REFERENCES consignaciones(idConsignacion) );

-- Tabla para realizar los pagos al proveedor
CREATE TABLE abonoProveedor (
    idAbono INT AUTO_INCREMENT PRIMARY KEY,
    idLiquidacionProveedor INT,
    fechaPago DATETIME DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10, 2) NOT NULL,
    metodoPago ENUM('EFECTIVO', 'TRANSFERENCIA') NOT NULL,
    referencia VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idLiquidacionProveedor) REFERENCES liquidacionProveedor(idLiquidacion),
    CONSTRAINT chk_monto_positivo CHECK (monto > 0)
);

	-- -------------------------------------- TRIGGERS -------------------------------------- --

-- Trigger para calcular el total del detalle del movimiento
DELIMITER //
CREATE TRIGGER calcular_total_detalleMovimiento
BEFORE INSERT ON detalleMovimiento
FOR EACH ROW
BEGIN
    DECLARE v_tipo_movimiento VARCHAR(20);
    DECLARE v_precio_unitario DECIMAL(10, 2);
    DECLARE v_precio_venta DECIMAL(10, 2);
    DECLARE v_total DECIMAL(10, 2);
    
    -- Obtener el tipo de movimiento
    SELECT tipoMovimiento INTO v_tipo_movimiento
    FROM movimientos 
    WHERE idMovimiento = NEW.idMovimiento;
    
    -- Calcular precios y total si es una venta o un ajuste
    IF v_tipo_movimiento IN ('Venta', 'Ajuste') THEN
        SELECT 
            precioCompra,
            CASE 
                WHEN v_tipo_movimiento = 'Ajuste' THEN precioCompra -- Para ajustes, usamos el precio de compra como precio de venta
                ELSE precioVenta
            END,
            CASE 
                WHEN v_tipo_movimiento = 'Ajuste' THEN NEW.cantidad * precioCompra -- Para ajustes, el total es cantidad * precio de compra
                ELSE NEW.cantidad * precioVenta
            END
        INTO 
            v_precio_unitario,
            v_precio_venta,
            v_total
        FROM detalleConsignacion
        WHERE idDetalleConsignacion = NEW.idDetalleConsignacion;
        
        SET NEW.precioCompra = v_precio_unitario;
        SET NEW.precioVenta = v_precio_venta;
        SET NEW.total = v_total;
    ELSE 
        SET NEW.precioCompra = NULL;
        SET NEW.precioVenta = NULL;
        SET NEW.total = NULL;
    END IF;
END //
DELIMITER ;

-- Trigger para validar la fecha de tostión --
DELIMITER //
CREATE TRIGGER validar_fecha_tostion
BEFORE INSERT ON detalleConsignacion
FOR EACH ROW
BEGIN
    IF NEW.fechaTostion < DATE_SUB(CURDATE(), INTERVAL 3 MONTH) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El café no cumple con los parámetros de frescura. La fecha de tostión es superior a 3 meses.';
    END IF;
END;
//
DELIMITER ;

-- Trigger para actualizar cantidades vendidas/ajustadas o devueltas --
DELIMITER //
CREATE TRIGGER actualizar_cantidades_consignacion
AFTER INSERT ON detalleMovimiento
FOR EACH ROW
BEGIN
    DECLARE v_tipo_movimiento VARCHAR(20);
    
    SELECT tipoMovimiento INTO v_tipo_movimiento
    FROM movimientos 
    WHERE idMovimiento = NEW.idMovimiento;
    
    IF v_tipo_movimiento = 'Venta' OR v_tipo_movimiento = 'Ajuste' THEN
        UPDATE detalleConsignacion
        SET cantidadVendida = cantidadVendida + NEW.cantidad
        WHERE idDetalleConsignacion = NEW.idDetalleConsignacion;
    ELSEIF v_tipo_movimiento = 'Devolución' THEN
        UPDATE detalleConsignacion
        SET cantidadDevuelta = cantidadDevuelta + NEW.cantidad
        WHERE idDetalleConsignacion = NEW.idDetalleConsignacion;
    END IF;
END;
//
DELIMITER ;

-- Trigger para validar que no se exceda la cantidad disponible --

DELIMITER //
CREATE TRIGGER validar_cantidad_disponible
BEFORE INSERT ON detalleMovimiento
FOR EACH ROW
BEGIN
    DECLARE cantidad_disponible INT;
    DECLARE tipo_movimiento VARCHAR(20);

    -- Obtener el tipo de movimiento desde la tabla `movimientos`
    SELECT tipoMovimiento INTO tipo_movimiento
    FROM movimientos
    WHERE idMovimiento = NEW.idMovimiento;

    -- Calcular la cantidad disponible
    SELECT cantidadRecibida - cantidadVendida - cantidadDevuelta
    INTO cantidad_disponible
    FROM detalleConsignacion
    WHERE idDetalleConsignacion = NEW.idDetalleConsignacion;

    -- Validar si el movimiento es de tipo 'venta' y excede la cantidad disponible
    IF tipo_movimiento = 'Venta' AND NEW.cantidad > cantidad_disponible THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Sin existencias disponibles';
    END IF;
END;
//
DELIMITER ;

-- Trigger para actualizar el estado de pago a proveedor --
DELIMITER //
CREATE TRIGGER actualizar_estado_liquidacion
AFTER INSERT ON abonoProveedor
FOR EACH ROW
BEGIN
    DECLARE total_pagar DECIMAL(10, 2);
    DECLARE total_pagado DECIMAL(10, 2);
    
    -- Calcular el total a pagar
    SELECT COALESCE(SUM(dc.cantidadVendida * dc.precioCompra), 0)
    INTO total_pagar
    FROM detalleConsignacion dc
    JOIN liquidacionProveedor l ON l.idConsignacion = dc.idConsignacion
    WHERE l.idLiquidacion = NEW.idLiquidacionProveedor;

    -- Calcular el total pagado
    SELECT COALESCE(SUM(p.monto), 0)
    INTO total_pagado
    FROM abonoProveedor p
    WHERE p.idLiquidacionProveedor = NEW.idLiquidacionProveedor;

    -- Actualizar el estado según el saldo
    IF total_pagar - total_pagado = 0 THEN
        UPDATE liquidacionProveedor
        SET estadoLiquidacion = 'PAGADA'
        WHERE idLiquidacion = NEW.idLiquidacionProveedor;
    ELSEIF total_pagado > 0 THEN
        UPDATE liquidacionProveedor
        SET estadoLiquidacion = 'PENDIENTE'
        WHERE idLiquidacion = NEW.idLiquidacionProveedor;
    END IF;
END;
//
DELIMITER ;

-- -------------------------------------- VISTAS -------------------------------------- --

-- Muestra el total de los abonos hechos a un porvveedor y el saldo pendiente

CREATE VIEW vista_liquidaciones AS
SELECT 
    l.idLiquidacion,
    l.idConsignacion,
    -- Total por productos vendidos
    COALESCE(SUM(dc.cantidadVendida * dc.precioCompra), 0) AS Total_A_Pagar,
    -- Total pagado calculado con subconsulta
    (SELECT COALESCE(SUM(p.monto), 0) 
     FROM abonoProveedor p 
     WHERE p.idLiquidacionProveedor = l.idLiquidacion) AS Total_Pagado,
    -- Saldo pendiente
    (COALESCE(SUM(dc.cantidadVendida * dc.precioCompra), 0) - 
     (SELECT COALESCE(SUM(p.monto), 0) 
      FROM abonoProveedor p 
      WHERE p.idLiquidacionProveedor = l.idLiquidacion)) AS Saldo_Pendiente,
    l.estadoLiquidacion,
    l.createdAt,
    l.updatedAt
FROM liquidacionProveedor l
LEFT JOIN detalleConsignacion dc ON dc.idConsignacion = l.idConsignacion
GROUP BY l.idLiquidacion, l.idConsignacion, l.estadoLiquidacion, l.createdAt, l.updatedAt;
