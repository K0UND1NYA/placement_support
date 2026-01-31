export const getAllQuizzes = () => {
    return [
        { id: 1, title: 'React Basics', code: 'REACT101', questions: new Array(10) },
        { id: 2, title: 'Advanced NodeJS', code: 'NODE202', questions: new Array(15) },
        { id: 3, title: 'Data Structures', code: 'DSA303', questions: new Array(20) },
        { id: 4, title: 'System Design', code: 'SYS404', questions: new Array(5) },
    ];
};

export const getAttempts = () => {
    return [
        {
            id: 1,
            quizId: 1,
            studentName: 'John Doe',
            score: 80,
            violations: []
        },
        {
            id: 2,
            quizId: 1,
            studentName: 'Jane Smith',
            score: 95,
            violations: [{ type: 'Tab Switch' }]
        },
        {
            id: 3,
            quizId: 2,
            studentName: 'Bob Wilson',
            score: 60,
            violations: [{ type: 'Multiple Faces' }, { type: 'Tab Switch' }]
        },
        {
            id: 4,
            quizId: 3,
            studentName: 'Alice Brown',
            score: 88,
            violations: []
        },
        {
            id: 5,
            quizId: 1,
            studentName: 'Charlie Davis',
            score: 72,
            violations: [{ type: 'No Face Detected' }]
        },
    ];
};

export const getPlatformStats = () => {
    return {
        totalQuizzes: 42,
        totalAttempts: 156,
        averageScore: 78,
        totalStudents: 320,
    };
};
