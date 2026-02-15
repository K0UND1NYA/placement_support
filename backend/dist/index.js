"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load .env.local from project root
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env.local') });
const auth_1 = __importDefault(require("./routes/auth"));
const exams_1 = __importDefault(require("./routes/exams"));
const tint_1 = __importDefault(require("./routes/tint"));
const attempts_1 = __importDefault(require("./routes/attempts"));
const integrity_1 = __importDefault(require("./routes/integrity"));
const colleges_1 = __importDefault(require("./routes/colleges"));
const admin_1 = __importDefault(require("./routes/admin"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const profile_1 = __importDefault(require("./routes/profile"));
const events_1 = __importDefault(require("./routes/events"));
const circulars_1 = __importDefault(require("./routes/circulars"));
const ai_1 = __importDefault(require("./routes/ai"));
const otpCleanup_1 = require("./utils/otpCleanup");
const app = (0, express_1.default)();
const PORT = process.env.BACKEND_PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/auth', auth_1.default);
app.use('/exams', exams_1.default);
app.use('/tint', tint_1.default);
app.use('/attempts', attempts_1.default);
app.use('/integrity', integrity_1.default);
app.use('/colleges', colleges_1.default);
app.use('/admin', admin_1.default);
app.use('/analytics', analytics_1.default);
app.use('/profile', profile_1.default);
app.use('/events', events_1.default);
app.use('/circulars', circulars_1.default);
app.use('/ai', ai_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    // Start OTP cleanup scheduler
    (0, otpCleanup_1.startOTPCleanupScheduler)();
});
