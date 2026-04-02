import PersonalFeedModel from "@/schema/PersonalFeddSchema";
import { Types } from "mongoose";

const dailyScore = (score: number, lastUpdate: Date) => {
    const totalDays = Math.floor(
        (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)
    )
    return score * Math.pow(0.95, totalDays)
};


export const updatePersonalFeed = async (userId: Types.ObjectId, category: string, score: number) => {
    const user = await PersonalFeedModel.findOne({ userId });
    const newDate = new Date();
    const categoryExists = user?.tags.find(t => t.tag === category);

    if (categoryExists) {
        const currentDayScore = dailyScore(categoryExists?.score, categoryExists.lastUpdate);
        const newScore = Math.min(currentDayScore + score, 100)

        await PersonalFeedModel.updateOne(
            { userId, "tags.tag": category },
            {
                $set: {
                    "tags.$.score": newScore,
                    "tags.$.lastUpdate": newDate
                }
            }
        )
    }
    else {
        await PersonalFeedModel.updateOne(
            {
                userId,
                "tags.tag": { $ne: category }
            },
            {
                $push: {
                    tags: {
                        tag: category,
                        score,
                        lastUpdate: new Date()
                    }
                }
            },
            { upsert: true }
        );
    }
}