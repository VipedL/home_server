import { Router } from 'express';
import jetValidator from 'jet-validator';

import adminMw from './middleware/adminMw';
import Paths from './constants/Paths';
import User from '@src/models/User';
// import Electricity from '@src/models/Electricity';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import CalendarRoutes from './CalendarRoutes';
import ElectricityRoutes from './ElectricityRoutes';
import SocketRoutes from './SocketRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// **** Setup **** //

const authRouter = Router();
const electricityRouter = Router();
const socketRouter = Router();

// Login user
authRouter.post(
  Paths.Auth.Login,
  validate('email', 'password'),
  AuthRoutes.login,
);

// Logout user
authRouter.get(
  Paths.Auth.Logout,
  AuthRoutes.logout,
);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);


// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.isUser]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.isUser]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

const calendarRouter = Router();

calendarRouter.get(
  Paths.Calendar.GetAllEvents,
  CalendarRoutes.getAllEvents,
)

electricityRouter.get(
  Paths.Electricity.GetAll,
  ElectricityRoutes.getAll,
)

socketRouter.get(
  Paths.Sockets.GetAll,
  SocketRoutes.getSockets,
)

socketRouter.post(
  Paths.Sockets.Add,
  SocketRoutes.addSocket,
)

console.log(Paths.Calendar.GetAllEvents)

// Add UserRouter
// apiRouter.use(Paths.Users.Base, adminMw, userRouter);
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Calendar.Base, calendarRouter);

apiRouter.use(Paths.Electricity.Base, electricityRouter);
apiRouter.use(Paths.Sockets.Base, socketRouter);


// **** Export default **** //

export default apiRouter;
