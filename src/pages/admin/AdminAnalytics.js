import { useEffect, useState } from "react";
import API from "../../utils/api";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

export default function AdminAnalytics() {

    const [data, setData] = useState(null);

    useEffect(() => {
        API.get("/admin/analytics")
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    if (!data) {
        return (
            <div className="admin-analytics-loading">
                <div className="admin-loading-heart">♡</div>
                <p>Loading analytics...</p>
            </div>
        );
    }

    const pieData = [
        {
            name: "Completed",
            value: data.completed || 0
        },
        {
            name: "In Progress",
            value: data.inProgress || 0
        }
    ];

    return (
        <div className="admin-analytics">

            {/* ================= HEADER ================= */}

            <div className="admin-analytics-header">

                <div>
                    <span className="admin-section-label">
                        PRENOVA ADMIN
                    </span>

                    <h1>
                        Analytics Dashboard
                    </h1>

                    <p>
                        Monitor learning activity and user progress.
                    </p>
                </div>

            </div>


            {/* ================= STAT CARDS ================= */}

            <div className="analytics-stats-grid">

                {/* Users */}
                <div className="analytics-stat-card">

                    <div className="analytics-stat-icon">
                        👥
                    </div>

                    <div className="analytics-stat-content">

                        <span>
                            Total Users
                        </span>

                        <strong>
                            {data.totalUsers || 0}
                        </strong>

                        <small>
                            Registered learners
                        </small>

                    </div>

                </div>


                {/* Modules */}
                <div className="analytics-stat-card">

                    <div className="analytics-stat-icon">
                        📚
                    </div>

                    <div className="analytics-stat-content">

                        <span>
                            Total Modules
                        </span>

                        <strong>
                            {data.totalModules || 0}
                        </strong>

                        <small>
                            Available modules
                        </small>

                    </div>

                </div>


                {/* Completed */}
                <div className="analytics-stat-card">

                    <div className="analytics-stat-icon">
                        ✓
                    </div>

                    <div className="analytics-stat-content">

                        <span>
                            Completed
                        </span>

                        <strong>
                            {data.completed || 0}
                        </strong>

                        <small>
                            Completed attempts
                        </small>

                    </div>

                </div>


                {/* Average Score */}
                <div className="analytics-stat-card">

                    <div className="analytics-stat-icon">
                        ⭐
                    </div>

                    <div className="analytics-stat-content">

                        <span>
                            Average Score
                        </span>

                        <strong>
                            {data.avgScore || 0}
                        </strong>

                        <small>
                            Overall quiz performance
                        </small>

                    </div>

                </div>

            </div>


            {/* ================= CHARTS ================= */}

            <div className="analytics-chart-grid">

                {/* MODULE SCORE CHART */}

                <div className="analytics-card">

                    <div className="analytics-card-header">

                        <div>
                            <span className="analytics-card-label">
                                PERFORMANCE
                            </span>

                            <h2>
                                Module-wise Average Score
                            </h2>

                            <p>
                                Average quiz score for each learning module.
                            </p>
                        </div>

                    </div>


                    <div className="analytics-chart">

                        {data.moduleStats?.length > 0 ? (

                            <ResponsiveContainer
                                width="100%"
                                height={350}
                            >

                                <BarChart
                                    data={data.moduleStats}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 0,
                                        bottom: 10
                                    }}
                                >

                                    <CartesianGrid
                                        stroke="#f0e5f0"
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="moduleName"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#806f86", fontSize: 11 }}
                                        tickFormatter={(name) =>
                                            name?.length > 15
                                                ? name.slice(0, 15) + "..."
                                                : name
                                        }
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#806f86", fontSize: 11 }}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            border: "1px solid #f0e5f0",
                                            borderRadius: "12px",
                                            boxShadow:
                                                "0 8px 25px rgba(126, 74, 130, 0.12)"
                                        }}
                                    />

                                    <Bar
                                        dataKey="avgScore"
                                        fill="#9b4d96"
                                        radius={[7, 7, 0, 0]}
                                        barSize={35}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        ) : (

                            <div className="analytics-empty">
                                <span>📊</span>
                                <p>
                                    No module performance data available.
                                </p>
                            </div>

                        )}

                    </div>

                </div>


                {/* COMPLETION CHART */}

                <div className="analytics-card">

                    <div className="analytics-card-header">

                        <div>
                            <span className="analytics-card-label">
                                USER PROGRESS
                            </span>

                            <h2>
                                Completion Status
                            </h2>

                            <p>
                                Overview of learner progress.
                            </p>
                        </div>

                    </div>


                    <div className="analytics-pie-container">

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={65}
                                    outerRadius={100}
                                    paddingAngle={4}
                                >

                                    <Cell fill="#9b4d96" />

                                    <Cell fill="#f1b6d5" />

                                </Pie>

                                <Tooltip
                                    contentStyle={{
                                        border: "1px solid #f0e5f0",
                                        borderRadius: "12px",
                                        boxShadow:
                                            "0 8px 25px rgba(126, 74, 130, 0.12)"
                                    }}
                                />

                            </PieChart>

                        </ResponsiveContainer>


                        {/* Legend */}

                        <div className="analytics-legend">

                            <div className="analytics-legend-item">

                                <span
                                    className="analytics-legend-dot completed"
                                />

                                <span>
                                    Completed
                                </span>

                                <strong>
                                    {data.completed || 0}
                                </strong>

                            </div>


                            <div className="analytics-legend-item">

                                <span
                                    className="analytics-legend-dot progress"
                                />

                                <span>
                                    In Progress
                                </span>

                                <strong>
                                    {data.inProgress || 0}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}