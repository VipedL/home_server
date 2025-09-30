/**
 * Express router paths go here.
 */

import ElectricityPrice from '@src/models/ElectricityPrice';
import {Immutable} from '@src/other/types';

const Paths = {
    Base: '/api',
    Auth: {
        Base: '/auth',
        Login: '/login',
        Logout: '/logout',
    },
    Users: {
        Base: '/users',
        Get: '/all',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Calendar: {
        Base: '/calendar',
        GetAllEvents: '/events',
    },
    Electricity: {
        Base: '/electricity',
        GetAll: '/',
    },
    Sockets: {
        Base: '/sockets',
        GetAll: '/all',
        Add: '/add',
    }
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
