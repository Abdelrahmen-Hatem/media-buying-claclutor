import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MediaBuyingTool() {
  const [campaignType, setCampaignType] = useState("traffic");
  const [data, setData] = useState({
    reach: "",
    impressions: "",
    clicks: "",
    conversions: "",
    cost: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const calcInsights = () => {
    const { impressions, clicks, cost, conversions } = data;
    const parsed = {
      impressions: +impressions,
      clicks: +clicks,
      cost: +cost,
      conversions: +conversions,
    };

    const ctr = parsed.impressions ? ((parsed.clicks / parsed.impressions) * 100).toFixed(2) : "0";
    const cpc = parsed.clicks ? (parsed.cost / parsed.clicks).toFixed(2) : "0";
    const cpm = parsed.impressions ? ((parsed.cost / parsed.impressions) * 1000).toFixed(2) : "0";
    const roas = parsed.cost && parsed.conversions ? (parsed.conversions / parsed.cost).toFixed(2) : "0";

    return { ctr, cpc, cpm, roas };
  };

  const { ctr, cpc, cpm, roas } = calcInsights();

  const getRecommendation = () => {
    const recs = [];

    if (parseFloat(ctr) < 1) recs.push("CTR ضعيف - جرّب تحسين الصورة أو العنوان");
    if (parseFloat(cpc) > 1) recs.push("CPC مرتفع - قلل التارجت أو غير نوع الإعلان");
    if (parseFloat(cpm) > 30) recs.push("CPM مرتفع - جرب وقت نشر مختلف");
    if (parseFloat(roas) < 1) recs.push("ROAS ضعيف - جرب عرض أقوى أو CTAs مختلفة");

    return recs.length ? recs : ["الحملة أداءها جيد حالياً"];
  };

  const performanceColor = (value, threshold, goodHigher = true) => {
    if (value === "0") return "text-gray-500";
    const v = parseFloat(value);
    if (goodHigher) return v >= threshold ? "text-green-600" : "text-red-600";
    return v <= threshold ? "text-green-600" : "text-red-600";
  };

  const chartData = [
    { name: "CTR", value: parseFloat(ctr) },
    { name: "CPC", value: parseFloat(cpc) },
    { name: "CPM", value: parseFloat(cpm) },
    { name: "ROAS", value: parseFloat(roas) }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold text-center">أداة تحليل حملات الميديا بايينج</h1>

      <Tabs defaultValue="campaign" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="campaign">بيانات الحملة</TabsTrigger>
          <TabsTrigger value="analysis">تحليل الأداء</TabsTrigger>
          <TabsTrigger value="education">تعلم</TabsTrigger>
        </TabsList>

        <TabsContent value="campaign">
          <Card>
            <CardContent className="space-y-4 pt-4">
              <select
                value={campaignType}
                onChange={(e) => setCampaignType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="traffic">زيارات</option>
                <option value="messages">رسائل</option>
                <option value="leads">استمارات</option>
                <option value="sales">مبيعات</option>
                <option value="video">مشاهدات فيديو</option>
              </select>

              <Input name="reach" placeholder="Reach" value={data.reach} onChange={handleChange} />
              <Input name="impressions" placeholder="Impressions" value={data.impressions} onChange={handleChange} />
              <Input name="clicks" placeholder="Clicks" value={data.clicks} onChange={handleChange} />
              <Input name="conversions" placeholder="Conversions" value={data.conversions} onChange={handleChange} />
              <Input name="cost" placeholder="Total Cost (جنيه)" value={data.cost} onChange={handleChange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardContent className="pt-4 space-y-4 text-sm">
              <div className={performanceColor(ctr, 1)}><strong>CTR:</strong> {ctr}%</div>
              <div className={performanceColor(cpc, 1, false)}><strong>CPC:</strong> {cpc} جنيه</div>
              <div className={performanceColor(cpm, 30, false)}><strong>CPM:</strong> {cpm} جنيه</div>
              <div className={performanceColor(roas, 1)}><strong>ROAS:</strong> {roas}</div>

              <div className="pt-2">
                <strong>توصيات:</strong>
                <ul className="list-disc ps-5 mt-2">
                  {getRecommendation().map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <strong>رسم بياني:</strong>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardContent className="space-y-4 pt-4 text-sm">
              <p>تعريفات:</p>
              <ul className="list-disc ps-5">
                <li><strong>CTR:</strong> نسبة النقرات إلى الظهور</li>
                <li><strong>CPC:</strong> تكلفة النقرة</li>
                <li><strong>CPM:</strong> تكلفة الألف ظهور</li>
                <li><strong>ROAS:</strong> العائد على الإنفاق الإعلاني</li>
              </ul>

              <p>فيديوهات توضيحية:</p>
              <div className="space-y-4">
                <iframe className="w-full" height="200" src="https://www.youtube.com/embed/7uD_XIgkME0" title="ما هو الـ CTR؟" allowFullScreen></iframe>
                <iframe className="w-full" height="200" src="https://www.youtube.com/embed/B9g3J3Pb4Is" title="ما هو الـ CPM و CPC؟" allowFullScreen></iframe>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
