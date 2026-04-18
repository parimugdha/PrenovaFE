import { useEffect, useState } from "react";
import API from "../utils/api";

import {
    BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

export default function AdminAnalytics() {

    const [data, setData] = useState(null);

    useEffect(() => {
        API.get("/admin/analytics")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    if (!data) return <p>Loading...</p>;

    const pieData = [
        { name: "Completed", value: data.completed },
        { name: "In Progress", value: data.inProgress }
    ];

    return (
        <div>

            <h3 className="mb-4">Analytics Dashboard</h3>

            {/* 🔷 Stats Cards */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card p-3 text-center">
                        <h6>Users</h6>
                        <h4>{data.totalUsers}</h4>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3 text-center">
                        <h6>Modules</h6>
                        <h4>{data.totalModules}</h4>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3 text-center">
                        <h6>Completed</h6>
                        <h4>{data.completed}</h4>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3 text-center">
                        <h6>Avg Score</h6>
                        <h4>{data.avgScore}</h4>
                    </div>
                </div>
            </div>

            <div className="row">

                {/* 🔷 Bar Chart */}
                <div className="col-md-6">
                    <div className="card p-3">
                        <h5>Module-wise Avg Score</h5>

                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={data.moduleStats}>
                                <XAxis
                                    dataKey="moduleName"
                                    tickFormatter={(name) =>
                                        name.length > 15 ? name.slice(0, 15) + "..." : name
                                    }
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="avgScore" />
                            </BarChart>
                        </ResponsiveContainer>

                    </div>
                </div>

                {/* 🔷 Pie Chart */}
                <div className="col-md-6">
                    <div className="card p-3">
                        <h5>Completion Status</h5>

                        <PieChart width={400} height={300}>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                            >
                                <Cell />
                                <Cell />
                            </Pie>
                            <Tooltip />
                        </PieChart>

                    </div>
                </div>

            </div>

        </div>
    );
}