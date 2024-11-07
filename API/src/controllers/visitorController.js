import visitorModel from "../models/visitorModel";
import checkCredentials from "../helpers/UserCheckCredentials";
import UserTokenGenerator from "../helpers/userTokenGenerator";
import historyModel from "../models/historyModel";
import { hashPassword } from "../helpers/hash_match_password";

class visitorController {
    static async login(req, res) {
        try {
            console.log(req.body)
            const isValid = await checkCredentials(req.body.email, req.body.password);
            if (isValid) {
                const token = await UserTokenGenerator(req.body.email);
                const user = await visitorModel.findOne({ email: req.body.email });
                user.password=""
                res.status(200).json({ "message": "successfully logged in", "token": token,user });
            }
            else if (isValid == null) {
                res.status(201).json({ "message": "user doesnt exist" });
            }
            else {
                res.status(202).json({ "message": "invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ error })
        }
    }
    static async registerVisitor(req, res) {
        const visitor = new visitorModel(req.body);
        console.log(req.body)
        try {
            const data = await visitor.save();
            res.status(200).json({ "message": "successfully saved" })
        }

        catch (error) {
            if (error.code === 11000) {
                res.status(405).json({ "message": "email has been used" });
            }
            else {
                res.status(400).json(error.message);
                console.log(error);
                console.log(error.code);
            }
        }
    }

    static async getDetails(req, res) {

        const visitor = await visitorModel.findOne({ email: req.email });
        try {
            res.status(200).json(visitor)
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }

    static async getHistoryDetails(req, res) {

        const visitor = await visitorModel.findOne({ email: req.email });
        const history = await historyModel.find({ visitor: visitor._id });
        try {
            res.status(200).json(history)
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }
    static async getHistoryDetails(req, res) {

        const visitor = await visitorModel.findOne({ email: req.email });
        const history = await historyModel.find({ visitor: visitor._id });
        try {
            res.status(200).json(history)
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }
    static async activatePassword(req, res) {
        const newPassword = req.body.password
        const visitor = await visitorModel.findOne({ _id: req.body.id });
        if (!visitor) {
            return res.status(404).json({ message: 'User not found' });
        }
        try {
            const password = await hashPassword(newPassword)
            visitor.password = password;
            await visitor.save();
            res.status(200).json({ "message": "succesfully activated" })
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }

    static async checkEmail(req, res) {
        const email = req.body.email
        try {
            const visitor = await visitorModel.findOne({ email})
            if (visitor && !visitor.password) {
                return res.status(200).json({ confirm: true, user: visitor })
            }
            else if (visitor && visitor.password) {
                return res.status(200).json({ confirm: false, message: "Already has record" })
            }
            else {
                return res.status(400).json({ confirm: false })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

}

export default visitorController;