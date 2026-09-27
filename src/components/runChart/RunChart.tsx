import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Run {
  date: string;
  fiveKTime: number;
}

const runs: Run[] = [
  { date: '31-07-2025', fiveKTime: 28.62 },
  { date: '02-08-2025', fiveKTime: 28.30 },
  { date: '16-08-2025', fiveKTime: 27.78 },
  { date: '30-08-2025', fiveKTime: 27.20 },
  { date: '06-09-2025', fiveKTime: 26.87 },
  { date: '04-10-2025', fiveKTime: 26.93 },
  { date: '11-10-2025', fiveKTime: 26.25 },
  { date: '08-11-2025', fiveKTime: 27.50 },
  { date: '18-07-2026', fiveKTime: 30.90 },
  { date: '15-08-2026', fiveKTime: 29.68 },
  { date: '22-08-2026', fiveKTime: 29.25 },
  { date: '05-09-2026', fiveKTime: 28.52 },
  { date: '12-09-2026', fiveKTime: 28.82 },
  { date: '19-09-2026', fiveKTime: 28.38 },
];

function parseDDMMYYYY(dateStr: string): Date {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatTime(minutes: number): string {
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const sorted = [...runs].sort(
  (a, b) => parseDDMMYYYY(a.date).getTime() - parseDDMMYYYY(b.date).getTime()
);

const RunTable = () => {
  const best = Math.min(...sorted.map((r) => r.fiveKTime));

  return (
    <table className="w-full border-collapse font-sans">
      <thead>
        <tr className="border-b-2 border-gray-800">
          <th className="text-left px-3 py-2.5 font-semibold">Date</th>
          <th className="text-right px-3 py-2.5 font-semibold">5K Time</th>
          <th className="text-right px-3 py-2.5 font-semibold">Pace /km</th>
          <th className="text-right px-3 py-2.5 font-semibold">Change</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((run, i) => {
          const prev = sorted[i - 1];
          const delta = prev ? run.fiveKTime - prev.fiveKTime : null;
          const isBest = run.fiveKTime === best;
          const pace = run.fiveKTime / 5;

          return (
            <tr
              key={run.date}
              className={`border-b border-gray-100 ${isBest ? 'bg-red-50' : ''}`}
            >
              <td className="px-3 py-2.5">
                {parseDDMMYYYY(run.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td className={`px-3 py-2.5 text-right ${isBest ? 'font-bold' : 'font-normal'}`}>
                {formatTime(run.fiveKTime)}
                {isBest && (
                  <span className="ml-1.5 text-xs text-red-600">PB</span>
                )}
              </td>
              <td className="px-3 py-2.5 text-right text-gray-500">
                {formatTime(pace)}
              </td>
              <td
                className={`px-3 py-2.5 text-right font-medium ${
                  delta === null ? 'text-gray-400' : delta < 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {delta === null ? '—' : `${delta < 0 ? '↓' : '↑'} ${formatTime(Math.abs(delta))}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const RunLineChart = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <LineChart data={sorted} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => {
              if (typeof d !== 'string') return '';
              return parseDDMMYYYY(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
            stroke="#888"
          />
          <YAxis
            label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
            stroke="#888"
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <Tooltip
            formatter={(value) => [`${value} min`, '5K time']}
            labelFormatter={(d) => {
              if (typeof d !== 'string') return '';
              return parseDDMMYYYY(d).toLocaleDateString();
            }}
          />
          <Line
            type="monotone"
            dataKey="fiveKTime"
            stroke="#e63946"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#e63946' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const RunChart = () => {
  return (
    <div className="flex items-start gap-8">
      <div className="flex-1 basis-[400px] min-w-0">
        <RunTable />
      </div>
      <div className="flex-1 basis-[400px] min-w-0">
        <RunLineChart />
      </div>
    </div>
  );
};

export default RunChart;
