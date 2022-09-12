const express = require("express");

const sdkAdmin = require("../config/firebase");

const router = express.Router();

async function createUser({lastName,firstName,email,password,role}) {
    try {
        const result = await sdkAdmin
                        .auth()
                        .createUser({
                            email,
                            emailVerified: false,
                            password,
                            displayName: `${lastName} ${firstName}`,
                            disabled: false
                        });
        return result.uid;
    } catch (error) {
        console.log("Error => ",error)
    }
}

async function deleteUser(uid) {
    try {
        await sdkAdmin.auth().deleteUser(uid);
    } catch (error) {
        console.log(error);
    }
}

router.get("",(req,res,next) => {
    res.status(200).json({
        message: "Here you can manage users' Afpa-feed App!"
    });
});

router.get("/:uid",async(req,res,next) => {
    try {
        await sdkAdmin.auth().getUser(req.params.uid);
        res.status(200).json({
            exist: true,
            message: "user is existing"
        });
    } catch (error) {
        res.status(404).json({
            exist: false,
            message: "this user doesn't exist"
        })
    }
});

router.post("",async(req,res,next) => {
    try {
        const { user, authUid } = req.body;
        const uid = await createUser(user);
        res.status(201).json({
            message: "User added successfully!",
            uid
        });
    } catch (error) {
        res.status(409).json({
            message: "An error occurred during the added proccess, try it later!",
            error
        });
    }
});

router.delete("",async(req,res,next) => {
    try {
        await deleteUser(req.body.uid);
        res.status(200).json({
            message: "Deleted a user"
        });
    } catch (error) {
        res.status(409).json({
            message: "An error occurred during the added proccess, try it later!",
            error
        });
    }
});

module.exports = router;