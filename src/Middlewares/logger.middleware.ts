import { Request, Response, NextFunction } from 'express';
export function LoggerGlobal(req: Request, res: Response, next: NextFunction) {
  const date = new Date();
  const horaArgentina = date.toLocaleTimeString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: '2-digit',
    minute: '2-digit',
  });
  const dia = date.toLocaleDateString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
  });
  console.log(
    `Estas ejecutando el metodo ${req.method} en el endpoint ${req.url} a las ${horaArgentina} del ${dia}`,
  );
  next();
}
