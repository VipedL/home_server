"use strict";
/**
 * Express router paths go here.
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
        GetData: '/data',
    },
    Sockets: {
        Base: '/sockets',
        GetAll: '/all',
        Add: '/add',
    }
};
exports.default = Paths;
