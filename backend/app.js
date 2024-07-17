import express from 'express'
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express()
// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, '/frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }))
app.use(cookieParser())
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Backend Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})


import userRouter from "./routes/user.routes.js"
import taskRouter from "./routes/task.routes.js"
app.use("/api/v1/users", userRouter)
app.use("/api/v1/task", taskRouter)
export { app }