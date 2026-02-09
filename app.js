var inventoryApp = {
    items: [],
    binId: null, // ID del bin en JSONBin.io
    
    init: function () {
        this.loadItems();
        this.loadBinId();
        this.setupEvents();
        this.render();
        this.updateStats();
        this.checkLastSync();
    },

    setupEvents: function () {
        var self = this;
        var form = document.getElementById('itemForm');

        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                self.addItem();
            });

            form.addEventListener('reset', function () {
                self.clearPreview();
            });
        }

        var fotoInput = document.getElementById('foto');
        if (fotoInput) {
            fotoInput.addEventListener('change', function (e) {
                self.handleImageUpload(e);
            });
        }

        var removeBtn = document.getElementById('removePreview');
        if (removeBtn) {
            removeBtn.addEventListener('click', function () {
                self.clearPreview();
            });
        }

        var searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                self.render();
            });
        }

        var filterStatus = document.getElementById('filterStatus');
        if (filterStatus) {
            filterStatus.addEventListener('change', function () {
                self.render();
            });
        }

        var sortOrder = document.getElementById('sortOrder');
        if (sortOrder) {
            sortOrder.addEventListener('change', function () {
                self.render();
            });
        }

        var exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', function () {
                self.exportToExcel();
            });
        }

        var importBtn = document.getElementById('importBtn');
        if (importBtn) {
            importBtn.addEventListener('click', function () {
                document.getElementById('importFile').click();
            });
        }

        var importFile = document.getElementById('importFile');
        if (importFile) {
            importFile.addEventListener('change', function (e) {
                self.importFromExcel(e);
            });
        }

        var syncDownloadBtn = document.getElementById('syncDownloadBtn');
        if (syncDownloadBtn) {
            syncDownloadBtn.addEventListener('click', function () {
                self.syncDownload();
            });
        }

        var syncUploadBtn = document.getElementById('syncUploadBtn');
        if (syncUploadBtn) {
            syncUploadBtn.addEventListener('click', function () {
                self.syncUpload();
            });
        }
    },

    handleImageUpload: function (e) {
        var file = e.target.files[0];
        if (file) {
            var self = this;
            var reader = new FileReader();
            reader.onload = function (event) {
                self.resizeImage(event.target.result, function(resizedImage) {
                    document.getElementById('preview').src = resizedImage;
                    document.getElementById('previewContainer').style.display = 'block';
                });
            };
            reader.readAsDataURL(file);
        }
    },

    resizeImage: function (base64Str, callback) {
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement('canvas');
            var MAX_WIDTH = 400;
            var MAX_HEIGHT = 400;
            var width = img.width;
            var height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            var resizedBase64 = canvas.toDataURL('image/jpeg', 0.6);
            callback(resizedBase64);
        };
        img.src = base64Str;
    },

    clearPreview: function () {
        var fotoInput = document.getElementById('foto');
        var preview = document.getElementById('preview');
        var previewContainer = document.getElementById('previewContainer');

        if (fotoInput) fotoInput.value = '';
        if (preview) preview.src = '';
        if (previewContainer) previewContainer.style.display = 'none';
    },

    addItem: function () {
        var nombre = document.getElementById('nombre');
        var talla = document.getElementById('talla');
        var cantidad = document.getElementById('cantidad');
        var descripcion = document.getElementById('descripcion');
        var precioCompra = document.getElementById('precioCompra');
        var precioVenta = document.getElementById('precioVenta');
        var fechaDevolucion = document.getElementById('fechaDevolucion');
        var preview = document.getElementById('preview');

        if (!nombre || !talla || !cantidad || !precioCompra || !precioVenta) {
            alert('Error: Faltan campos del formulario');
            return;
        }

        if (!talla.value) {
            alert('Error: Debes seleccionar una talla');
            return;
        }

        var editingId = document.getElementById('itemForm').dataset.editingId;
        
        var fotoToSave = '';
        if (preview && preview.src && preview.src.startsWith('data:image')) {
            fotoToSave = preview.src;
        }

        if (editingId) {
            this.updateItem(parseInt(editingId));
        } else {
            var item = {
                id: Date.now(),
                nombre: nombre.value,
                talla: talla.value,
                cantidad: parseInt(cantidad.value) || 1,
                descripcion: descripcion ? descripcion.value : '',
                precioCompra: parseFloat(precioCompra.value),
                precioVenta: parseFloat(precioVenta.value),
                fechaDevolucion: fechaDevolucion.value || '',
                foto: fotoToSave,
                vendido: false,
                fecha: new Date().toISOString()
            };

            this.items.push(item);
            this.showNotification('Articulo anadido correctamente');
        }

        this.saveItems();
        this.render();
        this.updateStats();

        var form = document.getElementById('itemForm');
        if (form) {
            form.reset();
            delete form.dataset.editingId;
        }

        this.clearPreview();
        this.cancelEdit();
    },

    editItem: function (id) {
        var item = this.items.find(function (i) {
            return i.id === id;
        });

        if (!item) return;

        document.getElementById('nombre').value = item.nombre;
        document.getElementById('talla').value = item.talla || 'M';
        document.getElementById('cantidad').value = item.cantidad || 1;
        document.getElementById('descripcion').value = item.descripcion || '';
        document.getElementById('precioCompra').value = item.precioCompra;
        document.getElementById('precioVenta').value = item.precioVenta;
        document.getElementById('fechaDevolucion').value = item.fechaDevolucion || '';

        if (item.foto) {
            document.getElementById('preview').src = item.foto;
            document.getElementById('previewContainer').style.display = 'block';
        }

        var form = document.getElementById('itemForm');
        form.dataset.editingId = id;

        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = '✏️ Actualizar Artículo';
        }

        var cancelBtn = document.getElementById('cancelEditBtn');
        if (!cancelBtn) {
            cancelBtn = document.createElement('button');
            cancelBtn.id = 'cancelEditBtn';
            cancelBtn.type = 'button';
            cancelBtn.className = 'btn btn-warning';
            cancelBtn.textContent = '❌ Cancelar Edición';
            cancelBtn.addEventListener('click', this.cancelEdit.bind(this));
            form.querySelector('.form-actions').appendChild(cancelBtn);
        }

        document.querySelector('.add-item-section').scrollIntoView({ behavior: 'smooth' });
        this.showNotification('Editando articulo: ' + item.nombre);
    },

    updateItem: function (id) {
        var item = this.items.find(function (i) {
            return i.id === id;
        });

        if (!item) return;

        var nombre = document.getElementById('nombre');
        var talla = document.getElementById('talla');
        var cantidad = document.getElementById('cantidad');
        var descripcion = document.getElementById('descripcion');
        var precioCompra = document.getElementById('precioCompra');
        var precioVenta = document.getElementById('precioVenta');
        var fechaDevolucion = document.getElementById('fechaDevolucion');
        var preview = document.getElementById('preview');

        item.nombre = nombre.value;
        item.talla = talla.value;
        item.cantidad = parseInt(cantidad.value) || 1;
        item.descripcion = descripcion ? descripcion.value : '';
        item.precioCompra = parseFloat(precioCompra.value);
        item.precioVenta = parseFloat(precioVenta.value);
        item.fechaDevolucion = fechaDevolucion.value || '';
        
        if (preview && preview.src && preview.src.startsWith('data:image')) {
            item.foto = preview.src;
        }

        this.showNotification('Articulo actualizado correctamente');
    },

    cancelEdit: function () {
        var form = document.getElementById('itemForm');
        if (form) {
            delete form.dataset.editingId;
            form.reset();
        }

        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = '💾 Guardar Artículo';
        }

        var cancelBtn = document.getElementById('cancelEditBtn');
        if (cancelBtn) {
            cancelBtn.remove();
        }

        this.clearPreview();
    },

    deleteItem: function (id) {
        if (confirm('Eliminar este articulo?')) {
            this.items = this.items.filter(function (item) {
                return item.id !== id;
            });
            this.saveItems();
            this.render();
            this.updateStats();
            this.showNotification('Articulo eliminado');
        }
    },

    toggleSold: function (id) {
        var item = this.items.find(function (i) {
            return i.id === id;
        });
        
        if (!item) return;
        
        if (item.vendido) {
            // Si está vendido, devolverlo a disponible
            item.vendido = false;
            this.saveItems();
            this.render();
            this.updateStats();
            this.showNotification('Artículo devuelto a disponible');
        } else {
            // Si está disponible, vender una unidad
            if (item.cantidad > 1) {
                // Si hay más de 1 unidad, reducir cantidad y crear uno vendido
                item.cantidad -= 1;
                
                // Crear nuevo artículo vendido con cantidad 1
                var itemVendido = {
                    id: Date.now(),
                    nombre: item.nombre,
                    talla: item.talla,
                    cantidad: 1,
                    descripcion: item.descripcion,
                    precioCompra: item.precioCompra,
                    precioVenta: item.precioVenta,
                    fechaDevolucion: item.fechaDevolucion,
                    foto: item.foto,
                    vendido: true,
                    fecha: new Date().toISOString()
                };
                
                this.items.push(itemVendido);
                this.showNotification('1 unidad vendida. Quedan ' + item.cantidad + ' disponibles');
            } else {
                // Si solo hay 1 unidad, marcar como vendido
                item.vendido = true;
                this.showNotification('Artículo marcado como vendido');
            }
            
            this.saveItems();
            this.render();
            this.updateStats();
        }
    },

    getFilteredItems: function () {
        var search = document.getElementById('searchInput').value.toLowerCase();
        var status = document.getElementById('filterStatus').value;
        var sortOrder = document.getElementById('sortOrder').value;

        var filtered = this.items.filter(function (item) {
            var matchSearch = item.nombre.toLowerCase().includes(search) ||
                (item.descripcion && item.descripcion.toLowerCase().includes(search));

            var matchStatus = (status === 'available' && !item.vendido) ||
                             (status === 'sold' && item.vendido);

            return matchSearch && matchStatus;
        });

        // Ordenar según la opción seleccionada
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        filtered.sort(function(a, b) {
            switch(sortOrder) {
                case 'oldest':
                    return new Date(a.fecha) - new Date(b.fecha);
                case 'newest':
                    return new Date(b.fecha) - new Date(a.fecha);
                case 'returnDateAsc':
                    // Artículos sin fecha de devolución van al final
                    if (!a.fechaDevolucion && !b.fechaDevolucion) return 0;
                    if (!a.fechaDevolucion) return 1;
                    if (!b.fechaDevolucion) return -1;
                    return new Date(a.fechaDevolucion) - new Date(b.fechaDevolucion);
                case 'returnDateDesc':
                    // Artículos sin fecha de devolución van al final
                    if (!a.fechaDevolucion && !b.fechaDevolucion) return 0;
                    if (!a.fechaDevolucion) return 1;
                    if (!b.fechaDevolucion) return -1;
                    return new Date(b.fechaDevolucion) - new Date(a.fechaDevolucion);
                default:
                    return 0;
            }
        });

        return filtered;
    },

    render: function () {
        var container = document.getElementById('inventoryList');
        var items = this.getFilteredItems();
        var self = this;

        if (items.length === 0) {
            container.innerHTML = '<p class="empty-message">No hay articulos</p>';
            return;
        }

        container.innerHTML = '';

        items.forEach(function (item) {
            var card = document.createElement('div');
            card.className = 'inventory-item' + (item.vendido ? ' sold' : '');
            card.dataset.id = item.id;

            var profit = item.precioVenta - item.precioCompra;
            var profitPercent = ((profit / item.precioCompra) * 100).toFixed(2);

            var html = '';

            if (item.foto && item.foto.length > 0) {
                html += '<img src="' + item.foto + '" alt="' + item.nombre + '">';
            } else {
                html += '<div style="height:200px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;border-radius:10px;margin-bottom:15px;">Sin imagen</div>';
            }

            html += '<div class="item-header">';
            html += '<span class="item-ref">Talla: ' + (item.talla || 'M') + ' | Cantidad: ' + (item.cantidad || 1) + '</span>';
            html += '<span class="item-status ' + (item.vendido ? 'status-sold' : 'status-available') + '">';
            html += item.vendido ? ' Vendido' : ' Disponible';
            html += '</span></div>';

            html += '<h3 class="item-name">' + item.nombre + '</h3>';

            if (item.descripcion) {
                html += '<p class="item-description">' + item.descripcion + '</p>';
            }

            if (item.fechaDevolucion) {
                var fechaDevolucion = new Date(item.fechaDevolucion);
                var hoy = new Date();
                hoy.setHours(0, 0, 0, 0);
                var diasRestantes = Math.ceil((fechaDevolucion - hoy) / (1000 * 60 * 60 * 24));
                
                var colorClase = '';
                var mensajeDias = '';
                
                if (diasRestantes < 0) {
                    colorClase = 'return-expired';
                    mensajeDias = '⚠️ Expirado hace ' + Math.abs(diasRestantes) + ' días';
                } else if (diasRestantes === 0) {
                    colorClase = 'return-today';
                    mensajeDias = '🔔 Expira HOY';
                } else if (diasRestantes <= 3) {
                    colorClase = 'return-urgent';
                    mensajeDias = '⏰ Quedan ' + diasRestantes + ' días';
                } else if (diasRestantes <= 7) {
                    colorClase = 'return-warning';
                    mensajeDias = '📅 Quedan ' + diasRestantes + ' días';
                } else {
                    colorClase = 'return-ok';
                    mensajeDias = '📅 Quedan ' + diasRestantes + ' días';
                }
                
                html += '<div class="return-date ' + colorClase + '">';
                html += '<strong>Devolución:</strong> ' + fechaDevolucion.toLocaleDateString('es-ES') + ' - ' + mensajeDias;
                html += '</div>';
            }

            html += '<div class="item-prices">';
            html += '<div class="price-row"><span class="price-label">Precio Compra:</span><span class="price-value">' + item.precioCompra.toFixed(2) + ' EUR</span></div>';
            html += '<div class="price-row"><span class="price-label">Precio Venta:</span><span class="price-value">' + item.precioVenta.toFixed(2) + ' EUR</span></div>';
            html += '<div class="price-row"><span class="price-label">Beneficio:</span><span class="profit">' + profit.toFixed(2) + ' EUR (' + profitPercent + '%)</span></div>';
            html += '</div>';

            html += '<div class="item-actions">';
            html += '<button class="edit-btn">Editar</button>';
            if (item.vendido) {
                html += '<button class="toggle-sold">Devolver</button>';
            } else {
                html += '<button class="toggle-sold">Vender 1</button>';
            }
            html += '<button class="delete-btn">Eliminar</button>';
            html += '</div>';

            card.innerHTML = html;

            card.querySelector('.edit-btn').addEventListener('click', function () {
                self.editItem(item.id);
            });

            card.querySelector('.toggle-sold').addEventListener('click', function () {
                self.toggleSold(item.id);
            });

            card.querySelector('.delete-btn').addEventListener('click', function () {
                self.deleteItem(item.id);
            });

            container.appendChild(card);
            
            // Separador eliminado - las tarjetas se muestran sin líneas divisorias
        });
    },

    updateStats: function () {
        // Contar total de unidades (suma de cantidades)
        var totalUnidades = this.items.reduce(function (sum, item) {
            return sum + (item.cantidad || 1);
        }, 0);
        
        // Contar unidades disponibles
        var availableUnidades = this.items.filter(function (item) {
            return !item.vendido;
        }).reduce(function (sum, item) {
            return sum + (item.cantidad || 1);
        }, 0);
        
        // Contar unidades vendidas
        var soldUnidades = this.items.filter(function (item) {
            return item.vendido;
        }).reduce(function (sum, item) {
            return sum + (item.cantidad || 1);
        }, 0);

        // Calcular valor del inventario (solo disponibles)
        var inventoryValue = this.items.filter(function (item) {
            return !item.vendido;
        }).reduce(function (sum, item) {
            var cantidad = item.cantidad || 1;
            return sum + (item.precioCompra * cantidad);
        }, 0);

        document.getElementById('totalItems').textContent = totalUnidades;
        document.getElementById('availableItems').textContent = availableUnidades;
        document.getElementById('soldItems').textContent = soldUnidades;
        document.getElementById('inventoryValue').textContent = inventoryValue.toFixed(2) + ' EUR';
    },

    saveItems: function () {
        localStorage.setItem('inventoryData', JSON.stringify(this.items));
    },

    loadItems: function () {
        var data = localStorage.getItem('inventoryData');
        this.items = data ? JSON.parse(data) : [];
    },

    loadBinId: function () {
        this.binId = localStorage.getItem('binId');
    },

    saveBinId: function (id) {
        this.binId = id;
        localStorage.setItem('binId', id);
    },

    showNotification: function (message, duration) {
        duration = duration || 3000; // 3 segundos por defecto
        
        var notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#28a745;color:white;padding:15px 25px;border-radius:8px;box-shadow:0 5px 15px rgba(0,0,0,0.3);z-index:10000;max-width:400px;';
        document.body.appendChild(notification);
        setTimeout(function () {
            notification.remove();
        }, duration);
    },

    exportToExcel: function () {
        var csv = 'Nombre,Talla,Cantidad,Descripcion,Precio Compra,Precio Venta,Beneficio,Estado,Fecha,Fecha Devolucion,Foto\n';

        this.items.forEach(function (item) {
            var profit = item.precioVenta - item.precioCompra;
            
            var fotoData = '';
            if (item.foto && item.foto.length > 0 && item.foto.startsWith('data:image')) {
                fotoData = item.foto.replace(/,/g, '|||COMMA|||');
            }
            
            var fechaFormateada = new Date(item.fecha).toISOString();
            
            var row = [
                item.nombre,
                item.talla || 'M',
                item.cantidad || 1,
                (item.descripcion || '').replace(/,/g, ';'),
                item.precioCompra.toFixed(2),
                item.precioVenta.toFixed(2),
                profit.toFixed(2),
                item.vendido ? 'Vendido' : 'Disponible',
                fechaFormateada,
                item.fechaDevolucion || '',
                '"' + fotoData + '"'
            ].join(',');
            csv += row + '\n';
        });

        var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement('a');
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'inventario.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showNotification('Inventario exportado a inventario.csv');
    },

    importFromExcel: function (e) {
        var self = this;
        var file = e.target.files[0];
        
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function (event) {
            try {
                var csv = event.target.result;
                var lines = csv.split('\n');
                var importedCount = 0;
                var errors = 0;

                for (var i = 1; i < lines.length; i++) {
                    var line = lines[i].trim();
                    if (!line) continue;

                    var values = [];
                    var currentValue = '';
                    var insideQuotes = false;
                    
                    for (var j = 0; j < line.length; j++) {
                        var char = line[j];
                        
                        if (char === '"') {
                            insideQuotes = !insideQuotes;
                        } else if (char === ',' && !insideQuotes) {
                            values.push(currentValue);
                            currentValue = '';
                        } else {
                            currentValue += char;
                        }
                    }
                    values.push(currentValue);
                    
                    if (values.length < 9) {
                        errors++;
                        continue;
                    }

                    var nombre = values[0].trim();
                    var talla = values[1].trim() || 'M';
                    var cantidad = parseInt(values[2]) || 1;
                    var descripcion = values[3].replace(/;/g, ',').trim();
                    var precioCompra = parseFloat(values[4]);
                    var precioVenta = parseFloat(values[5]);
                    var vendido = values[7].trim() === 'Vendido';
                    var fecha = values[8] ? values[8].trim() : new Date().toISOString();
                    var fechaDevolucion = values[9] ? values[9].trim() : '';
                    var foto = '';
                    
                    if (values[10]) {
                        foto = values[10].trim();
                        foto = foto.replace(/^"/, '').replace(/"$/, '');
                        foto = foto.replace(/\|\|\|COMMA\|\|\|/g, ',');
                        
                        if (foto && !foto.startsWith('data:image')) {
                            foto = '';
                        }
                    }

                    if (!nombre || isNaN(precioCompra) || isNaN(precioVenta)) {
                        errors++;
                        continue;
                    }

                    var item = {
                        id: Date.now() + i,
                        nombre: nombre,
                        talla: talla,
                        cantidad: cantidad,
                        descripcion: descripcion,
                        precioCompra: precioCompra,
                        precioVenta: precioVenta,
                        fechaDevolucion: fechaDevolucion,
                        foto: foto,
                        vendido: vendido,
                        fecha: fecha
                    };

                    self.items.push(item);
                    importedCount++;
                }

                self.saveItems();
                self.render();
                self.updateStats();

                var message = 'Importados ' + importedCount + ' articulos';
                if (errors > 0) {
                    message += ' (' + errors + ' errores o duplicados)';
                }
                self.showNotification(message);

            } catch (error) {
                self.showNotification('Error al importar el archivo');
                console.error('Error importando:', error);
            }

            e.target.value = '';
        };

        reader.readAsText(file, 'UTF-8');
    },

    // ========== FUNCIONES DE SINCRONIZACIÓN MANUAL (SIN SERVICIOS EXTERNOS) ==========
    
    checkLastSync: function () {
        var lastSync = localStorage.getItem('lastSyncTime');
        if (lastSync) {
            var syncDate = new Date(lastSync);
            var now = new Date();
            var diffHours = Math.floor((now - syncDate) / (1000 * 60 * 60));
            
            if (diffHours > 24) {
                this.showNotification('⚠️ Hace más de 24h que no haces backup. Considera exportar tus datos.', 5000);
            }
        }
    },

    syncDownload: function () {
        // Simular clic en importar archivo
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';
        
        var self = this;
        
        fileInput.addEventListener('change', function(e) {
            var file = e.target.files[0];
            if (!file) return;
            
            var reader = new FileReader();
            reader.onload = function(event) {
                try {
                    var data = JSON.parse(event.target.result);
                    
                    if (data.items && Array.isArray(data.items)) {
                        var confirmMsg = '¿Cargar ' + data.items.length + ' artículos?\n\n' +
                                       'Esto sobrescribirá tus ' + self.items.length + ' artículos locales.';
                        
                        if (confirm(confirmMsg)) {
                            self.items = data.items;
                            self.saveItems();
                            self.render();
                            self.updateStats();
                            
                            localStorage.setItem('lastSyncTime', new Date().toISOString());
                            
                            self.showNotification('✅ Cargados ' + data.items.length + ' artículos desde el archivo', 4000);
                        }
                    } else {
                        throw new Error('Formato de archivo inválido');
                    }
                } catch (error) {
                    self.showNotification('❌ Error: Archivo inválido. Debe ser un JSON válido.', 5000);
                    console.error('Error cargando archivo:', error);
                }
            };
            
            reader.readAsText(file);
        });
        
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    },

    syncUpload: function () {
        var self = this;
        
        if (this.items.length === 0) {
            this.showNotification('⚠️ No hay artículos para exportar', 3000);
            return;
        }
        
        var dataToExport = {
            items: this.items,
            lastSync: new Date().toISOString(),
            version: '1.0'
        };
        
        var jsonContent = JSON.stringify(dataToExport, null, 2);
        var blob = new Blob([jsonContent], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        
        var fecha = new Date();
        var nombreArchivo = 'inventario_' + 
                           fecha.getFullYear() + 
                           ('0' + (fecha.getMonth() + 1)).slice(-2) + 
                           ('0' + fecha.getDate()).slice(-2) + '_' +
                           ('0' + fecha.getHours()).slice(-2) + 
                           ('0' + fecha.getMinutes()).slice(-2) + 
                           '.json';
        
        link.href = url;
        link.download = nombreArchivo;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        localStorage.setItem('lastSyncTime', new Date().toISOString());
        
        var message = '✅ Archivo guardado: ' + nombreArchivo + '\n\n' +
                     '📁 Contiene ' + this.items.length + ' artículos\n\n' +
                     '💡 IMPORTANTE: Guarda este archivo en un lugar seguro.\n' +
                     'Para sincronizar en otro dispositivo, haz clic en "📥 Importar" y selecciona este archivo.';
        
        alert(message);
        this.showNotification('📦 Backup creado con ' + this.items.length + ' artículos', 4000);
    },

    createNewStorage: function (data) {
        // Función no necesaria en sincronización manual
        // Se mantiene para compatibilidad
        this.syncUpload();
    },

    copyToClipboard: function (text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            var textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    },

};

document.addEventListener('DOMContentLoaded', function () {
    inventoryApp.init();
});
