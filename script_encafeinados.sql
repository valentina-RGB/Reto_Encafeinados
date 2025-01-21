CREATE DATABASE encafeinados_prueba;
USE encafeinados_prueba;

CREATE TABLE roles (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    nombreRol VARCHAR(50) NOT NULL UNIQUE,
    estadoRol TINYINT(1) NOT NULL DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    idRol INT,
    correoUsuario VARCHAR(50) NOT NULL UNIQUE,
    claveUsuario VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idRol) REFERENCES roles(idRol)
);

CREATE TABLE tiendas (
    idTienda INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNIQUE,
    nombreTienda VARCHAR(100) NOT NULL,
    telefonoTienda VARCHAR (12) NOT NULL,
    direccionTienda VARCHAR(200) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) 
    );

CREATE TABLE proveedores (
    idProveedor INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNIQUE,
    nombreProveedor VARCHAR(100) NOT NULL,
    telefonoProveedor VARCHAR(12) UNIQUE,
    direccionProveedor VARCHAR(200),
    bancoProveedor VARCHAR(60),
    tipoCuenta VARCHAR(20),
    numeroCuenta VARCHAR(20) UNIQUE,
    estadoProveedor TINYINT(1) NOT NULL DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) );

CREATE TABLE productos (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombreProducto VARCHAR(100) NOT NULL,
    imagenProducto VARCHAR(255),
    categoria ENUM('Grano', 'Molido', 'Cápsula'),
    origen VARCHAR(255),
    nivelTostion VARCHAR(50), -- Claro, medio, oscuro
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estadoProducto TINYINT(1) NOT NULL DEFAULT true
);

CREATE TABLE perfilSensorial (
    idPerfilSensorial INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT,
    aroma VARCHAR(50),
    acidez VARCHAR(50),
    cuerpo VARCHAR(50),
    notasSabor TEXT,
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto) ON DELETE CASCADE
);

CREATE TABLE varianteProducto (
    idVariante INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT,
    gramaje INT NOT NULL,
    estadoVariante TINYINT(1) NOT NULL DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto) );

CREATE TABLE consignaciones (
    idConsignacion INT AUTO_INCREMENT PRIMARY KEY,
    idProveedor INT,
    fechaIngreso DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaDevolucion DATE,
    estadoConsignacion ENUM('ACTIVA', 'FINALIZADA', 'DEVUELTA') NOT NULL DEFAULT 'ACTIVA',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor) );

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

CREATE TABLE movimientos (
    idMovimiento INT AUTO_INCREMENT PRIMARY KEY,
    tipoMovimiento ENUM('Venta', 'Devolución', 'Ajuste') NOT NULL,
    fechaMovimiento DATE,
    estadoMovimiento TINYINT DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

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

CREATE TABLE liquidacionProveedor (
    idLiquidacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idConsignacion INT,
    estadoLiquidacion ENUM('PENDIENTE', 'PAGADA') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idConsignacion) REFERENCES consignaciones(idConsignacion) );

CREATE TABLE abonoProveedor (
    idAbono INT AUTO_INCREMENT PRIMARY KEY,
    idLiquidacionProveedor INT,
    fechaPago DATETIME DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10, 2) NOT NULL,
    metodoPago ENUM('EFECTIVO', 'TRANSFERENCIA') NOT NULL,
    referencia VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idLiquidacionProveedor) REFERENCES liquidacionProveedor(idLiquidacion),
    CONSTRAINT chk_monto_positivo CHECK (monto > 0)
);

-- TRIGGERS --

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
    
    -- Solo calcular precios y total si es una venta
    IF v_tipo_movimiento = 'Venta' THEN
        SELECT 
            precioCompra,
            precioVenta,
            (NEW.cantidad * precioVenta)
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

-- Trigger para validar la fecha de tostión
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

-- Trigger para actualizar cantidades vendidas/devueltas
DELIMITER //

CREATE TRIGGER actualizar_cantidades_consignacion
AFTER INSERT ON detalleMovimiento
FOR EACH ROW
BEGIN
    IF (SELECT tipoMovimiento FROM movimientos WHERE idMovimiento = NEW.idMovimiento) = 'Venta' THEN
        UPDATE detalleConsignacion
        SET cantidadVendida = cantidadVendida + NEW.cantidad
        WHERE idDetalleConsignacion = NEW.idDetalleConsignacion;
    ELSEIF (SELECT tipoMovimiento FROM movimientos WHERE idMovimiento = NEW.idMovimiento) = 'Devolución' THEN
        UPDATE detalleConsignacion
        SET cantidadDevuelta = cantidadDevuelta + NEW.cantidad
        WHERE idDetalleConsignacion = NEW.idDetalleConsignacion;
    END IF;
END;
//
DELIMITER ;

-- Trigger para validar que no se exceda la cantidad disponible

DELIMITER //
CREATE TRIGGER validar_cantidad_disponible
BEFORE INSERT ON detalleMovimiento
FOR EACH ROW
BEGIN
    DECLARE cantidad_disponible INT;
    DECLARE tipo_movimiento VARCHAR(20); -- Asegúrate de que el tipo coincida con el ENUM en la tabla `movimientos`.

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

-- VISTAS --
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
    l.created_at,
    l.updated_at
FROM liquidacionProveedor l
LEFT JOIN detalleConsignacion dc ON dc.idConsignacion = l.idConsignacion
GROUP BY l.idLiquidacion, l.idConsignacion, l.estadoLiquidacion, l.created_at, l.updated_at;
