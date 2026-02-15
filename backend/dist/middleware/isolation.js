"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollegeFilter = exports.collegeIsolation = void 0;
/**
 * Middleware to ensure a user only accesses data belonging to their college.
 * Super Admins (role: 'admin') can bypass this.
 */
const collegeIsolation = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Admins can see everything
    if (req.user.role === 'admin') {
        return next();
    }
    // Students and TPOs must have a college_id
    if (!req.user.college_id) {
        return res.status(403).json({ error: 'User is not assigned to a college' });
    }
    next();
};
exports.collegeIsolation = collegeIsolation;
/**
 * Helper to add college_id filter to SQL queries for non-admins.
 */
const getCollegeFilter = (req, tableAlias) => {
    if (req.user?.role === 'admin') {
        return '';
    }
    const prefix = tableAlias ? `${tableAlias}.` : '';
    return ` AND ${prefix}college_id = '${req.user?.college_id}'`;
};
exports.getCollegeFilter = getCollegeFilter;
