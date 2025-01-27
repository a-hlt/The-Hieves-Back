import * as services from "../services/userServices.js";
import {deleteUserByUuid, updateUserByUuid} from "../services/userServices.js";

/**
 * create a user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export function create(req, res) {
    try {
        services.create(req.body);
        res.status(201).send("User created");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/**
 *  get user by uuid
 *  @param req
 *  @param res
 *  @returns {Promise<void>}
 */
export function GetUserByUuid(req, res) {
    try{
        services.getUserByUuid(req.body);
        res.status(200).send("User found");
    } catch (error) {
    res.status(400).send(error.message);}
}

/**
 * update user by uuid
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export function UpdateByUuid(req, res) {
    try {
        services.updateUserByUuid(req.body);
        res.status(200).send("User updated");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/**
 * delete user by uuid
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export function DeleteByUuid(req, res) {
    try {
        services.deleteUserByUuid(req.body);
        res.status(200).send("User deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}