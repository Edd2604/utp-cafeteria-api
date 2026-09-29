# UTP Cafetería · API

Backend de pedidos de la cafetería universitaria: catálogo, inventario del día,
órdenes, pagos y usuarios.

Monolito modular en NestJS —un solo despliegue, los dominios separados en
módulos—, desplegado en Vercel. Lo consume el
[frontend](https://github.com/Edd2604/utp-cafeteria-frontend).

- Prefijo global `api/v1`
- Documentación Swagger en `/doc` (la raíz redirige ahí)

## Módulos

```
src/modules/
├── auth/        Sesión, JWT con refresh
├── users/       Cuentas y roles
├── products/    Catálogo, por categorías
├── inventory/   Stock del día
├── orders/      Órdenes y su ciclo de vida
├── payments/    Cobro
└── events/      Tiempo real y notificaciones
```

Y en `src/providers`, lo que habla con el exterior: `prisma`, `cloudinary`
(imágenes), `pusher` (websockets), `vapid` (claves de push) y `reniec`.

## El inventario es diario, no un contador

La decisión de diseño más interesante del proyecto. En vez de una columna
`stock` sobre el producto, hay una tabla por producto **y día**:

```prisma
model Inventario_Diario {
  producto_id    Int
  fecha          DateTime
  stock_inicial  Int
  stock          Int
  ultima_salida  DateTime?
  ultima_entrada DateTime?

  @@unique([producto_id, fecha])
}
```

Una cafetería no arrastra el stock de ayer: cada mañana se repone y se empieza
de cero. Guardar `stock_inicial` junto al `stock` actual permite saber cuánto se
vendió ese día sin recorrer las órdenes, y el `@@unique([producto_id, fecha])`
impide que se genere dos veces el inventario de una misma jornada.

El inventario del día se crea con `POST /inventario/generar-inventario`, pensado
para dispararse automáticamente —de ahí `CRON_SECRET` en el entorno— y también a
mano desde el panel.

## Validación de identidad contra RENIEC

`src/providers/reniec` consulta el registro nacional de identidad peruano para
resolver el nombre a partir del DNI:

```ts
const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`
```

El alumno escribe su documento y sus datos se rellenan solos, ya verificados,
en vez de escribirlos a mano y con erratas.

## Tiempo real y notificaciones

El módulo `events` empuja los cambios por dos vías distintas:

| Vía | Para qué |
|---|---|
| **Pusher** | Actualizar la interfaz abierta: un pedido nuevo aparece en el panel, el alumno ve avanzar el suyo |
| **Web Push (VAPID)** | Avisar con la pestaña cerrada: «tu pedido está listo para recoger» |

Son complementarias: una sirve mientras miras, la otra cuando no.

## El ciclo de una orden

```
EN_PROCESO ──▶ RECOGER ──▶ COMPLETADA
     │
     ├──▶ ABANDONADA   (no la recogieron)
     └──▶ CANCELADA
```

Cada orden guarda su `hora_programada` —la hora de recojo que eligió el alumno—,
el `monto_total` en `Decimal(10,2)` y el método de pago (`TARJETA`, `YAPE`,
`PLIN`). `ABANDONADA` existe para distinguir el pedido que nadie fue a buscar
del que se canceló a propósito: son dos problemas distintos del negocio.

## Stack

NestJS · TypeScript · Prisma · PostgreSQL · JWT con refresh · Swagger ·
class-validator y class-transformer · Joi · Cloudinary · Pusher · Web Push ·
`@nestjs/schedule` · Luxon y date-fns-tz (todo en `America/Lima`)

## Cómo levantarlo

```bash
npm install
npx prisma migrate dev
npm run start:dev
```

El `.env` necesita:

```
PORT=  DATABASE_URL=
JWT_SECRET=  JWT_REFRESH_SECRET=
CLOUDINARY_NAME=  CLOUDINARY_API_KEY=  CLOUDINARY_API_SECRET=
PUSHER_APP_ID=  PUSHER_KEY=  PUSHER_SECRET=  PUSHER_CLUSTER=
VAPID_PUBLIC_KEY=  VAPID_PRIVATE_KEY=
RENIEC_TOKEN=  CRON_SECRET=
```

Se valida con Joi al arrancar: si falta alguna, el proceso no levanta en vez de
fallar en la primera petición.

---

