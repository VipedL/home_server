import {GoogleApis} from 'googleapis';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import {IUser} from '@src/models/User';
import {IReq, IRes} from './types/express/misc';


// Remove hardcoded secrets - use environment variables instead
// const API_KEY = process.env.GOOGLE_API_KEY;

// const oAuth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_OAUTH_CLIENT_ID,
//     process.env.GOOGLE_OAUTH_CLIENT_SECRET,
// );

const scopes = [
    'https://www.googleapis.com/auth/calendar'
];
// **** Functions **** //

/**
 * Get all users.
 */
async function getAllEvents(_: IReq, res: IRes) {
    const google = new GoogleApis();
    const auth = new google.auth.GoogleAuth({
        // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: [
          'https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/calendar.readonly',
        ],
    });
    const authClient = await auth.getClient();
    google.options({auth: authClient});
    
    const calendar = google.calendar({version: 'v3'});

    console.log(calendar);
    const list = await calendar.calendarList.list()
    console.log(list);
    const events: any[] = [];
    return res.status(HttpStatusCodes.OK).json({events});
}

/**
 * Add one user.
 */
async function add(req: IReq<{user: IUser}>, res: IRes) {
    const {user} = req.body;
    await UserService.addOne(user);
    return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{user: IUser}>, res: IRes) {
    const {user} = req.body;
    await UserService.updateOne(user);
    return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
    const id = +req.params.id;
    await UserService.delete(id);
    return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
    getAllEvents,
    add,
    update,
    delete: delete_,
} as const;
