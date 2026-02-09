var inventoryApp = {
    items: [],

    init: function () {
        this.loadItems();
        this.setupEvents();
        this.render();
        this.updateStats();
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

        var zaraUrlInput = document.getElementById('zaraUrl');
        if (zaraUrlInput) {
            zaraUrlInput.addEventListener('input', function () {
                self.extractFromZara();
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
        var referencia = document.getElementById('referencia');
        var nombre = document.getElementById('nombre');
        var descripcion = document.getElementById('descripcion');
        var precioCompra = document.getElementById('precioCompra');
        var precioVenta = document.getElementById('precioVenta');
        var fechaDevolucion = document.getElementById('fechaDevolucion');
        var preview = document.getElementById('preview');

        if (!referencia || !nombre || !precioCompra || !precioVenta) {
            alert('Error: Faltan campos del formulario');
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
                referencia: referencia.value,
                nombre: nombre.value,
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

        document.getElementById('referencia').value = item.referencia;
        document.getElementById('nombre').value = item.nombre;
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

        var referencia = document.getElementById('referencia');
        var nombre = document.getElementById('nombre');
        var descripcion = document.getElementById('descripcion');
        var precioCompra = document.getElementById('precioCompra');
        var precioVenta = document.getElementById('precioVenta');
        var fechaDevolucion = document.getElementById('fechaDevolucion');
        var preview = document.getElementById('preview');

        item.referencia = referencia.value;
        item.nombre = nombre.value;
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
        if (item) {
            item.vendido = !item.vendido;
            this.saveItems();
            this.render();
            this.updateStats();
            this.showNotification(item.vendido ? 'Marcado como vendido' : 'Marcado como disponible');
        }
    },

    getFilteredItems: function () {
        var search = document.getElementById('searchInput').value.toLowerCase();
        var status = document.getElementById('filterStatus').value;
        var sortOrder = document.getElementById('sortOrder').value;

        var filtered = this.items.filter(function (item) {
            var matchSearch = item.referencia.toLowerCase().includes(search) ||
                item.nombre.toLowerCase().includes(search) ||
                item.descripcion.toLowerCase().includes(search);

            var matchStatus = status === 'all' ||
                (status === 'available' && !item.vendido) ||
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
            html += '<span class="item-ref">' + item.referencia + '</span>';
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
            html += '<button class="toggle-sold">' + (item.vendido ? 'Disponible' : 'Vendido') + '</button>';
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
            
            // Añadir separador visible después de cada tarjeta excepto la última
            if (items.indexOf(item) < items.length - 1) {
                var separator = document.createElement('div');
                separator.style.cssText = 'grid-column: 1 / -1; height: 2px; background: linear-gradient(90deg, transparent, #667eea, transparent); margin: 20px 0;';
                container.appendChild(separator);
            }
        });
    },

    updateStats: function () {
        var total = this.items.length;
        var available = this.items.filter(function (item) {
            return !item.vendido;
        }).length;
        var sold = this.items.filter(function (item) {
            return item.vendido;
        }).length;

        var inventoryValue = this.items.filter(function (item) {
            return !item.vendido;
        }).reduce(function (sum, item) {
            return sum + item.precioCompra;
        }, 0);

        document.getElementById('totalItems').textContent = total;
        document.getElementById('availableItems').textContent = available;
        document.getElementById('soldItems').textContent = sold;
        document.getElementById('inventoryValue').textContent = inventoryValue.toFixed(2) + ' EUR';
    },

    saveItems: function () {
        localStorage.setItem('inventoryData', JSON.stringify(this.items));
    },

    loadItems: function () {
        var data = localStorage.getItem('inventoryData');
        this.items = data ? JSON.parse(data) : [];
    },

    showNotification: function (message) {
        var notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#28a745;color:white;padding:15px 25px;border-radius:8px;box-shadow:0 5px 15px rgba(0,0,0,0.3);z-index:10000;';
        document.body.appendChild(notification);
        setTimeout(function () {
            notification.remove();
        }, 3000);
    },

    exportToExcel: function () {
        var csv = 'Referencia,Nombre,Descripcion,Precio Compra,Precio Venta,Beneficio,Estado,Fecha,Fecha Devolucion,Foto\n';

        this.items.forEach(function (item) {
            var profit = item.precioVenta - item.precioCompra;
            
            var fotoData = '';
            if (item.foto && item.foto.length > 0 && item.foto.startsWith('data:image')) {
                fotoData = item.foto.replace(/,/g, '|||COMMA|||');
            }
            
            var fechaFormateada = new Date(item.fecha).toISOString();
            
            var row = [
                item.referencia,
                item.nombre,
                item.descripcion.replace(/,/g, ';'),
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
                    
                    if (values.length < 8) {
                        errors++;
                        continue;
                    }

                    var referencia = values[0].trim();
                    var nombre = values[1].trim();
                    var descripcion = values[2].replace(/;/g, ',').trim();
                    var precioCompra = parseFloat(values[3]);
                    var precioVenta = parseFloat(values[4]);
                    var vendido = values[6].trim() === 'Vendido';
                    var fecha = values[7] ? values[7].trim() : new Date().toISOString();
                    var fechaDevolucion = values[8] ? values[8].trim() : '';
                    var foto = '';
                    
                    if (values[9]) {
                        foto = values[9].trim();
                        foto = foto.replace(/^"/, '').replace(/"$/, '');
                        foto = foto.replace(/\|\|\|COMMA\|\|\|/g, ',');
                        
                        if (foto && !foto.startsWith('data:image')) {
                            foto = '';
                        }
                    }

                    if (!referencia || !nombre || isNaN(precioCompra) || isNaN(precioVenta)) {
                        errors++;
                        continue;
                    }

                    var item = {
                        id: Date.now() + i,
                        referencia: referencia,
                        nombre: nombre,
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

    extractProductInfo: function (url) {
        var urlLower = url.toLowerCase();
        var productInfo = {
            nombre: '',
            precio: 0,
            referencia: '',
            imagen: ''
        };

        if (!urlLower.includes('zara.com')) {
            return null;
        }

        var matches = url.match(/\/([^\/]+)-p(\d+)\.html/);
        if (matches) {
            var slug = matches[1];
            var codigoProducto = matches[2];
            
            productInfo.nombre = slug.split('-').map(function(word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
            
            var refFormateada = codigoProducto.substring(0, 4) + '/' + 
                                codigoProducto.substring(4, 7) + '/' + 
                                codigoProducto.substring(7);
            
            productInfo.referencia = refFormateada;
        }

        return productInfo;
    },

    extractFromZara: function () {
        var url = document.getElementById('zaraUrl').value.trim();
        
        if (!url) {
            return;
        }

        if (!url.toLowerCase().includes('zara.com')) {
            return;
        }

        var productInfo = this.extractProductInfo(url);
        
        if (productInfo && productInfo.referencia) {
            document.getElementById('referencia').value = productInfo.referencia;
        }
        
        if (productInfo && productInfo.nombre) {
            document.getElementById('nombre').value = productInfo.nombre;
        }

        var descripcionField = document.getElementById('descripcion');
        if (descripcionField && !descripcionField.value) {
            descripcionField.value = 'Importado desde: ' + url;
        }

        var self = this;
        
        // Usar cors.sh que funciona mejor con Zara
        var proxyUrl = 'https://proxy.cors.sh/' + url;
        
        self.showNotification('⏳ Extrayendo datos de Zara...' );
        
        fetch(proxyUrl, {
            headers: {
                'x-cors-api-key': 'temp_1234567890abcdef'
            }
        })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Error al conectar con Zara');
                }
                return response.text();
            })
            .then(function(html) {
                var precioMatch = html.match(/<span class="money-amount__main">([0-9,]+)\s*EUR<\/span>/);
                if (precioMatch) {
                    var precio = parseFloat(precioMatch[1].replace(',', '.'));
                    document.getElementById('precioCompra').value = precio.toFixed(2);
                }
                
                var imagenMatch = html.match(/<img[^>]+class="[^"]*media-image__image[^"]*"[^>]+src="([^"]+)"/);
                if (!imagenMatch) {
                    imagenMatch = html.match(/<img[^>]+src="(https:\/\/static\.zara\.net\/photos[^"]+)"/);
                }
                if (!imagenMatch) {
                    imagenMatch = html.match(/picture__image[^>]+src="([^"]+)"/);
                }
                
                if (imagenMatch) {
                    var imgUrl = imagenMatch[1];
                    if (!imgUrl.startsWith('http')) {
                        imgUrl = 'https:' + imgUrl;
                    }
                    
                    // Descargar imagen directamente (las imágenes de Zara no tienen CORS)
                    fetch(imgUrl)
                        .then(function(imgResponse) {
                            return imgResponse.blob();
                        })
                        .then(function(blob) {
                            var reader = new FileReader();
                            reader.onloadend = function() {
                                self.resizeImage(reader.result, function(resizedImage) {
                                    document.getElementById('preview').src = resizedImage;
                                    document.getElementById('previewContainer').style.display = 'block';
                                    self.showNotification('✅ Datos e imagen extraidos de Zara correctamente');
                                });
                            };
                            reader.readAsDataURL(blob);
                        })
                        .catch(function(imgError) {
                            console.log('No se pudo cargar la imagen:', imgError);
                            if (precioMatch) {
                                self.showNotification('✅ Datos extraidos de Zara (sin imagen)');
                            } else {
                                self.showNotification('ℹ️ Nombre y referencia extraidos. Ingresa el precio manualmente.');
                            }
                        });
                } else {
                    if (precioMatch) {
                        self.showNotification('✅ Datos extraidos de Zara correctamente');
                    } else {
                        self.showNotification('ℹ️ Nombre y referencia extraidos. Ingresa el precio manualmente.');
                    }
                }
            })
            .catch(function(error) {
                console.log('Error al extraer datos de Zara:', error);
                if (productInfo && productInfo.nombre) {
                    self.showNotification('ℹ️ Nombre y referencia extraidos. Completa los demás campos manualmente.');
                } else {
                    self.showNotification('⚠️ No se pudo conectar. Verifica la URL o completa manualmente.');
                }
            });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    inventoryApp.init();
});
