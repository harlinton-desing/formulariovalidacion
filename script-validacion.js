// Datos de Colombia - Departamentos y Municipios
const colombianData = {
    "Amazonas": ["Leticia", "Puerto Nariño"],
    "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Apartadó", "Turbo", "Rionegro", "Sabaneta"],
    "Arauca": ["Arauca", "Arauquita", "Cravo Norte", "Fortul", "Puerto Rondón", "Saravena", "Tame"],
    "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Sabanagrande", "Puerto Colombia", "Galapa"],
    "Bolívar": ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar", "San Pablo"],
    "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa", "Villa de Leyva", "Nobsa"],
    "Caldas": ["Manizales", "Villamaría", "Chinchiná", "La Dorada", "Riosucio", "Anserma"],
    "Caquetá": ["Florencia", "San Vicente del Caguán", "Puerto Rico", "La Montañita", "El Doncello"],
    "Casanare": ["Yopal", "Aguazul", "Villanueva", "Tauramena", "Monterrey", "Paz de Ariporo"],
    "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada", "Patía", "Corinto", "Guapi"],
    "Cesar": ["Valledupar", "Aguachica", "Codazzi", "Bosconia", "El Copey", "La Jagua de Ibirico"],
    "Chocó": ["Quibdó", "Istmina", "Condoto", "Tadó", "Acandí", "Bahía Solano"],
    "Córdoba": ["Montería", "Cereté", "Sahagún", "Lorica", "Planeta Rica", "Montelíbano"],
    "Cundinamarca": ["Bogotá", "Soacha", "Girardot", "Zipaquirá", "Facatativá", "Chía", "Cajicá", "Fusagasugá"],
    "Guainía": ["Inírida", "Barranco Minas", "Mapiripana", "San Felipe", "Puerto Colombia"],
    "Guaviare": ["San José del Guaviare", "Calamar", "El Retorno", "Miraflores"],
    "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata", "Campoalegre", "San Agustín"],
    "La Guajira": ["Riohacha", "Maicao", "Uribia", "Manaure", "San Juan del Cesar", "Villanueva"],
    "Magdalena": ["Santa Marta", "Ciénaga", "Fundación", "Aracataca", "El Banco", "Plato"],
    "Meta": ["Villavicencio", "Acacías", "Granada", "Puerto López", "Cumaral", "San Martín"],
    "Nariño": ["Pasto", "Tumaco", "Ipiales", "Túquerres", "Samaniego", "La Unión"],
    "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario", "Los Patios", "Tibú"],
    "Putumayo": ["Mocoa", "Puerto Asís", "Orito", "Valle del Guamuez", "San Miguel", "Sibundoy"],
    "Quindío": ["Armenia", "Calarcá", "La Tebaida", "Montenegro", "Quimbaya", "Circasia"],
    "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia", "Marsella"],
    "San Andrés y Providencia": ["San Andrés", "Providencia"],
    "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja", "San Gil"],
    "Sucre": ["Sincelejo", "Corozal", "Sampués", "San Marcos", "Tolú", "Coveñas"],
    "Tolima": ["Ibagué", "Espinal", "Melgar", "Honda", "Líbano", "Chaparral"],
    "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago", "Buga", "Jamundí"],
    "Vaupés": ["Mitú", "Carurú", "Pacoa", "Taraira", "Papunaua", "Yavaraté"],
    "Vichada": ["Puerto Carreño", "La Primavera", "Santa Rosalía", "Cumaribo"]
};

// Variable global para almacenar los datos del formulario
let formData = {};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    populateDepartments();
    setupEventListeners();
    showConsentModal();
}

// Poblar el select de departamentos
function populateDepartments() {
    const departmentSelect = document.getElementById('departamento');
    
    Object.keys(colombianData).forEach(department => {
        const option = document.createElement('option');
        option.value = department;
        option.textContent = department;
        departmentSelect.appendChild(option);
    });
}

// Configurar todos los event listeners
function setupEventListeners() {
    // Botones del modal de consentimiento
    document.getElementById('btnAceptar').addEventListener('click', acceptConsent);
    document.getElementById('btnNoAceptar').addEventListener('click', rejectConsent);
    
    // Cambios en tipo de vivienda
    document.getElementById('tipoVivienda').addEventListener('change', handleViviendaChange);
    
    // Cambios en departamento
    document.getElementById('departamento').addEventListener('change', handleDepartmentChange);
    
    // Envío del formulario
    document.getElementById('dataForm').addEventListener('submit', handleFormSubmit);
    
    // Botón cancelar
    document.getElementById('btnCancelar').addEventListener('click', showCancelAlert);
    
    // Botones del modal de resumen
    document.getElementById('btnConfirmar').addEventListener('click', confirmSubmission);
    document.getElementById('btnCorregir').addEventListener('click', correctData);
    
    // Formateo automático de campos
    setupFieldFormatting();
    
    // Validación en tiempo real
    setupRealTimeValidation();
}

// Configurar formateo automático de campos
function setupFieldFormatting() {
    const documentInput = document.getElementById('numeroDocumento');
    if (documentInput) {
        documentInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 12) {
                value = value.slice(0, 12);
            }
            e.target.value = value;
        });
    }
}

// Configurar validación en tiempo real
function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Verificar si el campo es requerido y está vacío
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    }
    
    // Validaciones específicas
    switch (field.id) {
        case 'nombreCompleto':
            if (value && !isValidFullName(value)) {
                isValid = false;
                errorMessage = 'Debe incluir nombre y apellido completos';
            }
            break;
            
        case 'numeroDocumento':
            if (value && !isValidDocument(value)) {
                isValid = false;
                errorMessage = 'Número de documento inválido (6-12 dígitos)';
            }
            break;
    }
    
    // Aplicar estilos de validación
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        clearFieldError(field);
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Funciones de validación auxiliares
function isValidFullName(name) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2 && parts.every(part => part.length >= 2);
}

function isValidDocument(doc) {
    return /^\d{6,12}$/.test(doc);
}

// Mostrar error de campo
function showFieldError(field, message) {
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.style.display = 'block';
    }
}

// Limpiar error de campo
function clearFieldError(field) {
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.style.display = 'none';
    }
}

// Mostrar modal de consentimiento
function showConsentModal() {
    const consentModal = new bootstrap.Modal(document.getElementById('consentModal'));
    consentModal.show();
}

// Aceptar consentimiento
function acceptConsent() {
    const consentModal = bootstrap.Modal.getInstance(document.getElementById('consentModal'));
    consentModal.hide();
    document.getElementById('formContainer').style.display = 'block';
}

// Rechazar consentimiento
function rejectConsent() {
    showAlert('⚠️ INFORMACIÓN IMPORTANTE', 
        'Si no acepta el tratamiento de datos no es posible brindarle el servicio.\n\nPara continuar debe aceptar el tratamiento de sus datos personales según el Artículo 5 de la Ley 1581 de 2012.', 
        'warning');
}

// Manejar cambio en tipo de vivienda
function handleViviendaChange() {
    const tipoVivienda = document.getElementById('tipoVivienda').value;
    const casaFields = document.getElementById('casaFields');
    const conjuntoFields = document.getElementById('conjuntoFields');
    
    // Ocultar ambos campos condicionales
    casaFields.style.display = 'none';
    conjuntoFields.style.display = 'none';
    
    // Limpiar valores
    clearViviendaFields();
    
    // Mostrar campos apropiados
    if (tipoVivienda === 'casa') {
        casaFields.style.display = 'block';
    } else if (tipoVivienda === 'conjunto') {
        conjuntoFields.style.display = 'block';
    }
}

// Limpiar campos de vivienda
function clearViviendaFields() {
    document.getElementById('piso').value = '';
    document.getElementById('nombreConjunto').value = '';
    document.getElementById('torreBloque').value = '';
    document.getElementById('aptoCasa').value = '';
}

// Manejar cambio en departamento
function handleDepartmentChange() {
    const department = document.getElementById('departamento').value;
    const municipioSelect = document.getElementById('municipio');
    
    // Limpiar municipios anteriores
    municipioSelect.innerHTML = '<option value="">Seleccione municipio</option>';
    
    // Poblar municipios del departamento seleccionado
    if (department && colombianData[department]) {
        colombianData[department].forEach(municipality => {
            const option = document.createElement('option');
            option.value = municipality;
            option.textContent = municipality;
            municipioSelect.appendChild(option);
        });
    }
}

// Manejar envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        collectFormData();
        showSummaryModal();
    }
}

// Validar formulario completo
function validateForm() {
    const requiredFields = [
        'nombreCompleto', 'tipoDocumento', 'numeroDocumento', 
        'direccion', 'tipoVivienda', 'departamento', 'municipio', 'barrio'
    ];
    
    let isValid = true;
    let firstInvalidField = null;
    
    // Validar campos requeridos
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField(field)) {
            isValid = false;
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        }
    });
    
    // Validar nombre completo específicamente
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    if (nombreCompleto && nombreCompleto.split(' ').length < 2) {
        isValid = false;
        showAlert('⚠️ Validación', 'El nombre completo debe incluir nombre y apellido', 'warning');
        document.getElementById('nombreCompleto').focus();
        return false;
    }
    
    if (!isValid && firstInvalidField) {
        firstInvalidField.focus();
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showAlert('⚠️ Campos Incompletos', 'Por favor complete todos los campos obligatorios marcados con *', 'warning');
    }
    
    return isValid;
}

// Recopilar datos del formulario
function collectFormData() {
    formData = {
        nombreCompleto: document.getElementById('nombreCompleto').value,
        tipoDocumento: document.getElementById('tipoDocumento').value,
        numeroDocumento: document.getElementById('numeroDocumento').value,
        direccion: document.getElementById('direccion').value,
        tipoVivienda: document.getElementById('tipoVivienda').value,
        departamento: document.getElementById('departamento').value,
        municipio: document.getElementById('municipio').value,
        barrio: document.getElementById('barrio').value,
        fechaEnvio: new Date().toLocaleString('es-CO')
    };
    
    // Agregar campos condicionales de vivienda
    const tipoVivienda = document.getElementById('tipoVivienda').value;
    if (tipoVivienda === 'casa') {
        formData.piso = document.getElementById('piso').value;
    } else if (tipoVivienda === 'conjunto') {
        formData.nombreConjunto = document.getElementById('nombreConjunto').value;
        formData.torreBloque = document.getElementById('torreBloque').value;
        formData.aptoCasa = document.getElementById('aptoCasa').value;
    }
}

// Mostrar modal de resumen
function showSummaryModal() {
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = generateSummaryHTML();
    const summaryModal = new bootstrap.Modal(document.getElementById('summaryModal'));
    summaryModal.show();
}

// Generar HTML del resumen
function generateSummaryHTML() {
    let html = '';
    
    const fieldLabels = {
        nombreCompleto: '👤 Nombre Completo',
        tipoDocumento: '📄 Tipo de Documento',
        numeroDocumento: '🔢 Número de Documento',
        direccion: '🏠 Dirección',
        tipoVivienda: '🏘️ Tipo de Vivienda',
        piso: '🏢 Piso',
        nombreConjunto: '🏘️ Nombre del Conjunto',
        torreBloque: '🏗️ Torre/Bloque',
        aptoCasa: '🚪 Apto/Casa',
        departamento: '🗺️ Departamento',
        municipio: '🏙️ Municipio',
        barrio: '🏘️ Barrio',
        fechaEnvio: '⏰ Fecha de Validación'
    };
    
    Object.keys(formData).forEach(key => {
        if (formData[key] && formData[key] !== '') {
            const label = fieldLabels[key] || key;
            let value = formData[key];
            
            html += `
                <div class="summary-item">
                    <span class="summary-label">${label}:</span>
                    <span class="summary-value">${value}</span>
                </div>
            `;
        }
    });
    
    return html;
}

// Confirmar envío
function confirmSubmission() {
    const summaryModal = bootstrap.Modal.getInstance(document.getElementById('summaryModal'));
    summaryModal.hide();
    
    showLoadingModal();
    
    // Simular envío y luego enviar a WhatsApp
    setTimeout(() => {
        sendToWhatsApp();
        hideLoadingModal();
        showSuccessMessage();
        
        setTimeout(() => {
            resetForm();
        }, 3000);
    }, 2000);
}

// Corregir datos
function correctData() {
    const summaryModal = bootstrap.Modal.getInstance(document.getElementById('summaryModal'));
    summaryModal.hide();
}

// FUNCIÓN CORREGIDA CON EMOJIS PARA WHATSAPP - VERSIÓN VALIDACIÓN
function sendToWhatsApp() {
    const phoneNumber = '573125198465';
    
    // Crear mensaje usando códigos Unicode para garantizar compatibilidad
    const gamepadEmoji = String.fromCodePoint(0x1F3AE);
    const personEmoji = String.fromCodePoint(0x1F464);
    const memoEmoji = String.fromCodePoint(0x1F4DD);
    const documentEmoji = String.fromCodePoint(0x1F4C4);
    const houseEmoji = String.fromCodePoint(0x1F3E0);
    const buildingEmoji = String.fromCodePoint(0x1F3E2);
    const cityEmoji = String.fromCodePoint(0x1F3D8);
    const numbersEmoji = String.fromCodePoint(0x1F522);
    const constructionEmoji = String.fromCodePoint(0x1F3D7);
    const doorEmoji = String.fromCodePoint(0x1F6AA);
    const mapEmoji = String.fromCodePoint(0x1F5FA);
    const clockEmoji = String.fromCodePoint(0x23F0);
    const checkEmoji = String.fromCodePoint(0x2705);
    
    let message = `${gamepadEmoji} *VALIDACION DE DATOS COMPLETADA* ${gamepadEmoji}\n\n`;
    
    message += `${personEmoji} *INFORMACION PERSONAL:*\n`;
    message += `${memoEmoji} Nombre: ${formData.nombreCompleto}\n`;
    message += `${documentEmoji} Documento: ${formData.tipoDocumento} ${formData.numeroDocumento}\n`;
    message += `${houseEmoji} Direccion: ${formData.direccion}\n\n`;
    
    message += `${cityEmoji} *INFORMACION DE VIVIENDA:*\n`;
    message += `${buildingEmoji} Tipo: ${formData.tipoVivienda.toUpperCase()}\n`;
    
    if (formData.piso) {
        message += `${numbersEmoji} Piso: ${formData.piso}\n`;
    }
    if (formData.nombreConjunto) {
        message += `${cityEmoji} Conjunto: ${formData.nombreConjunto}\n`;
    }
    if (formData.torreBloque) {
        message += `${constructionEmoji} Torre/Bloque: ${formData.torreBloque}\n`;
    }
    if (formData.aptoCasa) {
        message += `${doorEmoji} Apto/Casa: ${formData.aptoCasa}\n`;
    }
    
    message += `${mapEmoji} Ubicacion: ${formData.departamento} - ${formData.municipio}\n`;
    message += `${cityEmoji} Barrio: ${formData.barrio}\n\n`;
    
    message += `${clockEmoji} Fecha de validacion: ${formData.fechaEnvio}\n\n`;
    message += `${checkEmoji} *DATOS VALIDADOS CORRECTAMENTE* ${checkEmoji}\n`;
    message += `${gamepadEmoji} Sistema de validacion gaming activo! ${gamepadEmoji}`;
    
    // Codificar el mensaje para WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Mostrar alerta de cancelación
function showCancelAlert() {
    const motivo = prompt('¿Por qué desea cancelar la validación?');
    
    if (motivo && motivo.trim()) {
        showAlert('ℹ️ Cancelación Registrada', 
            `Motivo: "${motivo}"\n\nGracias por su retroalimentación.`, 
            'info');
        
        setTimeout(() => {
            resetForm();
        }, 2000);
    }
}

// Reiniciar formulario
function resetForm() {
    document.getElementById('dataForm').reset();
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('casaFields').style.display = 'none';
    document.getElementById('conjuntoFields').style.display = 'none';
    
    // Limpiar municipios
    document.getElementById('municipio').innerHTML = '<option value="">Seleccione primero el departamento</option>';
    
    // Limpiar estilos de validación
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
    
    // Limpiar datos del formulario
    formData = {};
    
    // Mostrar modal de consentimiento
    showConsentModal();
}

// Funciones de modales dinámicos
function showLoadingModal() {
    const loadingModal = document.createElement('div');
    loadingModal.id = 'loadingModalDynamic';
    loadingModal.className = 'modal-overlay';
    
    loadingModal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, #1a1a1a, #000);
            border: 2px solid #0066ff;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 0 20px rgba(0, 102, 255, 0.3);
        ">
            <div class="loading-spinner"></div>
            <h3 style="color: #0066ff; margin: 1rem 0; font-family: 'Orbitron', monospace;">🎮 Validando datos...</h3>
            <p style="color: #f8f9fa;">Por favor espere mientras procesamos su información</p>
        </div>
    `;
    
    document.body.appendChild(loadingModal);
}

function hideLoadingModal() {
    const loadingModal = document.getElementById('loadingModalDynamic');
    if (loadingModal) {
        document.body.removeChild(loadingModal);
    }
}

function showSuccessMessage() {
    const successModal = document.createElement('div');
    successModal.className = 'modal-overlay';
    
    successModal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, #1a1a1a, #000);
            border: 2px solid #00ff00;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
        ">
            <h2 style="color: #00ff00; margin-bottom: 1rem; font-family: 'Orbitron', monospace;">✅ ¡Validación Exitosa! 🎮</h2>
            <p style="color: #f8f9fa; margin-bottom: 1rem;">Sus datos han sido validados correctamente.</p>
            <p style="color: #f8f9fa; margin-bottom: 1rem;">📱 Enviado a WhatsApp</p>
            <p style="color: #f8f9fa;">El proceso de validación ha sido completado. 🚀</p>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    setTimeout(() => {
        if (document.body.contains(successModal)) {
            document.body.removeChild(successModal);
        }
    }, 3000);
}

// Función para mostrar alertas personalizadas
function showAlert(title, message, type) {
    const alertModal = document.createElement('div');
    alertModal.className = 'modal-overlay';
    
    const colors = {
        warning: { border: '#ffff00', bg: '#cccc00' },
        info: { border: '#0099ff', bg: '#0077cc' },
        error: { border: '#ff0000', bg: '#cc0000' },
        success: { border: '#00ff00', bg: '#00cc00' }
    };
    
    const color = colors[type] || colors.info;
    
    alertModal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, #1a1a1a, #000);
            border: 2px solid ${color.border};
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 0 20px ${color.border}33;
        ">
            <h3 style="color: ${color.border}; margin-bottom: 1rem; font-family: 'Orbitron', monospace;">${title}</h3>
            <p style="color: #f8f9fa; margin-bottom: 1.5rem; white-space: pre-line;">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(45deg, ${color.bg}, ${color.border});
                color: ${type === 'warning' ? '#000' : '#fff'};
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                text-transform: uppercase;
            ">Entendido</button>
        </div>
    `;
    
    document.body.appendChild(alertModal);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(alertModal)) {
            document.body.removeChild(alertModal);
        }
    }, 5000);
}

// Utilidades adicionales
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    return phone;
}

function capitalizeWords(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Exportar funciones para uso global si es necesario
window.ValidationForm = {
    resetForm,
    validateForm,
    sendToWhatsApp,
    showAlert
};
