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
    idRol INT NOT NULL,
    correoUsuario VARCHAR(50) NOT NULL UNIQUE,
    claveUsuario VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idRol) REFERENCES roles(idRol)
);

-- Tabla para gestionar las diferentes teindas que utilizarán el aplicativo
CREATE TABLE tiendas (
    idTienda INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNIQUE NOT NULL,
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
    idUsuario INT UNIQUE NOT NULL,
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
    imagenProducto VARCHAR(255) NULL,
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
    idProducto INT NOT NULL,
    aroma VARCHAR(50),
    acidez VARCHAR(50),
    cuerpo VARCHAR(50),
    notasSabor TEXT,
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto) ON DELETE CASCADE
);

-- Para administrar los tipos de café (Sta Barbara 250g o Sta Barbara 500g)
CREATE TABLE varianteProducto (
    idVariante INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT NOT NULL,
    imagenVariante VARCHAR(200) NULL,
    gramaje INT NOT NULL,
    estadoVariante TINYINT(1) NOT NULL DEFAULT true,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto) );

-- Gestiona las entradas de los productos al aplicativo
CREATE TABLE consignaciones (
    idConsignacion INT AUTO_INCREMENT PRIMARY KEY,
    idProveedor INT NOT NULL,
    fechaIngreso DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaDevolucion DATE NOT NULL,
    cantidadTotalVendida INT DEFAULT 0,
    cantidadTotalDevuelta INT DEFAULT 0,
    estadoConsignacion ENUM('ACTIVA', 'FINALIZADA', 'DEVUELTA') NOT NULL DEFAULT 'ACTIVA',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor) );

-- Gestiona la entrada especifica de cada producto
CREATE TABLE detalleConsignacion (
    idDetalleConsignacion INT AUTO_INCREMENT PRIMARY KEY,
    idConsignacion INT NOT NULL,
    idVarianteProducto INT NOT NULL,
    cantidadRecibida INT NOT NULL,
    cantidadVendida INT NOT NULL DEFAULT 0,
    cantidadDevuelta INT NOT NULL DEFAULT 0,
    fechaTostion DATE,
    precioCompra DECIMAL(10, 2),
	porcentajeGanancia DECIMAL(5, 2) NOT NULL,
	precioVenta DECIMAL(10, 2) GENERATED ALWAYS AS (precioCompra * (1 + porcentajeGanancia / 100)) STORED,
    subtotal DECIMAL(10, 2) GENERATED ALWAYS AS (precioCompra * cantidadRecibida) STORED,
    
    FOREIGN KEY (idConsignacion) REFERENCES consignaciones(idConsignacion) ,
    FOREIGN KEY (idVarianteProducto) REFERENCES varianteProducto(idVariante) ,
    CONSTRAINT chk_cantidad_positiva CHECK (cantidadRecibida > 0),
    CONSTRAINT chk_precio_unitario_positivo CHECK (precioCompra > 0),
    CONSTRAINT chk_porcentajeGanancia CHECK (porcentajeGanancia BETWEEN 0 AND 100),
    CONSTRAINT chk_cantidad_vendida_valida CHECK (cantidadVendida >= 0 AND cantidadVendida <= cantidadRecibida),
	CONSTRAINT chk_cantidad_devuelta_valida CHECK (cantidadDevuelta >= 0 AND cantidadDevuelta <= cantidadRecibida)
);

-- Administra las salidas de los productos (Devolución, Venta o Ajuste)
CREATE TABLE movimientos (
    idMovimiento INT AUTO_INCREMENT PRIMARY KEY,
    tipoMovimiento ENUM('Venta', 'Devolución', 'Ajuste') NOT NULL,
    fechaMovimiento DATE DEFAULT CURRENT_TIMESTAMP,
    motivoMovimiento VARCHAR(200) NULL,
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
    idProveedor INT NOT NULL,
    deudaActual DECIMAL(10, 2) DEFAULT 0,
    estadoLiquidacion ENUM('PENDIENTE', 'PAGADA') NOT NULL DEFAULT ('PENDIENTE'),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor)
    );

-- Tabla para realizar los pagos al proveedor
CREATE TABLE abonoProveedor (
    idAbono INT AUTO_INCREMENT PRIMARY KEY,
    idLiquidacionProveedor INT NOT NULL,
    fechaPago DATETIME DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10, 2) NOT NULL,
    metodoPago ENUM('EFECTIVO', 'TRANSFERENCIA') NOT NULL,
    referencia VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idLiquidacionProveedor) REFERENCES liquidacionProveedor(idLiquidacion),
    CONSTRAINT chk_monto_positivo CHECK (monto > 0)
);
	-- -------------------------------------- Índices -------------------------------------- --
CREATE INDEX idx_consignacion_variante
ON detalleConsignacion (idConsignacion, idVarianteProducto);

-- -------------------------------------- TRIGGERS -------------------------------------- --

-- Trigger para Calcular el Total de detalleMovimiento
-- Calcula automáticamente precios y total para ventas y ajustes.

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

    -- Calcular precios y total para ventas o ajustes
    IF v_tipo_movimiento IN ('Venta', 'Ajuste') THEN
        SELECT 
            precioCompra,
            CASE 
                WHEN v_tipo_movimiento = 'Ajuste' THEN precioCompra
                ELSE precioVenta
            END,
            NEW.cantidad * 
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
END;
//
DELIMITER ;

-- Trigger para actualizar cantidades al insertar detalleMovimiento
-- Gestiona actualizaciones de cantidades para diferentes tipos de movimientos.

DELIMITER //
CREATE TRIGGER actualizar_cantidades_movimiento
AFTER INSERT ON detalleMovimiento
FOR EACH ROW
BEGIN
    DECLARE v_tipo_movimiento VARCHAR(20);
    DECLARE v_id_proveedor INT;
    
    -- Obtener el tipo de movimiento
    SELECT tipoMovimiento INTO v_tipo_movimiento
    FROM movimientos 
    WHERE idMovimiento = NEW.idMovimiento;

    -- Obtener el proveedor asociado al movimiento
    SELECT c.idProveedor INTO v_id_proveedor
    FROM detalleConsignacion dc
    JOIN consignaciones c ON dc.idConsignacion = c.idConsignacion
    WHERE dc.idDetalleConsignacion = NEW.idDetalleConsignacion;

    -- Actualizar cantidades según el tipo de movimiento
     IF v_tipo_movimiento = 'Venta' OR v_tipo_movimiento = 'Ajuste' THEN
     
     -- Actualizar cantidad total vendida en consignaciones
            UPDATE consignaciones 
            SET cantidadTotalVendida = cantidadTotalVendida + NEW.cantidad
            WHERE idProveedor = v_id_proveedor;
            
	-- Actualizar cantidad vendida en detalleConsignacion  
			UPDATE detalleConsignacion
			SET cantidadVendida = cantidadVendida + NEW.cantidad
			WHERE idDetalleConsignacion = NEW.idDetalleConsignacion;
            
		 ELSEIF v_tipo_movimiento = 'Devolución' THEN
         
		-- Actualizar cantidad total devuelta en consignaciones
            UPDATE consignaciones 
            SET cantidadTotalDevuelta = cantidadTotalDevuelta + NEW.cantidad
            WHERE idProveedor = v_id_proveedor;

			UPDATE detalleConsignacion
			SET cantidadDevuelta = cantidadDevuelta + NEW.cantidad
			WHERE idDetalleConsignacion = NEW.idDetalleConsignacion;
            
    END IF;
END;
//
DELIMITER ;

-- Trigger para Validar la Fecha de Tostión
-- Asegura la frescura del café, rechazando productos con más de 3 meses.

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

-- Trigger para Validar Cantidad Disponible
-- Previene ventas que excedan el inventario disponible.

DELIMITER //
CREATE TRIGGER validar_cantidad_disponible
BEFORE INSERT ON detalleMovimiento
FOR EACH ROW
BEGIN
    DECLARE cantidad_disponible INT;
    DECLARE tipo_movimiento VARCHAR(20);

    -- Obtener tipo de movimiento
    SELECT tipoMovimiento INTO tipo_movimiento
    FROM movimientos
    WHERE idMovimiento = NEW.idMovimiento;

    -- Calcular la cantidad disponible
    SELECT cantidadRecibida - cantidadVendida - cantidadDevuelta
    INTO cantidad_disponible
    FROM detalleConsignacion
    WHERE idDetalleConsignacion = NEW.idDetalleConsignacion;

    -- Validar si excede la cantidad disponible
    IF tipo_movimiento = 'Venta' AND NEW.cantidad > cantidad_disponible THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Sin existencias disponibles.';
    END IF;
END;
//
DELIMITER ;

-- Trigger para la deuda de los proveedores.
DELIMITER //

CREATE TRIGGER actualizar_deuda_proveedor
AFTER INSERT ON detalleMovimiento
FOR EACH ROW
BEGIN
    DECLARE total_pagar DECIMAL(10, 2);

    -- Calcular el total a pagar para el proveedor asociado
    SELECT COALESCE(SUM(dc.cantidadVendida * dc.precioCompra), 0)
    INTO total_pagar
    FROM detalleConsignacion dc
    JOIN consignaciones c ON dc.idConsignacion = c.idConsignacion
    WHERE c.idProveedor = (
        SELECT c.idProveedor
        FROM detalleConsignacion dc
        JOIN consignaciones c ON dc.idConsignacion = c.idConsignacion
        WHERE dc.idDetalleConsignacion = NEW.idDetalleConsignacion
        LIMIT 1
    );

    -- Actualizar la deuda en la tabla de liquidación
    UPDATE liquidacionProveedor
    SET deudaActual = total_pagar
    WHERE idProveedor = (
        SELECT c.idProveedor
        FROM detalleConsignacion dc
        JOIN consignaciones c ON dc.idConsignacion = c.idConsignacion
        WHERE dc.idDetalleConsignacion = NEW.idDetalleConsignacion
        LIMIT 1
    );
END;
//
DELIMITER ;

-- Trigger para actualizar saldo y estado de pago al proveedor despues de un abono
DELIMITER //

CREATE TRIGGER gestionar_liquidacion_proveedor
AFTER INSERT ON abonoProveedor
FOR EACH ROW
BEGIN
    DECLARE deuda_actual DECIMAL(10, 2);
    DECLARE nueva_deuda DECIMAL(10, 2);

    -- Obtener la deuda actual de la liquidación asociada
    SELECT deudaActual
    INTO deuda_actual
    FROM liquidacionProveedor
    WHERE idLiquidacion = NEW.idLiquidacionProveedor;

    -- Validar que el abono no exceda la deuda actual
    IF NEW.monto > deuda_actual THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El monto del abono excede la deuda actual.';
    END IF;

    -- Calcular la nueva deuda después del abono
    SET nueva_deuda = GREATEST(deuda_actual - NEW.monto, 0);

    -- Actualizar la deuda y el estado en la tabla liquidacionProveedor
    UPDATE liquidacionProveedor
    SET 
        deudaActual = nueva_deuda,
        estadoLiquidacion = CASE 
            WHEN nueva_deuda = 0 THEN 'PAGADA'
            ELSE 'PENDIENTE'
        END
    WHERE idLiquidacion = NEW.idLiquidacionProveedor;
END;
//
DELIMITER ;