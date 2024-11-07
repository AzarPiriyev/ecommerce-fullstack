import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const JWT_SECRET = "your_jwt_secret_key"; // Bu anahtarı güvende tutun

// Kayıt İşlemi (signUp)
export const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Bu e-posta ile kayıtlı bir kullanıcı zaten mevcut." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ fullName, email, password: hashedPassword });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: "Kayıt işleminde hata oluştu." });
    }
};

// Giriş İşlemi (signIn)
export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Geçersiz şifre." });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Giriş işleminde hata oluştu." });
    }
};

// Çıkış İşlemi (logOut)
export const logOut = async (req, res) => {
    try {
        // Çıkış işlemi için istemcide token'i silinmesi yeterlidir
        res.status(200).json({ message: "Başarıyla çıkış yapıldı." });
    } catch (error) {
        res.status(500).json({ message: "Çıkış işleminde hata oluştu." });
    }
};
