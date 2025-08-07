-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "telefono" TEXT,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Compra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monto" REAL NOT NULL,
    "fecha" DATETIME NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "proveedorId" INTEGER NOT NULL,
    CONSTRAINT "Compra_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Factura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "ventaId" INTEGER,
    "compraId" INTEGER,
    CONSTRAINT "Factura_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Factura_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "Compra" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MetodoPago" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,
    CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Producto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductoXCompra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productoId" INTEGER NOT NULL,
    "compraId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    CONSTRAINT "ProductoXCompra_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductoXCompra_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "Compra" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductoXVenta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productoId" INTEGER NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    CONSTRAINT "ProductoXVenta_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductoXVenta_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "telefono" TEXT,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Venta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monto" REAL NOT NULL,
    "fecha" DATETIME NOT NULL,
    "metodoPagoId" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Venta_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Factura_ventaId_key" ON "Factura"("ventaId");

-- CreateIndex
CREATE UNIQUE INDEX "Factura_compraId_key" ON "Factura"("compraId");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_codigo_key" ON "Producto"("codigo");
