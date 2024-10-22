import { User } from "../models/user.model.js";

export const getAllUsers = async (request, response) => {
try {
    const user = await User.find({})
    response.status(200).json({
        succes: true,
        data: user
})
} catch (error) {
    console.error("user not found",error)
}
}

export const deleteUser = async (request, response) => {
    try {
        const userDeleted = await User.findByidAndDelete({})
        response.status(200).json({
            succes: true,
            data: userDeleted
    })
    } catch (error) {
        console.error("user not deleted",error)
    }
    }



