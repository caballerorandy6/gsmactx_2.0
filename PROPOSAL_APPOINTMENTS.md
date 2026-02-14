# Propuesta: Sistema de Citas/Appointments para GSM A/C

## Resumen Ejecutivo

Sistema completo de gestión de citas que permite:
- **Admin**: Crear, ver, editar y eliminar citas desde un dashboard
- **Clientes**: Agendar citas desde un formulario público en la web

---

## Servicios a Incluir

| ID | Servicio | Tipo |
|----|----------|------|
| 1 | Mantenimiento de aire acondicionado | AC_MAINTENANCE |
| 2 | Mantenimiento de calefacción | HEATING_MAINTENANCE |
| 3 | Reparación de AC | AC_REPAIR |
| 4 | Reparación de calefacción | HEATING_REPAIR |
| 5 | Instalación de AC | AC_INSTALLATION |
| 6 | Instalación de calefacción | HEATING_INSTALLATION |
| 7 | Instalación de sistema HVAC completo | FULL_HVAC_INSTALLATION |
| 8 | Limpieza de ductos | DUCT_CLEANING |
| 9 | Estimado gratis para reemplazo | FREE_ESTIMATE |

---

## Funcionalidades

### Dashboard Admin

1. **Vista de Calendario**
   - Vista diaria, semanal y mensual
   - Citas coloreadas por tipo de servicio
   - Drag & drop para reprogramar (opcional)

2. **CRUD de Citas**
   - Crear nueva cita con datos del cliente
   - Ver detalles de cita
   - Editar información
   - Cancelar/eliminar citas
   - Cambiar estado (Pendiente → Confirmada → En progreso → Completada)

3. **Gestión de Clientes**
   - Lista de clientes con historial
   - Búsqueda y filtros
   - Información de contacto

4. **Estadísticas**
   - Citas del día/semana/mes
   - Servicios más solicitados
   - Tasas de cancelación

### Formulario Público (Clientes)

1. **Formulario de Reserva**
   - Selección de servicio
   - Selector de fecha (calendario)
   - Selector de hora disponible
   - Datos de contacto (nombre, email, teléfono)
   - Dirección del servicio
   - Notas adicionales

2. **Confirmación**
   - Email de confirmación al cliente
   - Email de notificación al admin
   - Página de confirmación

3. **Protección**
   - reCAPTCHA v3 (ya integrado)
   - Validación con Zod

---

## Propuesta de Precio

### Precio Total: $800 - $1,200 USD

| Componente | Horas Est. | Precio |
|------------|------------|--------|
| **Base de Datos** | 4h | $100 |
| Modelos Prisma, migraciones, relaciones |
| **Backend/API** | 12h | $300 |
| Server actions, validaciones, emails |
| **Dashboard Admin** | 16h | $400 |
| Calendario, CRUD, filtros, estadísticas |
| **Formulario Público** | 8h | $200 |
| Formulario, selector de fechas, confirmación |
| **Testing & QA** | 4h | $100 |
| Pruebas, correcciones, deploy |

**Precio Sugerido para Pequeño Negocio: $800 USD**

### Opciones de Pago

1. **Pago Único**: $800 USD
2. **50/50**: $400 al inicio + $400 al entregar
3. **3 Pagos**: $300 + $300 + $200

---

## Supabase vs Railway: Análisis

### Supabase (Gratis) - RECOMENDADO para este proyecto

| Aspecto | Detalle |
|---------|---------|
| **Costo** | $0/mes |
| **Base de Datos** | 500 MB PostgreSQL |
| **Conexiones** | Suficiente para pequeño negocio |
| **Limitaciones** | Pausa después de 7 días de inactividad |
| **Ideal para** | Proyectos con tráfico bajo-medio |

**Ventajas:**
- Ya está configurado en el proyecto
- No requiere cambios
- Suficiente para ~5,000 citas/mes
- Backups incluidos
- Dashboard visual para ver datos

**Desventajas:**
- Pausa si no hay actividad (se resuelve con keep-alive cron)
- Límite de 500 MB (suficiente para años de uso)

### Railway (Pago)

| Plan | Costo | Incluye |
|------|-------|---------|
| **Hobby** | $5/mes | 512 MB RAM, 1 GB storage |
| **Pro** | $20/mes | 8 GB RAM, 100 GB storage |

**Ventajas:**
- Sin pausas por inactividad
- Más recursos
- Mejor para alto tráfico

**Desventajas:**
- Costo mensual recurrente
- Migración necesaria
- Configuración adicional

### Mi Recomendación: **Quedarse con Supabase Gratis**

**Razones:**
1. ✅ Ya está funcionando
2. ✅ 500 MB es suficiente para 50,000+ citas
3. ✅ El cron job de keep-alive ya existe
4. ✅ Sin costos adicionales para el cliente
5. ✅ Escalar a Supabase Pro ($25/mes) si crece

**Cuándo cambiar a pago:**
- Si el negocio crece significativamente (>100 citas/día)
- Si necesitan más de 500 MB de storage
- Si requieren SLA empresarial

---

## Planificación de Implementación

### Semana 1: Base de Datos y Backend (3-4 días)

| Día | Tareas |
|-----|--------|
| **1** | Diseñar schema Prisma, crear modelos Appointment, ServiceType enum |
| **2** | Crear server actions: createAppointment, updateAppointment, deleteAppointment |
| **3** | Implementar getAppointments con filtros (fecha, status, servicio) |
| **4** | Integrar emails de confirmación (cliente + admin) |

### Semana 2: Dashboard Admin (4-5 días)

| Día | Tareas |
|-----|--------|
| **5** | Crear página /admin-dashboard/appointments con lista de citas |
| **6** | Implementar formulario de crear/editar cita |
| **7** | Agregar filtros por fecha, servicio, estado |
| **8** | Crear vista de calendario (día/semana/mes) |
| **9** | Agregar estadísticas y contadores |

### Semana 3: Formulario Público y QA (3-4 días)

| Día | Tareas |
|-----|--------|
| **10** | Crear página /agendar-cita con formulario público |
| **11** | Implementar selector de fecha/hora con disponibilidad |
| **12** | Testing completo, correcciones de bugs |
| **13** | Deploy a producción, documentación |

### Tiempo Total Estimado: 10-13 días hábiles

---

## Entregables

1. ✅ Modelos de base de datos (Prisma)
2. ✅ **Server actions** para CRUD de citas (NO API routes)
3. ✅ Dashboard admin con calendario
4. ✅ Formulario público de reserva
5. ✅ Emails de confirmación
6. ✅ Documentación de uso
7. ✅ Deploy a producción
8. ✅ **Limpieza de API routes innecesarias**

---

## Refactoring: API Routes → Server Actions

### API Routes a Eliminar:
| Route | Reemplazo |
|-------|-----------|
| `/api/send-email` | Ya existe `sendEmailContactAction` |
| `/api/campaigns/[id]` | Crear `getCampaignByIdAction` |

### API Routes a Mantener:
| Route | Razón |
|-------|-------|
| `/api/cron/keepalive` | Vercel cron requiere HTTP |
| `/api/cron/send-campaigns` | Vercel cron requiere HTTP |

### Beneficios de Server Actions:
- Menos código boilerplate
- Type-safety end-to-end
- Mejor rendimiento (no HTTP roundtrip)
- Integración nativa con formularios
- Revalidación automática de cache

---

## Próximos Pasos

1. **Aprobar propuesta** - Confirmar alcance y precio
2. **Primer pago** - Si aplica pago 50/50
3. **Kick-off** - Iniciar desarrollo
4. **Revisiones semanales** - Demo de avances
5. **QA y Deploy** - Pruebas finales
6. **Entrega** - Documentación y pago final

---

## Contacto

**Developer:** Randy Caballero
**Proyecto:** GSM A/C & General Contractor INC
**Fecha:** Febrero 2026
