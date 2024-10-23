import historyModel from "../models/historyModel";
import mongoose from "mongoose";
import visitorModel from "../models/visitorModel";

class staticsController {
    static async computeWeeklyVisitation(req, res) {
        const myModel = mongoose.model("history")
        const today = new Date()
        // Calculate the end of the current week (Sunday)
        const currentWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()) % 7);       
        // Calculate the start of the current week (Monday)
        const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - ((today.getDay() + 6) % 7)); 

        //calculate range for previous week
        const previousWeekStart = new Date(currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
        const previousWeekEnd = new Date(currentWeekEnd.getTime() - 7 * 24 * 60 * 60 * 1000);

        try {
            const currentWeekCount = await myModel.countDocuments({
                createdAt: { $gte: currentWeekStart, $lte: currentWeekEnd }
            });
            const previousWeekCount = await myModel.countDocuments({
                createdAt: { $gte: previousWeekStart, $lte: previousWeekEnd }
            })
            let percentageChange
            console.log("current week count",currentWeekCount)
            console.log("previous week count",previousWeekCount)
            if (previousWeekCount === 0) {
                percentageChange = 0
            }
            else {
                percentageChange = ((currentWeekCount - previousWeekCount) / previousWeekCount * 100)
            }

            res.status(200).json({ "currentWeekCount": currentWeekCount, "previousWeekCount": previousWeekCount, "percentage": percentageChange, "currentWeekStart": currentWeekStart, "currentWeekEnd": currentWeekEnd, "previousWeekStart": previousWeekStart, "previousWeekEnd": previousWeekEnd, });
        } catch (error) {
            console.log(error);
            res.status(404).json(error.message);
        }
    }

    static async computeDailyVisitation(req, res) {
        const myModel = mongoose.model("history")
        const visitorModel = mongoose.model("visitor")
        //calculate range for current day
        
        try {
            const historyCount = await myModel.find()
            const visitorCount = await visitorModel.find()
            res.status(200).json({ historyCount:historyCount.length,visitorCount:visitorCount.length});
        } catch (error) {
            console.log(error);
            res.status(404).json(error.message);
        }
    }

    static async computeWeeklyUsers(req, res) {
        const myModel = mongoose.model("visitor")
        const today = new Date();
        // Calculate the end of the current week (Sunday)
        const currentWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()) % 7);       
        // Calculate the start of the current week (Monday)
        const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - ((today.getDay() + 6) % 7));     
        // Calculate the range for the previous week
        const previousWeekStart = new Date(currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
        const previousWeekEnd = new Date(currentWeekEnd.getTime() - 7 * 24 * 60 * 60 * 1000);
        try {
            const currentWeekCount = await myModel.countDocuments({
                createdAt: { $gte: currentWeekStart, $lte: currentWeekEnd }
            });
            const previousWeekCount = await myModel.countDocuments({
                createdAt: { $gte: previousWeekStart, $lte: previousWeekEnd }
            })
            let percentageChange
            if (previousWeekCount === 0) {
                percentageChange = 0
            }
            else {
                percentageChange = ((currentWeekCount - previousWeekCount) / previousWeekCount * 100)
            }

            res.status(200).json({ "currentWeekCount": currentWeekCount, "previousWeekCount": previousWeekCount, "percentage": percentageChange, "currentWeekStart": currentWeekStart, "currentWeekEnd": currentWeekEnd, "previousWeekStart": previousWeekStart, "previousWeekEnd": previousWeekEnd, });
        } catch (error) {
            console.log(error);
            res.status(404).json(error.message);
        }
    }
    static async getVisitorsInRange(req, res) {
        const { startDate, endDate } = req.body;

        try {
            const start = new Date(startDate);
            const end = new Date(endDate);

            const visitors = await visitorModel.find({
                createdAt: { $gte: start, $lte: end }
            });

            res.status(200).json({ visitors });
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
    static async getVisitorsTotalPaymentInRange(req, res) {
        const { startDate, endDate } = req.body;

        try {
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Find visitors within the date range
            const visitors = await historyModel.find({
                createdAt: { $gte: start, $lte: end }
            }).populate('visitor');

            // Calculate the total number of payments made by visitors within the date range
            let totalPayments = 0;
            visitors.forEach(visitor => {
                // Assuming the payment information is stored in the fees field
                totalPayments += visitor.fees || 0;
            });


            res.status(200).json({ visitors, totalPayments });
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }



}

export default staticsController