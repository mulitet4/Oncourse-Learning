# Oncourse Learning API

### Initialize

- `npx prisma init --datasource-provider sqlite`, start the prisma schema
- `npx prisma generate`, generate the prisma client lib

### Quick Commands

- Get a random secret for the site - `require('crypto').randomBytes(64).toString('hex')`
- Run migrations on prisma using `npx prisma migrate`

### References

- [Prisma ORM docs](https://www.prisma.io/docs/orm)
- [Socket.io Express Initialization](https://socket.io/docs/v4/server-initialization/#with-express)
