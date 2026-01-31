"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp,
  Bell,
  FileQuestion,
  AlertTriangle,
  PlusCircle
} from "lucide-react";
import TextType from "@/components/TextType";
import ParticleCard from "@/components/ParticleCard";
import { apiFetch } from '@/lib/api';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function AdminDashboard() {
  const router = useRouter();

  // State
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalAttempts: 0,
    totalStudents: 0,
    averageScore: 0,
  });
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [recentViolations, setRecentViolations] = useState([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Initialize Data
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));

    async function fetchData() {
      try {
        const [statsData, examsData] = await Promise.all([
          apiFetch('/analytics/tpo/dashboard-stats'),
          apiFetch('/exams')
        ]);

        setStats({
          totalQuizzes: statsData.exam_count || 0,
          totalAttempts: 0, // Not available in basic stats
          totalStudents: statsData.student_count || 0,
          averageScore: statsData.participation_rate || 0, // Using participation rate as proxy or placeholder
        });

        // Use exams data for recent quizzes
        if (Array.isArray(examsData)) {
          setRecentQuizzes(examsData.slice(0, 4));
        }

        // For violations, we'll keep it empty for now as we don't have a global endpoint
        setRecentViolations([]);

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    }

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-hidden p-3 pt-0 lg:p-5 lg:pt-0">
        {/* Top Bar */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">
            <TextType
              text={`Welcome back, ${user?.name || "Admin"}`}
              typingSpeed={60}
              pauseDuration={1200}
              cursorCharacter="_"
              className="inline"
              showCursor
              textColors={["blue"]}
            />
          </h1>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/exams/new"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <PlusCircle size={18} />
              Create Quiz
            </Link>
            <button className="relative p-2 text-slate-600 hover:text-blue-600 transition">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 bg-blue-200 rounded-full flex items-center justify-center text-xs font-semibold text-blue-700">
              A
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard title="Total Quizzes" value={stats.totalQuizzes} />
          <StatCard title="Total Attempts" value={stats.totalAttempts} />
          <StatCard title="Active Students" value={stats.totalStudents} />
          <StatCard
            title="Avg Score"
            value={`${stats.averageScore}%`}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Quizzes */}
          <div className="bg-white rounded-2xl p-6 shadow flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-blue-700 text-lg flex items-center gap-2">
                <FileQuestion size={20} />
                Recent Quizzes
              </h2>
              <Link href="/dashboard/exams" className="text-sm text-blue-500 hover:underline">View All</Link>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition border border-blue-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <FileQuestion size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{quiz.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">Code: {quiz.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold bg-white px-2 py-1 rounded text-blue-600 shadow-sm border border-blue-100">
                      {(quiz.questions || []).length} Qs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring Alerts */}
          <ParticleCard glowColor="239, 68, 68" particleCount={15} className="bg-white rounded-2xl shadow">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-red-600 text-lg flex items-center gap-2">
                  <AlertTriangle size={20} />
                  Monitoring Alerts
                </h2>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {recentViolations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                    <TrendingUp size={32} className="mb-2 opacity-50" />
                    <p className="text-sm">No recent violations</p>
                  </div>
                ) : (
                  recentViolations.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="p-4 rounded-xl bg-red-50 border border-red-100 hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-800">
                          {attempt.studentName}
                        </span>
                        <span className="text-xs font-bold text-red-500 bg-white px-2 py-1 rounded-full shadow-sm">
                          {attempt.violations.length} Alerts
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {attempt.violations.slice(0, 3).map((v, i) => (
                          <span
                            key={i}
                            className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-red-100 text-red-700"
                          >
                            {v.type}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </ParticleCard>
        </div>
      </div>
    </DashboardLayout>
  );
}



function StatCard({ title, value }) {
  return (
    <ParticleCard glowColor="59, 130, 246" particleCount={8}>
      <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">
          {title}
        </p>
        <p className="text-3xl font-black text-slate-800 group-hover:scale-110 transition-transform origin-left">{value}</p>
      </div>
    </ParticleCard>
  );
}
